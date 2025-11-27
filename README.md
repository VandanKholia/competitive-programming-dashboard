# CodeProfile - Competitive Programming Dashboard

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
# CodeProfile — Competitive Programming Dashboard

Lightweight full-stack app to track coding profiles (Codeforces, CodeChef, LeetCode).

Short quickstart
- Backend: install and run in /backend
  - npm install
  - create `.env` (see backend/.env.example)
  - npm run dev (or npm start in production)
- Frontend: install and run in /frontend
  - npm install
  - set VITE_API_URL to your backend URL (defaults to http://localhost:3000)
  - npm run dev (or npm run build && serve the `dist` folder)

Deploy notes
- On Render: create two services (backend as Web Service, frontend as Static Site). Set environment variables on Render (MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CLIENT_URL, VITE_API_URL).

Screenshots
- Add screenshots to `frontend/public/screenshots/` (create the folder if needed). Example markdown to include images below:

![Home](/frontend/public/screenshots/home.png)
![Platforms](/frontend/public/screenshots/platforms.png)

API overview (examples)
- POST /api/auth/signup — { name, email, password }
- POST /api/auth/login — { email, password }
- GET /api/auth/user — returns authenticated user
- GET /api/codeforces/:username, /api/codechef/:username, /api/leetcode/:username

