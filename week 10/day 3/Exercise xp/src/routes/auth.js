import { Router } from 'express';
import bcrypt from 'bcrypt';
import {
  createSession,
  refreshLifetimeMs,
  rotateSession,
  tokenHashMatches,
  verifyRefreshToken,
} from '../tokens.js';

const accessCookie = 'accessToken';
const refreshCookie = 'refreshToken';

function cookieOptions(config, maxAge) {
  return {
    httpOnly: true,
    maxAge,
    sameSite: 'lax',
    secure: config.production,
  };
}

function setTokenCookies(response, tokens, config) {
  response.cookie(accessCookie, tokens.accessToken, cookieOptions(config, 15 * 60 * 1000));
  response.cookie(refreshCookie, tokens.refreshToken, cookieOptions(config, refreshLifetimeMs));
}

function clearTokenCookies(response, config) {
  const options = { httpOnly: true, sameSite: 'lax', secure: config.production };
  response.clearCookie(accessCookie, options);
  response.clearCookie(refreshCookie, options);
}

function publicUser(user) {
  return { id: user.id, username: user.username, displayName: user.displayName };
}

function usernameIsValid(username) {
  return typeof username === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{2,23}$/.test(username);
}

function passwordIsValid(password) {
  return typeof password === 'string' && password.length >= 12 && password.length <= 128;
}

export function createAuthRouter(database, config) {
  const router = Router();

  router.post('/register', async (request, response, next) => {
    const { username, password } = request.body ?? {};

    if (!usernameIsValid(username) || !passwordIsValid(password)) {
      return response.status(400).json({
        error: 'Username must be 3-24 allowed characters and password must be 12-128 characters.',
      });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 12);
      const result = database.prepare(`
        INSERT INTO users (username, password_hash, display_name)
        VALUES (?, ?, ?)
      `).run(username, passwordHash, username);
      const user = { id: Number(result.lastInsertRowid), username, displayName: username };
      setTokenCookies(response, createSession(database, user.id, config), config);
      return response.status(201).json({ user: publicUser(user) });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return response.status(409).json({ error: 'Username is already taken.' });
      }
      return next(error);
    }
  });

  router.post('/login', async (request, response, next) => {
    const { username, password } = request.body ?? {};

    if (typeof username !== 'string' || typeof password !== 'string') {
      return response.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      const user = database.prepare(`
        SELECT id, username, password_hash, display_name AS displayName
        FROM users WHERE username = ? COLLATE NOCASE
      `).get(username);

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return response.status(401).json({ error: 'Invalid username or password.' });
      }

      setTokenCookies(response, createSession(database, user.id, config), config);
      return response.json({ user: publicUser(user) });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/refresh', (request, response) => {
    const token = request.cookies[refreshCookie];
    if (!token) {
      return response.status(401).json({ error: 'Refresh token required.' });
    }

    try {
      const claims = verifyRefreshToken(token, config);
      const session = database.prepare(`
        SELECT user_id AS userId, token_hash AS tokenHash, expires_at AS expiresAt
        FROM refresh_sessions WHERE session_id = ?
      `).get(claims.sid);

      if (
        !session ||
        String(session.userId) !== claims.sub ||
        session.expiresAt <= Date.now() ||
        !tokenHashMatches(token, session.tokenHash)
      ) {
        return response.status(401).json({ error: 'Invalid or expired refresh token.' });
      }

      const tokens = rotateSession(database, claims.sid, session.userId, token, config);
      if (!tokens) {
        return response.status(401).json({ error: 'Refresh token has already been used.' });
      }

      setTokenCookies(response, tokens, config);
      return response.json({ message: 'Access token refreshed.' });
    } catch {
      return response.status(401).json({ error: 'Invalid or expired refresh token.' });
    }
  });

  router.post('/logout', (request, response) => {
    const token = request.cookies[refreshCookie];

    if (token) {
      try {
        const claims = verifyRefreshToken(token, config, { ignoreExpiration: true });
        const session = database.prepare(`
          SELECT token_hash AS tokenHash FROM refresh_sessions WHERE session_id = ?
        `).get(claims.sid);

        if (session && tokenHashMatches(token, session.tokenHash)) {
          database.prepare('DELETE FROM refresh_sessions WHERE session_id = ?').run(claims.sid);
        }
      } catch {
        // Invalid refresh tokens are ignored; the browser cookies are still cleared.
      }
    }

    clearTokenCookies(response, config);
    return response.status(204).end();
  });

  return router;
}