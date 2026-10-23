# Storyweave

A collaborative storytelling app with a React/TypeScript frontend, Redux Toolkit state, an Express API, and PostgreSQL persistence.

## Requirements

- Node.js 20 or newer and npm
- PostgreSQL 14 or newer

## Local setup

1. Create a PostgreSQL database named `story_weave` (or choose another name).
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL`, `JWT_SECRET`, and `REFRESH_SECRET`. Use two different random secrets of at least 32 characters. Keep `.env` out of source control.
3. Install and migrate the backend:

   ```powershell
   cd backend
   npm install
   npm run db:migrate
   npm run dev
   ```
7
4. In a second terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:4000`. Set `VITE_API_URL` in `frontend/.env` if the API is hosted elsewhere. The API's `FRONTEND_URL` must match the frontend origin.

## Scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Run the API with automatic reload |
| `backend` | `npm run build` | Type-check and compile the API |
| `backend` | `npm run start` | Run the compiled API |
| `backend` | `npm run db:migrate` | Create/update the PostgreSQL schema |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Type-check and create the production bundle |
| `frontend` | `npm run preview` | Preview the production bundle |

## API overview

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`
- `GET /api/stories`, `GET /api/stories/:id`, `POST /api/stories`, `PATCH /api/stories/:id`, `DELETE /api/stories/:id`
- `POST /api/contributors`, `GET /api/contributors/:story_id`, `DELETE /api/contributors/:id`
- `DELETE /api/stories/:storyId/contributors/me` (a contributor may leave a story)
- `GET /api/stories/:storyId/comments`, `POST /api/stories/:storyId/comments`, `DELETE /api/stories/comments/:id`
- `GET /api/users?q=...` (search collaborators)
- `GET /api/health`

Protected routes require `Authorization: Bearer <access-token>`. The short-lived access token stays in memory; the rotating refresh token is held in an HTTP-only cookie and its hash is stored in PostgreSQL. In production, serve the app over HTTPS and configure the frontend/API origins and database connection in the hosting provider's environment settings.
