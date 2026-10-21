import 'dotenv/config';
import { createApp } from './app.js';
import { createDatabase } from './database.js';

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret || accessSecret.length < 32 || !refreshSecret || refreshSecret.length < 32) {
  throw new Error('Set distinct JWT access and refresh secrets of at least 32 characters in .env.');
}
if (accessSecret === refreshSecret) {
  throw new Error('JWT access and refresh secrets must be different.');
}

const database = createDatabase(process.env.DATABASE_PATH || 'data/auth.sqlite');
const app = createApp({
  database,
  config: {
    accessSecret,
    refreshSecret,
    production: process.env.NODE_ENV === 'production',
  },
});
const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`JWT authentication API listening on http://localhost:${port}`);
});

function shutDown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);