export type AuthState = { step: "login"; sessionExpired?: boolean } | { step: "signup" };
