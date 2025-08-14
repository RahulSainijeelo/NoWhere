# Nowhere — Express.js + EJS Full‑Stack App (Dec 2023)

A complete Express.js application built right after learning full‑stack fundamentals. It uses EJS for server‑side rendering, MongoDB for data, Cloudinary for image storage, and has full CRUD, authentication, search, comments, and centralized error handling.

- Tech: Node.js, Express.js, EJS, MongoDB/Mongoose, Cloudinary
- Features: Auth (signup/login), posts with images, comments, search, robust error handling
- Status: Practice/foundation project that shaped how I structure real apps

## Demo

- Screenshots: add 2–3 images (feed, create post, error message)
- Short video: 30–60s flow (login → create post → upload image → comment → search)
- Live link: if deployed, add URL; otherwise mark “local only”

## Table of Contents

- Features
- Architecture
- Getting Started
- Environment Variables
- Run Locally
- Cloudinary Setup
- Scripts
- Folder Structure
- API Endpoints
- Data Models
- Error Handling
- Security Notes
- Roadmap
- Lessons Learned
- License

## Features

- Server‑side rendered pages with EJS for fast first paint and SEO‑friendly routes
- User authentication: signup, login, logout, session handling
- Posts: create, read, update, delete (with ownership checks)
- Image uploads to Cloudinary (secure, sized, and stored off‑app)
- Comments on posts with validation and moderation basics
- Basic search across post titles/content
- Centralized error handling with friendly UI messages and developer logs
- Input validation and sanitized forms

## Architecture

- MVC‑style structure: routes → controllers → services → models → views
- EJS templating with layout/partials for reusable UI
- Mongoose for MongoDB models and queries
- Cloudinary SDK for media uploads (server‑side signed)
- Express session/cookies for auth state
- Centralized error middleware for consistent handling

## Getting Started

Prerequisites:
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

## Environment Variables

Create a .env file in the project root:

- PORT=3000
- MONGODB_URI=your_mongodb_connection_string
- SESSION_SECRET=your_long_random_string
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret

Do not commit .env.

## Run Locally

- Install deps:
  - npm install
- Seed or create an initial user if you have a seed script
- Start dev server:
  - npm run dev
- Visit:
  - http://localhost:3000

## Cloudinary Setup

- Create a Cloudinary account
- Get cloud name, API key, API secret from dashboard
- Add credentials to .env
- In the upload flow, ensure file size/type limits and handle Cloudinary errors (timeout, invalid signature, etc.)

## Scripts

- dev: nodemon + ts-node/esbuild if applicable (or plain nodemon)
- start: node server.js
- lint: if you use ESLint/Prettier
- test: optional (add when you write tests)

Example:
- npm run dev
- npm run start

## Folder Structure

- src/
  - server.js (or app.js)
  - routes/
    - auth.routes.js
    - post.routes.js
    - comment.routes.js
  - controllers/
    - auth.controller.js
    - post.controller.js
    - comment.controller.js
  - services/
    - post.service.js
    - cloudinary.service.js
  - models/
    - User.js
    - Post.js
    - Comment.js
  - middlewares/
    - auth.middleware.js
    - error.middleware.js
    - validate.middleware.js
  - views/
    - layouts/
      - main.ejs
    - partials/
      - navbar.ejs
      - flash.ejs
    - auth/
      - login.ejs
      - signup.ejs
    - posts/
      - index.ejs
      - show.ejs
      - new.ejs
      - edit.ejs
    - comments/
      - list.ejs
  - public/
    - css/
    - js/
    - images/
- .env
- package.json

## API Endpoints

Auth
- GET /login — login page
- POST /login — authenticate
- GET /signup — signup page
- POST /signup — create user
- POST /logout — destroy session

Posts
- GET /posts — list (supports ?q=search)
- GET /posts/new — form
- POST /posts — create (with image upload)
- GET /posts/:id — view
- GET /posts/:id/edit — edit form
- POST/PUT /posts/:id — update
- POST/DELETE /posts/:id — delete

Comments
- POST /posts/:id/comments — add comment
- POST/DELETE /posts/:id/comments/:commentId — delete (owner/mod only)

Note: Method override may be used for PUT/DELETE with forms.

## Data Models

User
- fields: email (unique), passwordHash, name, createdAt
- methods: password hashing/verification

Post
- fields: title, body, imageUrl, imagePublicId, authorId, createdAt, updatedAt
- indexes: text index on title/body for search

Comment
- fields: postId, authorId, body, createdAt
- relations: refs to Post and User

## Error Handling

- Central error middleware formats operational errors and falls back to generic messages in production
- Validation errors return 400 with per‑field messages
- Auth errors redirect with flash messaging where appropriate
- Cloudinary failures surface user‑friendly messages and preserve form inputs
- 404 route for unknown endpoints

## Security Notes

- Sessions/cookies: httpOnly and secure in production
- Passwords: hashed with bcrypt; never stored in plain text
- Input validation and basic sanitization on all forms
- CSRF: add csurf if you enable write forms widely
- Rate limiting: advisable for auth and upload routes in production
- Env secrets: not committed; use dotenv or managed secrets

## Roadmap

- Pagination on /posts
- Image transformations and responsive images
- Role‑based permissions (admin/moderator)
- CSRF protection on forms
- Integration tests for auth and posts
- Switch to Multer temp storage + size/type guards for uploads

## Lessons Learned

- Structure first: clear routes/controllers/middlewares made debugging easy
- UX over happy paths: validation and friendly errors matter as much as features
- Offloading media: Cloudinary simplified file handling and kept the app stable

## Acknowledgments

- Express/EJS community examples and MongoDB docs
- Cloudinary docs for upload and transformation patterns.

