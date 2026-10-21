import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { createApp } from '../src/app.js';
import { createDatabase } from '../src/database.js';

const config = {
  accessSecret: 'test-access-secret-that-is-at-least-thirty-two-characters',
  refreshSecret: 'test-refresh-secret-that-is-also-at-least-thirty-two-characters',
  production: false,
};
let database;
let server;
let baseUrl;
let temporaryDirectory;

before(async () => {
  temporaryDirectory = mkdtempSync(join(tmpdir(), 'jwt-auth-test-'));
  database = createDatabase(join(temporaryDirectory, 'test.sqlite'));
  server = createServer(createApp({ database, config }));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  database.close();
  rmSync(temporaryDirectory, { recursive: true, force: true });
});

function cookieHeader(response) {
  return response.headers.getSetCookie().map((cookie) => cookie.split(';', 1)[0]).join('; ');
}

test('registers users, protects profiles, rotates refresh tokens, and revokes on logout', async () => {
  const invalidRegistration = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'a', password: 'short' }),
  });
  assert.equal(invalidRegistration.status, 400);

  const unauthenticatedProfile = await fetch(`${baseUrl}/api/profile`);
  assert.equal(unauthenticatedProfile.status, 401);

  const registration = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'alex.dev', password: 'CorrectHorseBattery9!' }),
  });
  assert.equal(registration.status, 201);
  assert.match(registration.headers.getSetCookie().join(';'), /HttpOnly/i);
  const registrationCookies = cookieHeader(registration);

  const authCheck = await fetch(`${baseUrl}/api/auth/check`, {
    headers: { cookie: registrationCookies },
  });
  assert.equal(authCheck.status, 200);
  assert.equal((await authCheck.json()).authenticated, true);

  const profileUpdate = await fetch(`${baseUrl}/api/profile`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', cookie: registrationCookies },
    body: JSON.stringify({ displayName: 'Alex Example' }),
  });
  assert.equal(profileUpdate.status, 200);
  assert.equal((await profileUpdate.json()).user.displayName, 'Alex Example');

  const refreshCookie = registrationCookies.split('; ').find((cookie) => cookie.startsWith('refreshToken='));
  const refresh = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: refreshCookie },
  });
  assert.equal(refresh.status, 200);
  const rotatedCookies = cookieHeader(refresh);

  const reusedToken = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: refreshCookie },
  });
  assert.equal(reusedToken.status, 401);

  const logoutRefreshCookie = rotatedCookies.split('; ').find((cookie) => cookie.startsWith('refreshToken='));
  const logout = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { cookie: logoutRefreshCookie },
  });
  assert.equal(logout.status, 204);

  const refreshAfterLogout = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: logoutRefreshCookie },
  });
  assert.equal(refreshAfterLogout.status, 401);
});