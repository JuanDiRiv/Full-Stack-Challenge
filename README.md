# Fullstack Challenge Project

A fullstack coding challenge implementation with a Next.js frontend and an Express API backend. The app covers authentication, external user consumption from ReqRes, local persistence in MongoDB, and posts CRUD with validation and automated tests.

## Features

- **Authentication**
  - Login flow integrated with ReqRes through backend endpoint `POST /api/auth/login`.
  - Protected frontend routes with a client-side auth guard.
- **Users**
  - ReqRes users list with pagination and search/filter behavior on the frontend.
  - ReqRes user detail view.
- **Saved Users**
  - Import ReqRes users into local MongoDB storage.
  - Saved users are available for local reads and as valid post authors.
- **Posts**
  - Full local CRUD (create, list, detail, edit, delete).
  - Post author selection from saved users.
- **Validation**
  - Request body validation with Zod in backend routes.
- **Testing**
  - Backend integration tests with Jest + Supertest.
  - Frontend component tests with Jest + React Testing Library.

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Zod
- **Database:** MongoDB (local via Docker)
- **Testing:** Jest, Supertest, React Testing Library, `@testing-library/jest-dom`, `mongodb-memory-server`
- **Tooling:** ESLint, tsx, Docker Compose

## Project Structure

```text
.
├── client/   # Next.js + TypeScript + Tailwind CSS frontend
├── server/   # Express + TypeScript + MongoDB backend
└── docker-compose.yml  # Local MongoDB service
```

## Quick Start

Run this minimal flow from the repository root:

```bash
docker compose up -d

cd server
npm install
npm run dev
```

Open a second terminal:

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

### 3) Start MongoDB with Docker

From repository root:

```bash
docker compose up -d
```

### 4) Configure environment variables

Create the environment files listed below.

### 5) Run backend

```bash
cd server
npm run dev
```

Default backend URL: `http://localhost:4000`

### 6) Run frontend

```bash
cd client
npm run dev
```

Default frontend URL: `http://localhost:3000`

## Environment Variables

### server/.env

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/fullstack_challenge
CORS_ORIGIN=http://localhost:3000
REQRES_BASE_URL=https://reqres.in
REQRES_API_KEY=your_reqres_api_key_here
```

### client/.env.local

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

> Do not commit real `.env` files or secrets.
> Use `.env.example` files as templates when available.

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the frontend for production
- `npm run start` - Start the production frontend server
- `npm run lint` - Run ESLint checks
- `npm test` - Run frontend Jest tests
- `npm run test:watch` - Run frontend Jest tests in watch mode

### Server (`server/package.json`)

- `npm run dev` - Start the backend in watch mode (tsx)
- `npm run build` - Compile TypeScript backend to `dist`
- `npm run start` - Run the compiled backend
- `npm run lint` - Run TypeScript type-checking only (`tsc --noEmit`)
- `npm test` - Run backend Jest tests
- `npm run test:watch` - Run backend Jest tests in watch mode

## API Overview

Base URL: `http://localhost:4000/api`

### Auth

- `POST /auth/login` - Authenticate with ReqRes through backend

### Users (ReqRes-backed reads)

- `GET /users?page=1` - List users by page
- `GET /users/:id` - Get user detail by ReqRes user ID

### Saved Users (local MongoDB)

- `POST /users/import/:id` - Import/save ReqRes user into local DB
- `GET /users/saved` - List saved users
- `GET /users/saved/:id` - Get saved user by local Mongo ID

### Posts (local MongoDB)

- `POST /posts` - Create post
- `GET /posts` - List posts
- `GET /posts/:id` - Get post detail
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Testing

### Backend tests

```bash
cd server
npm test
```

### Frontend tests

```bash
cd client
npm test
```

## Demo Notes

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:4000`
- MongoDB runs through Docker Compose
- ReqRes is used for authentication and external users data

## Notes / Trade-offs

- Authentication on the frontend uses a **client-side guard** for simplicity.
- Session token is stored in **localStorage** to keep implementation lightweight.
- Only **saved users** can be selected as valid post authors, which keeps local post data consistent.
- This project prioritizes clarity and challenge requirements over advanced production concerns (for example: server-side auth sessions, RBAC, or distributed caching).

## Deployment

Backend deployment URL (placeholder):

```text
https://your-backend-deployment-url
```

## Submission Checklist

- [ ] Local environment runs (`server` + `client` + Docker MongoDB)
- [ ] Backend tests pass (`cd server && npm test`)
- [ ] Frontend tests pass (`cd client && npm test`)
- [ ] Backend deployment URL is added in the Deployment section
