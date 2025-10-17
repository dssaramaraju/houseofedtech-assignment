# Career Tracker — Full-Stack Assignment (House of EdTech)

A secure, full-stack Next.js application that helps users **track job applications** —  
built as part of the **House of EdTech Fullstack Developer Assignment**.

This app demonstrates a complete production-grade workflow including:
- Authentication with Google (NextAuth)
- Protected routes
- Full CRUD (Create, Read, Update, Delete)
- PostgreSQL database (via Supabase)
- Prisma ORM
- Type-safe backend + Tailwind frontend

---
## ✨ Features

- 🔐 **Google Authentication** using NextAuth and Prisma Adapter  
- 🧩 **Protected Routes & Sessions** (only logged-in users can access `/applications`)  
- 📄 **Full CRUD Functionality** for managing job applications  
  - Create new application entries  
  - View your saved applications  
  - Edit application status or notes  
  - Delete applications  
- 🗃️ **PostgreSQL Database** powered by Supabase (with Prisma ORM)  
- ⚡ **Next.js 15 App Router** with modern `route.ts` handlers  
- 💅 **Tailwind CSS** for clean and responsive UI  
- 🧰 **TypeScript** for complete type safety  
- 🧭 **Server-side Redirects** for secure authentication flow

## 🛠️ Tech Stack

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | Next.js 15 (App Router) + React 18 |
| **Styling** | Tailwind CSS |
| **Backend** | Next.js API Routes (`app/api`) |
| **Database** | Supabase (PostgreSQL) |
| **ORM** | Prisma |
| **Authentication** | NextAuth.js (Google Provider) |
| **Language** | TypeScript |
| **Deployment** | Vercel (Frontend) + Supabase Cloud (Database) |

## 🧠 Project Architecture Overview

The application follows a clean full-stack architecture using the **Next.js App Router**.

- **Frontend Pages:** Under `src/app/` (UI and page routing)
- **Backend APIs:** Under `src/app/api/` (server route handlers)
- **Authentication:** Implemented with NextAuth (Google OAuth)
- **Database Layer:** Managed by Prisma ORM connected to Supabase PostgreSQL
- **Session Management:** Stored securely in the database
- **Protected Routes:** Only authenticated users can access `/applications`

### Folder Structure

---

## 🧩 Data Model (Prisma Schema)

This project uses **Prisma ORM** to manage the Supabase (PostgreSQL) database.  
Below is the main `Application` model responsible for tracking job applications.

```prisma
model Application {
  id         String   @id @default(cuid())
  userId     String
  title      String
  company    String
  status     String   @default("applied") // applied | interview | offer | rejected
  notes      String?
  appliedAt  DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
}

