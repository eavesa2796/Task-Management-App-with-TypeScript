// React core import for StrictMode wrapper.
import React from "react";
// React DOM renderer for mounting the app into the HTML root element.
import ReactDOM from "react-dom/client";
// Auth0 provider that injects authentication context into React tree.
import { Auth0Provider } from "@auth0/auth0-react";
// Browser-based router for client-side page navigation.
import { BrowserRouter } from "react-router-dom";
// Root app component containing routes and layout.
import App from "./App";
// Global task context provider for task state/actions.
import { TaskProvider } from "./context/TaskContext";
// Global CSS styles.
import "./index.css";

// Read Auth0 settings from Vite environment variables.
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Create the React root and render the full provider tree.
ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode helps catch side effects and unsafe patterns in development.
  <React.StrictMode>
    {/* Auth provider must wrap components that use useAuth0(). */}
    <Auth0Provider
      // Fallback empty string avoids undefined prop values at runtime.
      domain={domain || ""}
      clientId={clientId || ""}
      authorizationParams={{
        // After login/logout redirects, return to this app origin.
        redirect_uri: window.location.origin,
      }}
    >
      {/* Task provider exposes task state and CRUD actions globally. */}
      <TaskProvider>
        {/* Router enables path-based rendering and navigation hooks. */}
        <BrowserRouter>
          {/* Main application UI. */}
          <App />
        </BrowserRouter>
      </TaskProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
