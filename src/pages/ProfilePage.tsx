// Auth0 hook provides the current authenticated user's profile object.
import { useAuth0 } from "@auth0/auth0-react";
// Local app typing for user data we care about.
import type { AppUser } from "../types/auth";

// Profile page shows basic authenticated user info.
export default function ProfilePage() {
  // user may be undefined, so we map it to typed fallback object.
  const { user } = useAuth0();
  const appUser: AppUser = user || {};

  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Profile</h1>
        <p className="muted">Your authenticated account information.</p>
        {/* Display safe fallback text if fields are missing. */}
        <p>
          <strong>Name:</strong> {appUser.name || "No name"}
        </p>
        <p>
          <strong>Email:</strong> {appUser.email || "No email"}
        </p>
        {/* Conditionally render profile image only when provided by Auth0. */}
        {appUser.picture && (
          <img
            src={appUser.picture}
            alt="Profile"
            style={{
              width: "80px",
              borderRadius: "50%",
              border: "2px solid #dfd7ca",
            }}
          />
        )}
      </section>
    </main>
  );
}
