# JWT Authentication with Express

## 1. What a JWT does

A JSON Web Token is a signed token commonly used to prove authentication and carry authorization claims. It has three Base64URL-encoded sections: a header describing the signing algorithm, a payload containing claims such as the subject and expiry, and a signature that lets the server detect tampering. A signed JWT is not encrypted, so never put passwords or other secrets in its payload.

This project uses short-lived access tokens for protected API requests and rotating refresh tokens to obtain new access tokens. It stores refresh-token hashes on the server so logout and token reuse can revoke a session.

## 2. Set up and run

Requirements: Node.js 22.13 or newer and npm. SQLite is provided by Node's built-in `node:sqlite` module.

```sh
npm install
```

Copy `.env.example` to `.env`, then set two different random secrets of at least 32 characters. For example, generate each value with:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Start the server:

```sh
npm run dev
```

The API listens on `http://localhost:3000` and creates `data/auth.sqlite` on first run. `npm start` runs without file watching, and `npm test` runs the authentication flow test.

## 3. Routes

- `POST /api/auth/register` accepts `{ "username": "alex.dev", "password": "CorrectHorseBattery9!" }`. Usernames must be 3-24 letters, digits, dots, underscores, or hyphens; passwords must be 12-128 characters.
- `POST /api/auth/login` accepts the same fields and sets access and refresh cookies.
- `POST /api/auth/refresh` rotates the refresh token and issues a new access token. The previous refresh token cannot be reused.
- `POST /api/auth/logout` revokes the current refresh session and clears both cookies.
- `GET /api/auth/check` returns the authenticated user's identity.
- `GET /api/profile` returns the authenticated user's profile.
- `PATCH /api/profile` accepts `{ "displayName": "Alex Example" }` for an authenticated profile update.

Authentication failures return `401`, invalid input returns `400`, and duplicate usernames return `409`. Authentication routes are rate-limited. Access and refresh tokens are stored in `HttpOnly`, `SameSite=Lax` cookies; cookies use `Secure` in production. Protected endpoints also accept an access token in an `Authorization: Bearer ...` header.

## 4. Security notes

Passwords are hashed with bcrypt. Refresh tokens are stored only as SHA-256 hashes in SQLite and rotated after use. Access tokens expire after 15 minutes; refresh sessions expire after 7 days. Logging out revokes refresh access immediately; an already-issued access token remains valid until its short expiry. The in-process rate limiter is suitable for a single development process; use a shared store when deploying multiple server instances. For browser deployments, add CSRF defenses appropriate to the client and deployment topology.

## 5. Further exercises

- Add email confirmation using a one-time, expiring token.
- Add password changes and revoke all sessions after a password reset.
- Add tests for login failures, malformed tokens, and rate limiting.
- Replace SQLite with a hosted database when deploying multiple instances.

## 6. Key takeaways

JWTs make signed claims portable, but they do not encrypt their contents and do not replace authorization checks. Short access-token lifetimes, securely stored secrets, hashed passwords, HTTP-only cookies, refresh-token rotation, server-side revocation, and rate limits each address different risks. Authentication proves identity; every protected route must still enforce the authorization rules for its data.