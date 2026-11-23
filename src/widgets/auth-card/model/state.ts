// A discriminated union rather than a bare string union: the two-factor step has to
// carry the account's available methods and the email it was reached with, and those
// only exist once sign-in has already answered.
export type AuthState =
  | { step: "login" }
  | { step: "signup" }
  | { step: "verify"; email: string; methods: string[] };
