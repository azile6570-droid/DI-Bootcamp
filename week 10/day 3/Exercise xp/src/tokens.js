import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';

const issuer = 'week-10-day-3-jwt-auth';
const audience = 'week-10-day-3-api';
export const refreshLifetimeMs = 7 * 24 * 60 * 60 * 1000;

export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function tokenHashMatches(token, storedHash) {
  const actualHash = Buffer.from(hashToken(token), 'hex');
  const expectedHash = Buffer.from(storedHash, 'hex');
  return actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);
}

export function createAccessToken(userId, config) {
  return jwt.sign({ sub: String(userId) }, config.accessSecret, {
    audience,
    expiresIn: '15m',
    issuer,
  });
}

export function createRefreshToken(userId, sessionId, config) {
  return jwt.sign({ sub: String(userId), sid: sessionId, jti: randomUUID() }, config.refreshSecret, {
    audience,
    expiresIn: '7d',
    issuer,
  });
}

export function verifyAccessToken(token, config) {
  return jwt.verify(token, config.accessSecret, { audience, issuer });
}

export function verifyRefreshToken(token, config, options = {}) {
  return jwt.verify(token, config.refreshSecret, { audience, issuer, ...options });
}

export function createSession(database, userId, config) {
  const sessionId = randomUUID();
  const refreshToken = createRefreshToken(userId, sessionId, config);
  const expiresAt = Date.now() + refreshLifetimeMs;

  database.prepare(`
    INSERT INTO refresh_sessions (session_id, user_id, token_hash, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(sessionId, userId, hashToken(refreshToken), expiresAt);

  return { accessToken: createAccessToken(userId, config), refreshToken };
}

export function rotateSession(database, sessionId, userId, oldToken, config) {
  const refreshToken = createRefreshToken(userId, sessionId, config);
  const result = database.prepare(`
    UPDATE refresh_sessions
    SET token_hash = ?, expires_at = ?
    WHERE session_id = ? AND token_hash = ? AND expires_at > ?
  `).run(hashToken(refreshToken), Date.now() + refreshLifetimeMs, sessionId, hashToken(oldToken), Date.now());

  if (result.changes !== 1) {
    return null;
  }

  return { accessToken: createAccessToken(userId, config), refreshToken };
}

export const tokenIssuer = issuer;
export const tokenAudience = audience;