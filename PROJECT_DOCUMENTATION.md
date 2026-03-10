# LRNit Website - Project Documentation (A to Z)

This document provides a comprehensive overview of the **LRNit** student organization website, covering its tech stack, design system, admin functionality, and core features.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite for fast development & bundling)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (Utility-first CSS framework)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) (Smooth transitions and scroll animations)
- **Icons**: [Lucide React](https://lucide.dev/) (Modern and lightweight icon set)
- **Routing**: [React Router DOM 7](https://reactrouter.com/) (Client-side routing)
- **State/API**: [Axios](https://axios-http.com/) (HTTP client for API requests)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/) (Web framework for building APIs)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose 9 for data modeling)
- **Authentication**: [JWT (JSON Web Token)](https://jwt.io/) & `bcryptjs` for secure password hashing
- **File Handling**: `multer` for processing image uploads

### Cloud & External Services
- **Storage**: [Supabase Storage](https://supabase.com/storage) (Used for hosting images for Team and Gallery)
- **ORM/Auth (Alternative)**: [Supabase](https://supabase.com/) client is configured for storage operations.
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Frontend) and likely a cloud provider for the Node.js API.

---

## 🎨 Design System & Color Palette

The website follows a modern, technical, and premium aesthetic with vibrant colors and dynamic elements.

### Color Palette
- **Primary Background**: `#F5F7FF` (Soft Light Blue/Technical White)
- **Heading/Primary Text**: `#0B3D91` (Deep Tech Navy)
- **Primary Accents**:
    - `#1E63FF` (Bright Tech Blue)
    - `#A020F0` (LRNit Vivid Purple)
- **Body Text**: `#1F2937` (Dark Slate Gray)
- **Gradients**: Linear gradient from Bright Blue (`#1E63FF`) to Vivid Purple (`#A020F0`)

### Typography
- **Headings**: `Space Grotesk` (Modern, geometric sans-serif for impact)
- **Body Text**: `Outfit` (Clean, highly readable sans-serif)

### Visual Elements
- **Glassmorphism**: Semi-transparent backgrounds with blur (`backdrop-filter: blur(12px)`)
- **Circuit Pattern**: Custom radial-dot pattern used as a background texture for a "technical" feel.
- **Micro-animations**: Smooth hover effects and entry transitions via Framer Motion.

---

## 🛡️ Admin Dashboard (The CMS)

A dedicated, hidden admin panel manages the organization's dynamic content.

### Authentication
- Route: `/lrnit-admin`
- Security: Protected by JWT (JSON Web Tokens). Users must login to access the dashboard.
- Features: Login with secure password hashing via Bcrypt.

### Content Management (CMS)
The admin dashboard allows managing:
- **Teams**: Add, edit, or delete team members (with photo uploads).
- **Gallery**: Manage images, categorizing them (Events, Workshops, etc.) with a "Dropdown + Other" functionality.
- **Events**: Create and update live events/workshops.
- **Announcements**: Post news and updates for the organization members.

---

## ⚙️ Key Features & Implementation

1. **Gallery with Filtering**: Dynamic gallery that allows users to filter by categories. Admin can add new categories via the "Other" option.
2. **Team Section**: Showcases organization leads and members with smooth entrance animations.
3. **Live Events**: Real-time listing of upcoming events synced from the MongoDB database.
4. **PWA Support**: Configured as a Progressive Web App (PWA) with a manifest and service worker, making it installable on mobile devices.
5. **Image Upload Pipeline**: Photos are uploaded by admins, processed via `multer` on the server, and stored securely in Supabase Storage buckets.
6. **Responsive Design**: Fully mobile-responsive layout using Tailwind's grid and flexbox utilities.

---

## 📂 Project Structure Overview

```text
/
├── client/              # React (Vite) Frontend
│   ├── src/
│   │   ├── admin/       # Dashboard & Login Components
│   │   ├── components/  # Shared UI (Navbar, Footer, etc.)
│   │   ├── pages/       # Public Pages (Home, Team, Gallery)
│   │   ├── index.css    # Global Styles & Color Tokens
│   │   └── main.jsx     # App Entrance
├── server/              # Node.js (Express) Backend
│   ├── routes/          # API endpoints (Auth, Events, Team)
│   ├── models/          # MongoDB/Mongoose Schemas
│   └── index.js         # Server Entry Point
├── supabase_schema.sql  # Database structure (for reference/storage)
└── uploads/             # (Optional) Local storage for file buffers
```
