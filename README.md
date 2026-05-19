# MediQueue

Live Site: `https://your-mediqueue-site.vercel.app`

MediQueue is a full-stack tutor booking web application where students can register, sign in, browse tutors, book sessions, and manage their personal class schedule from a clean dashboard experience.

## Features

- Firebase email/password and Google authentication with server-issued JWT support for protected API access
- Public tutor discovery with case-insensitive search by tutor name and date-range filtering by session start date
- Private tutor booking flow with digital session token generation and slot protection logic
- Tutor management dashboard for creating, updating, and deleting tutor listings without a page reload
- Learner booking dashboard with cancel flow, status updates, and friendly empty states
- Fully responsive light and dark theme interface with toast-based feedback and dynamic page titles

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Query
- Firebase Authentication
- Express
- MongoDB with Mongoose

## Environment Variables

Create a `.env` file with the Vite variables below:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Local Development

```bash
npm install
npm run dev
```
