# Frontend

This folder contains the React + Vite frontend for the Carbon Footprint Week 1–2 features.

Run locally (development)

1. Start the backend (Spring Boot) on http://localhost:8080
   - Ensure the backend is running and Flyway migrations have been applied.

2. Start the frontend dev server

```bash
cd frontend
npm ci
npm run dev
```

Vite will run on http://localhost:5173 and the proxy is configured to forward /api → http://localhost:8080.

Basic flows to test

- Registration (multi-step)
  - Visit http://localhost:5173/register
  - Fill the steps and Submit. The frontend posts to POST /api/registration.
  - Expect a success snackbar message; the registration is stored as a pending request in the backend.

- Login
  - Visit http://localhost:5173/login
  - Login with a user that exists in the backend or with the seeded admin (admin / TempPass123!).
  - On success the token is stored in localStorage and the frontend loads the user profile from GET /api/user/profile.
  - If the profile contains mustResetPassword=true, the app will automatically redirect to /change-password.

- First-login change password
  - Visit /change-password (auto-redirected if the mustResetPassword flag is true).
  - Submit old and new password (POST /api/auth/change-password).
  - On success you are redirected to the dashboard.

- Dashboard (/app)
  - Shows cards for Today's, This Week and This Month emission totals (aggregated client-side from GET /api/activities), recent activities and charts.

- Profile
  - Visit /app/profile to GET /api/user/profile
  - Edit information and Save (PUT /api/user/profile) and expect success snackbar.

- Activity logging & history
  - Visit /app/activities to post a new activity (POST /api/activities).
  - The bottom half of the page lists activity history (GET /api/activities) with sorting & pagination.

Production build

```bash
cd frontend
npm ci
npm run build
```

This will produce a dist/ folder with the production build which can be served by any static server.

Notes and troubleshooting

- JWT secret: ensure the backend's `app.jwt.secret` is set to a non-default value when running in production.
- Email sending on registration approval is currently logged to console (developer stub). Configure SMTP in the backend if you want real emails.
- If API requests fail, open the browser Network tab and check the request/response; look for 401/403 (auth/token issues).

Contact

If you need additional changes on the UI, charts, or integration with more backend endpoints, please open an issue in the repo and describe the request.
