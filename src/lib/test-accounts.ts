/** Accounts created by `bun run db:seed`. All share the same password. */
export const TEST_PASSWORD = "Stolos-Test-2026";

export const TEST_ACCOUNTS = [
  { email: "none@example.com", name: "No MFA", app: false, email2fa: false },
  { email: "app@example.com", name: "App only", app: true, email2fa: false },
  { email: "both@example.com", name: "App and email", app: true, email2fa: true },
  { email: "email@example.com", name: "Email only", app: false, email2fa: true },
] as const;
