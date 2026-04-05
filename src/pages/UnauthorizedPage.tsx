// Link for navigating back to login flow.
import { Link } from "react-router-dom";

// Informational page shown when user needs authentication.
export default function UnauthorizedPage() {
  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Unauthorized</h1>
        {/* Clear message and action to recover. */}
        <p className="muted">You need to log in before opening this page.</p>
        <Link className="btn btn-primary" to="/login">
          Go to Login
        </Link>
      </section>
    </main>
  );
}
