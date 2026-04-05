// Auth0 hook gives access to current auth state and auth actions.
import { useAuth0 } from "@auth0/auth0-react";
// Link enables client-side route changes without full page reload.
import { Link } from "react-router-dom";

// Top navigation component shown on every page.
export default function NavBar() {
  // Pull auth status, user profile, and logout function from Auth0.
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    // Main nav wrapper styled by index.css
    <nav className="nav">
      {/* Shared max-width container for consistent page alignment. */}
      <div className="container">
        {/* Brand text. */}
        <div className="brand">
          Task<span className="brand-accent">Temple</span>
        </div>

        {/* Primary navigation links/actions. */}
        <div className="nav-links">
          {/* Dashboard is always visible. */}
          <Link to="/">Dashboard</Link>
          {/* Create is visible only when logged in. */}
          {isAuthenticated && <Link to="/create">Create Task</Link>}
          {/* Profile is visible only when logged in. */}
          {isAuthenticated && <Link to="/profile">Profile</Link>}
          {/* If logged out, show auth entry links. */}
          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            // If logged in, replace auth links with logout action.
            <button
              className="btn btn-soft"
              onClick={() =>
                logout({
                  logoutParams: {
                    // Send user back to app home after logout.
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              {/* Show user's name when available. */}
              Logout {user?.name ? `(${user.name})` : ""}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
