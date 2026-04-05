// Bring in default Vite client type declarations.
/// <reference types="vite/client" />

// Augment Vite environment variable typing for this project.
interface ImportMetaEnv {
  // Auth0 tenant/domain, for example: dev-abc123.us.auth0.com
  readonly VITE_AUTH0_DOMAIN: string;
  // Auth0 SPA client ID configured in your Auth0 application.
  readonly VITE_AUTH0_CLIENT_ID: string;
}

// Extend ImportMeta so import.meta.env uses our typed ImportMetaEnv above.
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
