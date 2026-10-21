import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { createDatabase } from './database.js';
import { requireAuth } from './middleware/require-auth.js';
import { createAuthRouter } from './routes/auth.js';
import { createProfileRouter } from './routes/profile.js';

export function createApp({ database = createDatabase(), config }) {
  if (!config?.accessSecret || !config?.refreshSecret) {
    throw new Error('JWT access and refresh secrets are required.');
  }

  const app = express();
  app.use(bodyParser.json({ limit: '16kb' }));
  app.use(cookieParser());

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many authentication requests. Try again later.' },
  });

  app.use('/api/auth', authLimiter, createAuthRouter(database, config));

  const authenticate = requireAuth(database, config);
  app.use('/api/profile', authenticate, (request, response, next) => {
    request.database = database;
    next();
  }, createProfileRouter());
  app.get('/api/auth/check', authenticate, (request, response) => {
    response.json({ authenticated: true, user: request.user });
  });

  app.use((error, request, response, next) => {
    if (response.headersSent) {
      return next(error);
    }
    if (error.type === 'entity.parse.failed') {
      return response.status(400).json({ error: 'Request body must contain valid JSON.' });
    }
    return response.status(500).json({ error: 'Internal server error.' });
  });

  return app;
}