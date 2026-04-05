// Auth0 hook for launching hosted authentication flow.
import { useAuth0 } from "@auth0/auth0-react";

// Register page triggers Auth0 signup screen.
export default function RegisterPage() {
  // loginWithRedirect is also used for signup with screen_hint.
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Register</h1>
        <p className="muted">
          Create a secure account and start managing tasks.
        </p>
        <button
          className="btn btn-primary"
          onClick={() =>
            // Pass screen_hint=signup to open the sign-up view first.
            loginWithRedirect({
              authorizationParams: {
                screen_hint: "signup",
              },
            })
          }
        >
          Register with Auth0
        </button>
      </section>
    </main>
  );
}
