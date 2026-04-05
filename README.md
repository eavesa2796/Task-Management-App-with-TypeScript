# Coding Temple Style Task Manager (React + TypeScript)

A structured, beginner-friendly CRUD application aligned with common Coding Temple front-end project expectations:

- Strong TypeScript types
- Context API global state
- Reusable form components
- Protected routes with Auth0
- Clear dashboard workflow (search, filter, stats)
- Production-ready project organization

## Features

### 1. Dashboard Experience

- Task summary cards (total, todo, in-progress, done)
- Search tasks by title/description
- Filter by status
- Confirm before deleting

### 2. Task CRUD Workflow

- Create tasks with validation
- Edit existing tasks
- View task details page
- Delete tasks from dashboard

### 3. State Management (Context API)

- Typed context with strict interface contracts
- `addTask`, `updateTask`, `deleteTask`, `getTaskById`
- LocalStorage persistence so task data survives page refresh

### 4. Auth0 Authentication + Route Protection

- Login and register pages
- Profile page for authenticated user data
- Protected create/edit/profile routes
- Unauthorized + 404 fallback pages
- Startup check for missing Auth0 environment variables

### 5. TypeScript Coverage

- Shared types for tasks and auth user data
- Typed form validation errors
- Typed task status union

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Auth0 React SDK

## Project Structure

```text
src/
  components/
    NavBar.tsx
    ProtectedRoute.tsx
    TaskForm.tsx
  context/
    TaskContext.tsx
  pages/
    DashboardPage.tsx
    TaskDetailsPage.tsx
    CreateTaskPage.tsx
    EditTaskPage.tsx
    LoginPage.tsx
    RegisterPage.tsx
    ProfilePage.tsx
    UnauthorizedPage.tsx
    NotFoundPage.tsx
  types/
    task.ts
    auth.ts
  App.tsx
  main.tsx
  index.css
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Auth0

Create `.env` in project root:

```env
VITE_AUTH0_DOMAIN=my-auth0-domain
VITE_AUTH0_CLIENT_ID=my-auth0-client-id
```

In Auth0 dashboard:

- Allowed Callback URL: `http://localhost:5173`
- Allowed Logout URL: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

### 3. Run locally

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Suggested Improvements (Next Iteration)

- Replace localStorage with backend API persistence
- Add role-based permissions
- Add unit/integration tests (Vitest + Testing Library)
- Add toast notifications for CRUD actions
