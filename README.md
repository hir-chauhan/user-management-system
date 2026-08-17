# 🛡️ Enterprise User Management System

A full-stack, enterprise-grade User Management System built with a scalable architecture, secure JWT authentication, responsive UI with light/dark theme support, server-side search, filtering, sorting, pagination, and modular CRUD operations.

---

## 📌 Table of Contents

1. [Project Overview & Key Features](#-1-project-overview--key-features)
2. [Technology Stack](#-2-technology-stack)
3. [Architecture & Directory Structure](#-3-architecture--directory-structure)
4. [Environment Variables](#-4-environment-variables)
5. [Database Setup & Configuration](#-5-database-setup--configuration)
6. [Installation & Setup Instructions](#-6-installation--setup-instructions)
   - [Backend Installation](#backend-setup)
   - [Frontend Installation](#frontend-setup)
7. [Running the Project Locally](#-7-running-the-project-locally)
8. [Demo Seed Credentials](#-8-demo-seed-credentials)
9. [API Endpoint Documentation](#-9-api-endpoint-documentation)
10. [Authentication Approach & Security](#-10-authentication-approach--security)
11. [Assumptions & Known Limitations](#-11-assumptions--known-limitations)
12. [Screenshots & Live Demo](#-12-screenshots--live-demo)

---

## 🚀 1. Project Overview & Key Features

### 🔐 Authentication & Access Control
- **JWT Authentication**: Secure token-based session management with automatic storage in Zustand persistence (`localStorage`).
- **Route Protection**: Client-side route guards using `@tanstack/react-router` preventing unauthorized access to protected dashboard and user management pages.
- **Backend Protection**: Middleware-level authorization checking `Bearer <token>` headers with role-based checks.
- **Secure Password Handling**: Password hashing with `bcryptjs` (salt rounds: 10). Password field is marked `select: false` by default in Mongoose to prevent accidental leaks.

### 👥 User Management & CRUD
- **Create User**: Modal dialog with full schema validation (`react-hook-form` + `zod`), checking required first/last names, unique email, role, status, and minimum 6-character password.
- **View User Details**: Interactive modal displaying complete user information including initials avatar, formatted dates, role badges, and status badges.
- **Edit User (Partial Updates)**: Smart edit dialog that only sends modified/dirty fields in the payload rather than resending unmodified data. Password update is optional during edit.
- **Delete User**: Reusable confirmation dialog with loading state and instant query cache invalidation.

### ⚡ Optimized Table & Query Controls
- **TanStack Data Table**: Powered by `@tanstack/react-table` for high performance.
- **Debounced Server Search**: Real-time multi-field search (First Name, Last Name, Full Name with MongoDB concatenation, and Email).
- **Server-Side Filters**: Instant filtering by Role (`Admin`, `User`) and Status (`Active`, `Inactive`).
- **Server-Side Sorting**: Column sorting by Full Name, Email, Role, Status, and Created Date with visual direction arrows.
- **Server-Side Pagination**: Configurable page size (10, 20, 50 rows) with responsive pagination controls.
- **Real-Time Stat Cards**: Displays Total Users, Active Users, Admins, and Inactive Users in a responsive 2x2 grid on mobile and 4 columns on desktop.

### 🎨 Modern UI/UX
- **Theme Switcher**: Full Light Mode & Dark Mode support persisted via Tailwind CSS class strategy.
- **Responsive Layout**: Collapsible sidebar navigation for desktop and drawer overlay for mobile screens.
- **Toast Notifications**: Modern notifications using `sonner` for success and error feedbacks.

---

## 🛠️ 2. Technology Stack

### **Frontend**
| Technology | Description |
| :--- | :--- |
| **React 18** | UI component library with functional components & hooks |
| **TypeScript** | Type safety across components, forms, APIs, and hooks |
| **Vite** | Fast build tool and development server |
| **@tanstack/react-router** | Type-safe routing with route loading and auth guards |
| **@tanstack/react-query** | Server-state management, query caching, and mutations |
| **@tanstack/react-table** | Headless data table for flexible UI and server pagination |
| **Zustand** | Lightweight client state management with persistent storage |
| **React Hook Form + Zod** | Form handling and declarative schema-based validation |
| **Tailwind CSS + Shadcn UI** | Utility-first styling with modern UI components |
| **Lucide React** | Consistent iconography across the application |
| **Axios** | HTTP client with centralized interceptors and error handlers |
| **Sonner** | Clean, customizable toast notifications |

### **Backend**
| Technology | Description |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment (ES Modules) |
| **Express.js** | Web framework for REST API development |
| **TypeScript** | Strict compile-time type safety across routes, controllers, and models |
| **MongoDB & Mongoose** | NoSQL database & Object Data Modeling (ODM) |
| **jsonwebtoken (JWT)** | Secure token generation and verification |
| **bcryptjs** | Password hashing algorithm |
| **Zod** | Request validation schemas for body, query, and params |
| **Cors & Morgan** | Cross-Origin Resource Sharing & HTTP request logging |

---

## 📂 3. Architecture & Directory Structure

```
user-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # db.ts (MongoDB connection), env configs
│   │   ├── controllers/     # auth.controller.ts, user.controller.ts
│   │   ├── middleware/      # auth.middleware.ts, validate.middleware.ts, error.middleware.ts
│   │   ├── models/          # User.ts (Mongoose schema, bcrypt hooks)
│   │   ├── routes/          # auth.routes.ts, user.routes.ts, index.ts
│   │   ├── schemas/         # auth.schema.ts, user.schema.ts (Zod request validation)
│   │   ├── seeds/           # seedUsers.ts (Demo admin seeder script)
│   │   ├── utils/           # apiResponse.ts, jwt.ts
│   │   └── server.ts        # Express application entry point
│   ├── .env.example         # Backend environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # badge.tsx, stat-card.tsx, confirm-dialog.tsx
│   │   │   ├── layout/      # header.tsx, sidebar.tsx, dashboard-layout.tsx
│   │   │   ├── table/       # data-table.tsx (TanStack table abstraction)
│   │   │   └── ui/          # button, dialog, input, select, password-input, etc.
│   │   ├── config/          # endpoints.ts, instance.ts (Axios client setup)
│   │   ├── context/         # theme-provider.tsx (Theme context)
│   │   ├── features/
│   │   │   ├── auth/        # login-page.tsx, hooks/, schema/
│   │   │   ├── dashboard/   # index.tsx (Overview & recent users)
│   │   │   └── user-management/ # index.tsx, components/, hooks/, schema/, types.ts
│   │   ├── hooks/           # useFetchData, usePostData, usePatchData, useDeleteData
│   │   ├── lib/             # utils.ts (cn helper)
│   │   ├── routes/          # router.tsx (TanStack Router route tree & guards)
│   │   ├── stores/          # auth-store.ts (Zustand store with localStorage persist)
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example         # Frontend environment variables template
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## ⚙️ 4. Environment Variables

### Backend (`backend/.env`)
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ 5. Database Setup & Configuration

### Option A: Local MongoDB
1. Ensure MongoDB Community Server is installed and running on default port `27017`.
2. Connect string: `mongodb://127.0.0.1:27017/user_management_db`.

### Option B: MongoDB Atlas (Cloud)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User and whitelist your IP address (`0.0.0.0/0` for development).
3. Copy your connection string and paste it into `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/user_management_db?retryWrites=true&w=majority
   ```

---

## 📦 6. Installation & Setup Instructions

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB**: Local instance or MongoDB Atlas cluster

### Backend Setup
```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Seed demo admin user
npm run seed
```

### Frontend Setup
```bash
# 1. Navigate to frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```

---

## ▶️ 7. Running the Project Locally

Run the backend and frontend concurrently in two separate terminal windows:

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

### Terminal 2: Frontend Client
```bash
cd frontend
npm run dev
# Vite client will start on http://localhost:5173
```

Now open **`http://localhost:5173`** in your browser.

---

## 🔑 8. Demo Seed Credentials

To populate the database with initial users or seed the admin user, run `npm run seed` in the backend folder or use the default credentials:

| Field | Demo Credential |
| :--- | :--- |
| **Email** | `admin@gmail.com` |
| **Password** | `Admin@123` |
| **Role** | `Admin` |

---

## 📡 9. API Endpoint Documentation

Base URL: `http://localhost:5000/api`

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Log in user and receive JWT token | No |
| `POST` | `/auth/logout` | Clear user session | No |

#### `POST /auth/login` Request Body:
```json
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

---

### User Management Endpoints
All user endpoints require the `Authorization` header: `Bearer <token>`.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | Get paginated users with filters, search, and sorting | Yes (JWT) |
| `GET` | `/users/stats` | Get aggregate counts (total, active, admin, inactive) | Yes (JWT) |
| `GET` | `/users/:id` | Get details of a single user by MongoDB ID | Yes (JWT) |
| `POST` | `/users` | Create a new user | Yes (JWT) |
| `PATCH` | `/users/:id` | Partially update an existing user | Yes (JWT) |
| `DELETE` | `/users/:id` | Delete a user by MongoDB ID | Yes (JWT) |
| `POST` | `/seed` | Seed default admin user (Development) | No |

#### Query Parameters for `GET /users`:
- `page` (number, default: `1`): Current page number.
- `limit` (number, default: `10`): Items per page.
- `search` (string, optional): Searches across first name, last name, full name, and email.
- `role` (string, optional): Filter by `Admin` or `User`.
- `status` (string, optional): Filter by `Active` or `Inactive`.
- `sortBy` (string, default: `createdAt`): Sort field (`firstName`, `email`, `role`, `status`, `createdAt`).
- `sortOrder` (string, default: `desc`): Sort direction (`asc` or `desc`).

#### `POST /users` Request Body:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "+1234567890",
  "role": "User",
  "status": "Active",
  "password": "Password@123"
}
```

#### `PATCH /users/:id` Request Body (Partial updates supported):
```json
{
  "firstName": "Janet",
  "status": "Inactive"
}
```

---

## 🔒 10. Authentication Approach & Security

1. **State Persistence**: On successful login, the JWT token and user profile are saved in Zustand store, which persists across reloads via `createJSONStorage(() => localStorage)`.
2. **Axios Interceptor**: Outgoing requests via `instance.ts` automatically attach the header:
   ```http
   Authorization: Bearer <token>
   ```
3. **Route Guards (`router.tsx`)**:
   - Routes with `beforeLoad` verify `isLoggedIn()`. Unauthenticated users attempting to access `/dashboard` or `/users` are immediately redirected to `/login`.
   - Authenticated users attempting to visit `/login` or `/` are redirected to `/users`.
4. **Token Verification**: Backend `auth.middleware.ts` extracts and verifies the JWT against `process.env.JWT_SECRET`.
5. **Password Encryption**: Stored with `bcryptjs` hashing (10 salt rounds) and excluded from find queries via schema configuration `select: false`.

---

## ⚠️ 11. Assumptions & Known Limitations

1. **Email Uniqueness**: Email addresses are strictly unique and stored in lowercase. Attempting to register or update to an existing email returns a `400 Bad Request`.
2. **Single Organization Context**: Designed as a single-tenant portal with Admin and User role tiers.
3. **Token Invalidation**: Uses standard stateless JWT tokens. If instant server-side revocation is needed before expiry, a Redis blacklist or token version counter can be integrated.
4. **Phone Formatting**: Phone numbers are stored as strings without strict E.164 normalization.

---

## 📸 12. Live Demo

- **Live Deployment Link**: https://user-management-system-cyan-ten.vercel.app/login

---
