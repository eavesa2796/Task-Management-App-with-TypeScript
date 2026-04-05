// Auth0 hook for starting login and reading auth state.
import { useAuth0 } from "@auth0/auth0-react";
// Router tools for redirecting and reading route state.
import { Navigate, useLocation } from "react-router-dom";

// Login page for Auth0-based authentication.
export default function LoginPage() {
  // loginWithRedirect starts Auth0 hosted login; isAuthenticated says if session exists.
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // Read current route state (used to restore destination after login).
  const location = useLocation();

  // Router state may include path user attempted before redirect to login.
  const state = location.state as { from?: string } | null;
  // Fallback return path is dashboard.
  const rawReturnTo = state?.from || "/";
  // Avoid redirecting back to login itself.
  const returnTo = rawReturnTo === "/login" ? "/" : rawReturnTo;

  // If user is already authenticated, skip login UI and redirect immediately.
  if (isAuthenticated) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Login</h1>
        <p className="muted">Access your task dashboard securely with Auth0.</p>
        <button
          className="btn btn-primary"
          onClick={() =>
            // Start hosted login flow; appState stores where to return afterwards.
            loginWithRedirect({
              appState: { returnTo },
            })
          }
        >
          Login with Auth0
        </button>
      </section>
    </main>
  );
}
