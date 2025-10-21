# OnePlace - Competitive Programming Dashboard

A full-stack dashboard to track competitive programming profiles (Codeforces, CodeChef, LeetCode). This repository contains a Node.js/Express backend that scrapes or queries platform data and a React + Vite frontend.

---

## Repository structure

- `backend/` - Express API, MongoDB models, scraping controllers.
  - `server.js` - app entrypoint
  - `routes/` - API routes (auth, leetcode, codeforces, codechef, platform)
  - `controller/` - controllers that fetch and format platform data and auth
  - `model/` - Mongoose user model
  - `webScraping/` - scrapers for CodeChef and LeetCode
- `frontend/` - React + Vite single page app
  - `src/` - React components and styles
  - `public/` - static assets

---

## Quickstart (Windows)

Requirements
- Node.js v18+ (tested with Node 20)
- npm (or yarn)
- MongoDB (local or hosted like Atlas)

1) Clone the repository

2) Backend setup

- Change to the backend folder and install dependencies:

```powershell
cd backend
npm install
```

- Create a `.env` file in `backend/` (example below) and set these variables:

```
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
ACCESS_TOKEN_SECRET=<random-secret-for-access-token>
REFRESH_TOKEN_SECRET=<random-secret-for-refresh-token>
```

- Start the backend in development (uses nodemon):

```powershell
npm run dev
```

The backend listens on `http://localhost:3000` by default.

3) Frontend setup

- Change to the frontend folder and install dependencies:

```powershell
cd frontend
npm install
```

- Start the frontend development server (Vite):

```powershell
npm run dev
```

By default the frontend expects the backend at `http://localhost:3000` and the dev origin is `http://localhost:5173`.

---

## Backend API (available routes)

Base URL: http://localhost:3000/api

Auth routes (`/api/auth`)
- POST `/signup` - Create a new user
  - Body: { name, email, password }
- POST `/login` - Login an existing user
  - Body: { email, password }
  - On success sets `accessToken` and `refreshToken` as httpOnly cookies and returns basic user info
- POST `/refresh-token` - Exchange refresh cookie for a new access token
  - Uses `refreshToken` cookie
- POST `/logout` - Clears the auth cookies (requires authentication)
- GET `/user` - Get authenticated user's profile (requires authentication)

Platform routes (require authentication where noted)
- POST `/api/auth/platforms` - Save user platform preferences (authenticated)
- GET `/api/auth/platforms` - Get saved platforms for the authenticated user

Profile / scraping endpoints
- GET `/api/codeforces/:username` - Returns scraped/queried Codeforces profile & stats
- GET `/api/codechef/:username` - Returns scraped CodeChef profile & stats
- GET `/api/leetcode/:username` - Returns scraped LeetCode profile & stats

Notes: the backend uses a mix of scraping and external requests (see `webScraping/` and `controller/`), and some endpoints may return varied shapes depending on the platform. Inspect controllers in `backend/controller/` for exact response shapes.

---

## Frontend

The frontend is a Vite + React project in `frontend/`.

Key scripts in `frontend/package.json`:
- `dev` - start dev server (vite)
- `build` - build production bundle
- `preview` - serve the build locally
- `lint` - run eslint

The app includes components for signup/login, selecting platforms, and viewing contest & problem stats. Default origin allowed by backend CORS is `http://localhost:5173` (change in `backend/server.js` if needed).

---

## Environment variables

Add the following to `backend/.env` (example values shown; do not commit real secrets):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/oneplace
ACCESS_TOKEN_SECRET=some_long_random_secret_here
REFRESH_TOKEN_SECRET=another_long_random_secret_here
```

If you deploy to production, use TLS and set cookie options accordingly (currently cookies are set with `httpOnly: true` and `secure: true`). For local development with `http` you may need to relax `secure` or use a secure local proxy.

---

## Testing and linting

- Backend: There are no automated tests included in this repo currently. You can run `npm test` in `backend/` (it runs a placeholder script).
- Frontend: run `npm run lint` in `frontend/` to run eslint.

---

## Development notes & TODOs

- The backend currently uses server-side scraping for some platforms; this may be rate-limited. Consider caching or using official APIs if available.
- Cookie `secure` flag is enabled - when testing locally over HTTP you may need to set it to `false` or run the frontend over `https`.
- Add automated tests for controllers and React components.

---

## Contribution

Contributions welcome. Create an issue describing the change or open a pull request. Follow these guidelines:

- Fork the repo and create a feature branch
- Run existing code and ensure no regressions
- Add tests for non-trivial logic

---

## Contact

If you have questions about this project, open an issue or contact the repository owner.
