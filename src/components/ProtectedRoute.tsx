// Auth hook for checking loading and login status.
import { useAuth0 } from "@auth0/auth0-react";
// ReactNode type for typing child elements.
import type { ReactNode } from "react";
// Navigate performs redirects, useLocation reads current URL state.
import { Navigate, useLocation } from "react-router-dom";

// Props contract: this component wraps protected page content.
interface ProtectedRouteProps {
  children: ReactNode;
}

// Reusable guard for routes that require an authenticated user.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // isLoading: Auth0 still checking session; isAuthenticated: final auth state.
  const { isLoading, isAuthenticated } = useAuth0();
  // Current location lets us remember where user wanted to go.
  const location = useLocation();

  // While auth status is unresolved, show a loading panel.
  if (isLoading) {
    return (
      <main className="container page-shell">
        <section className="card panel">
          <h2>Loading...</h2>
          <p className="muted">Checking your authentication status.</p>
        </section>
      </main>
    );
  }

  // If user is not authenticated, redirect to login and remember original path.
  if (!isAuthenticated) {
    // Rebuild full in-app path (path + query params + hash fragment).
    const fromPath = `${location.pathname}${location.search}${location.hash}`;
    // Save path in router state so LoginPage can return user here after login.
    return <Navigate to="/login" state={{ from: fromPath }} replace />;
  }

  // Authenticated users can see the protected page content.
  return <>{children}</>;
}
