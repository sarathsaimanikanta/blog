# Blog Manager - Full-Stack Application

A modern full-stack blog management application built with Next.js 14, Payload CMS, and MongoDB Atlas. It offers a seamless developer and user experience with real-time CRUD functionality and a professional admin panel.

---

## Table of Contents
- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running The Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Admin Panel](#admin-panel)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About The Project
This project lets users create, edit, delete, and manage blog posts with an elegant frontend built in Next.js 14 and a powerful backend CMS powered by Payload CMS with MongoDB Atlas as a cloud database.

Key Features:
- Full CRUD for blog posts without frontend API boilerplate (uses Next.js Server Actions)
- Admin dashboard for content and user management at `/admin`
- Tailwind CSS based modern UI, fully responsive
- TypeScript-driven with strict types
- Secure environment variable management with `.env.local` (excluded from Git)
- Ready for production deployment (e.g., on Vercel)

---

## Tech Stack
- Frontend: Next.js 14 (App Router, Server Actions), React, Tailwind CSS
- Backend CMS: Payload CMS (headless content management)
- Database: MongoDB Atlas (cloud)
- Tools: TypeScript, ESLint, PostCSS, Cross-env

---

## Prerequisites
- Node.js v18.17+ installed
- npm (Node Package Manager)
- MongoDB Atlas account (free tier available)
- Git & GitHub account

---

## Installation & Setup

### 1. Clone the repository
git clone https://github.com/sarathsaimanikanta/blog.git
cd blog/frontend

### 2. Install dependencies
npm install

### 3. Create environment variables
cp .env.example .env.local
Edit `.env.local` and add your MongoDB connection string and secret keys.

---

## Running The Project

### Start development server:
npm run dev
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Environment Variables

Create `.env.local` with the following:

DATABASE_URI=your-mongodb-atlas-connection-string
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

> Do NOT commit your `.env.local` file as it contains sensitive information.

---

## Admin Panel

Access the admin panel at:  
[http://localhost:3000/admin](http://localhost:3000/admin)

Create the initial admin user here to manage posts and users.

---

## Deployment

This project is production-ready. Suggested steps:

1. Push to GitHub.
2. Deploy using [Vercel](https://vercel.com/).
3. Configure environment variables in Vercel dashboard with the same keys as `.env.local`.
4. Enjoy live site management with CMS built in.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am "Add new feature"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Next.js 14 & Payload CMS**
