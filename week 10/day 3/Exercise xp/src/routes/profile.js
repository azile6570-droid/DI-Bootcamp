import { Router } from 'express';

export function createProfileRouter() {
  const router = Router();

  router.get('/', (request, response) => {
    response.json({ user: request.user });
  });

  router.patch('/', (request, response, next) => {
    const { displayName } = request.body ?? {};

    if (typeof displayName !== 'string' || displayName.trim().length < 1 || displayName.trim().length > 60) {
      return response.status(400).json({ error: 'Display name must be 1-60 characters.' });
    }

    try {
      const updatedUser = request.database.prepare(`
        UPDATE users SET display_name = ? WHERE id = ?
        RETURNING id, username, display_name AS displayName
      `).get(displayName.trim(), request.user.id);
      return response.json({ user: updatedUser });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}