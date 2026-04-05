// Minimal app-level user shape derived from Auth0 user profile fields.
export interface AppUser {
  // Stable unique identifier from identity provider.
  sub?: string;
  // Display name shown in navbar/profile.
  name?: string;
  // Primary email address.
  email?: string;
  // URL to profile avatar image.
  picture?: string;
}
