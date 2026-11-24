// Which tab the card shows when no two-factor challenge is pending. The challenge
// itself (email + methods) lives in `pending-two-factor.ts`, so it survives a reload.
// `sessionExpired`: sent back here because the 2FA challenge timed out.
export type AuthState = { step: "login"; sessionExpired?: boolean } | { step: "signup" };
