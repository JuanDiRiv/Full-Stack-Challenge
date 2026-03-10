# Fullstack Challenge Project

A fullstack coding challenge application with a **Next.js frontend** and an **Express API backend**. The frontend handles user workflows (login, users, saved users, posts), while the backend integrates with **ReqRes** for external authentication/user data and persists local entities in **MongoDB**. The backend is deployed on **AWS Lambda** and the frontend is deployed separately.

## Features

- **Authentication**
  - Login via ReqRes (`POST /api/auth/login`).
  - Cookie-based session using HttpOnly auth cookie (`auth_token`).
  - Session check (`GET /api/auth/session`) and logout (`POST /api/auth/logout`).
  - Protected frontend routes based on backend session validation.
- **Users**
  - Paginated ReqRes users listing.
  - ReqRes user detail by external ID.
- **Saved Users**
  - Import ReqRes users into local MongoDB.
  - Read saved users and saved user detail.
  - Saved users are the allowed author source for posts.
- **Posts**
  - Local CRUD (create, list, detail, update, delete).
  - Author mapping from saved users.
- **Validation**
  - Request validation with Zod in backend routes.
- **Testing**
  - Backend tests with Jest + Supertest.
  - Frontend tests with Jest + React Testing Library.
- **Deployment**
  - Backend deployed with AWS SAM on AWS Lambda.
  - Frontend deployed independently.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, Zod, cookie-parser, serverless-http
- **Database**: MongoDB (local via Docker, production via MongoDB Atlas)
- **Testing**: Jest, Supertest, React Testing Library, `@testing-library/jest-dom`, `mongodb-memory-server`
- **Tooling / Deployment**: ESLint, tsx, Docker Compose, AWS SAM, AWS Lambda, esbuild

## Project Structure

```text
.
├── client/              # Next.js + TypeScript + Tailwind CSS frontend
├── server/              # Express + TypeScript backend
├── docker-compose.yml   # Local MongoDB
└── template.yaml        # AWS SAM template for backend deployment
```

## Quick Start

From the repository root:

```bash
docker compose up -d

cd server
npm install
npm run dev
```

In a second terminal:

```bash
cd client
npm install
npm run dev
```

## Local Setup

### 1) Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose

### 2) Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3) Start local MongoDB

```bash
docker compose up -d
```

### 4) Configure environment variables

Create `server/.env` and `client/.env.local` based on the examples below.

### 5) Run backend locally

```bash
cd server
npm run dev
```

Local backend URL: `http://localhost:4000`

### 6) Run frontend locally

```bash
cd client
npm run dev
```

Local frontend URL: `http://localhost:3000`

## Environment Variables

### Server (`server/.env`)

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/fullstack_challenge
CORS_ORIGIN=http://localhost:3000
REQRES_BASE_URL=https://reqres.in
REQRES_API_KEY=reqres_c86d3ee1c8644347b7464dcfaea6b113
```

### Client (`client/.env`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Notes:


- The deployed backend uses MongoDB Atlas in production.

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Next.js in development mode
- `npm run build` - Build frontend for production
- `npm run start` - Start production frontend build
- `npm run lint` - Run ESLint checks
- `npm test` - Run frontend tests
- `npm run test:watch` - Run frontend tests in watch mode

### Server (`server/package.json`)

- `npm run dev` - Start backend in watch mode (tsx)
- `npm run build` - Compile backend TypeScript to `dist`
- `npm run start` - Run compiled backend from `dist`
- `npm run lint` - Type-check backend only (`tsc --noEmit`)
- `npm test` - Run backend tests
- `npm run test:watch` - Run backend tests in watch mode

## API Overview

Local base URL: `http://localhost:4000/api`

### Health

- `GET /health`

### Auth

- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/session`

### Users (ReqRes-backed)

- `GET /users?page=1`
- `GET /users/:id`

### Saved Users (Local MongoDB)

- `POST /users/import/:id`
- `GET /users/saved`
- `GET /users/saved/:id`

### Posts (Local MongoDB)

- `POST /posts`
- `GET /posts`
- `GET /posts/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`

## Live API

Backend base URL:

```text
https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com
```

Notes:

- `GET` endpoints are easy to verify directly in the browser.
- Auth endpoints are better tested with Postman/Insomnia (or another REST client), especially `POST /api/auth/login`.

Example public endpoints:

- Health: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com/api/health`
- Users list: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com/api/users?page=1`
- Posts list: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com/api/posts`
- Saved users list: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com/api/users/saved`

## Testing

### Backend

```bash
cd server
npm test
```

### Frontend

```bash
cd client
npm test
```

## Demo Notes

- Local frontend: `http://localhost:3000`
- Local backend: `http://localhost:4000`
- Local MongoDB: Docker Compose (`docker compose up -d`)
- Deployed backend: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com`
- Deployed frontend: `https://full-stack-challenge-sage.vercel.app`
- ReqRes is used for authentication and external users data.

### Test User (ReqRes)

Use the following credentials to test login in the app:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "pistol"
}
```

## Notes / Trade-offs

- Authentication is cookie-based (HttpOnly cookie managed by backend), not localStorage-based token persistence.
- Protected routing in the frontend is client-side and based on backend session checks.
- Saved users are used as valid post authors to keep local post data consistent.
- The implementation prioritizes challenge scope and readability over advanced auth/session patterns (for example refresh token rotation or SSR auth middleware).

## Deployment

The backend is deployed on **AWS Lambda** using AWS SAM.

- Backend base URL: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com`
- Health endpoint: `https://bmm9t1jik1.execute-api.us-east-1.amazonaws.com/api/health`

## Submission Checklist

- [ ] Local environment runs (`server` + `client` + Docker MongoDB)
- [ ] Backend tests pass (`cd server && npm test`)
- [ ] Frontend tests pass (`cd client && npm test`)
- [ ] Deployed backend URL is documented
- [ ] README is complete and aligned with the final implementation
