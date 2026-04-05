// React Router components used to declare app routes.
import { Route, Routes } from "react-router-dom";
// Shared top navigation visible on every page.
import NavBar from "./components/NavBar";
// Wrapper that protects pages requiring authentication.
import ProtectedRoute from "./components/ProtectedRoute";
// Page shown when creating a new task.
import CreateTaskPage from "./pages/CreateTaskPage";
// Main dashboard page with search, stats, and task list.
import DashboardPage from "./pages/DashboardPage";
// Page shown when editing an existing task.
import EditTaskPage from "./pages/EditTaskPage";
// Auth0 login entry page.
import LoginPage from "./pages/LoginPage";
// Logged-in user profile page.
import ProfilePage from "./pages/ProfilePage";
// Auth0 signup entry page.
import RegisterPage from "./pages/RegisterPage";
// Detailed page for one task.
import TaskDetailsPage from "./pages/TaskDetailsPage";
// Fallback page for blocked access.
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Root app component: layout + all route definitions.
export default function App() {
  return (
    <>
      {/* Top navbar stays visible while the route content changes below. */}
      <NavBar />
      {/* Route table for the whole app. */}
      <Routes>
        {/* Public dashboard route. */}
        <Route path="/" element={<DashboardPage />} />
        {/* Public task detail route by dynamic task ID. */}
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
        {/* Protected route: user must be logged in to create tasks. */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
        {/* Protected route: user must be logged in to edit tasks. */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          }
        />
        {/* Auth entry points. */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected profile route. */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Informational route when authorization fails. */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </>
  );
}
