import { verifyAccessToken } from '../tokens.js';

export function requireAuth(database, config) {
  return (request, response, next) => {
    const authorization = request.get('authorization');
    const bearerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    const token = request.cookies.accessToken || bearerToken;

    if (!token) {
      return response.status(401).json({ error: 'Authentication required.' });
    }

    try {
      const claims = verifyAccessToken(token, config);
      const user = database.prepare(`
        SELECT id, username, display_name AS displayName FROM users WHERE id = ?
      `).get(Number(claims.sub));

      if (!user) {
        return response.status(401).json({ error: 'Authentication required.' });
      }

      request.user = user;
      return next();
    } catch {
      return response.status(401).json({ error: 'Invalid or expired access token.' });
    }
  };
}