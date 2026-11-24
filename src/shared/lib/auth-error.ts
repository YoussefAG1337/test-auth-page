export type AuthErrorKey =
  | "invalidCredentials"
  | "emailAlreadyUsed"
  | "passwordTooShort"
  | "tooManyRequests"
  | "invalidCode"
  | "invalidRecoveryCode"
  | "codeExpired"
  | "tooManyCodeAttempts"
  | "twoFactorExpired"
  | "invalidResetLink"
  | "generic";

export class AuthError extends Error {
  readonly key: AuthErrorKey;
  /** Seconds the server asked to wait, from `X-Retry-After` on a 429. */
  readonly retryAfter?: number;

  constructor(key: AuthErrorKey, retryAfter?: number) {
    super(key);
    this.name = "AuthError";
    this.key = key;
    this.retryAfter = retryAfter;
  }
}

/** Reads `X-Retry-After`; Better-Auth's error object doesn't carry response headers. */
export const readRetryAfter = (response: Response): number | undefined => {
  const seconds = Number(response.headers.get("X-Retry-After"));
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined;
};

// Better-Auth's typed error is only { status, statusText, message? } — `code` is sent
// on the wire but absent from the type, and the two-factor fields live on the plugin's
// hook type rather than on what signIn.email resolves to. Both are read structurally.
const toRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null ? { ...value } : null;

const readString = (value: unknown, key: string): string | undefined => {
  const found = toRecord(value)?.[key];
  return typeof found === "string" ? found : undefined;
};

const readNumber = (value: unknown, key: string): number | undefined => {
  const found = toRecord(value)?.[key];
  return typeof found === "number" ? found : undefined;
};

/**
 * Anything unrecognised collapses to `generic`, so an unmapped server code can never
 * tell a caller more about an account than a wrong password already would.
 */
export const authErrorKey = (error: unknown): AuthErrorKey => {
  if (readNumber(error, "status") === 429) return "tooManyRequests";

  switch (readString(error, "code")) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "invalidCredentials";
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "emailAlreadyUsed";
    case "PASSWORD_TOO_SHORT":
      return "passwordTooShort";
    case "INVALID_CODE":
      return "invalidCode";
    // Sent for a wrong code and for one already used: the message has to cover both.
    case "INVALID_BACKUP_CODE":
      return "invalidRecoveryCode";
    case "OTP_HAS_EXPIRED":
      return "codeExpired";
    case "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE":
      return "tooManyCodeAttempts";
    case "INVALID_TWO_FACTOR_COOKIE":
      return "twoFactorExpired";
    // The reset link's token: sent for an expired, already used or unknown one alike.
    case "INVALID_TOKEN":
      return "invalidResetLink";
    default:
      return "generic";
  }
};

/** Sign-in answers with a two-factor challenge instead of a session when 2FA is on. */
export const readTwoFactorMethods = (data: unknown): string[] | null => {
  const record = toRecord(data);
  if (!record || record.twoFactorRedirect !== true) return null;

  const methods = record.twoFactorMethods;
  return Array.isArray(methods) ? methods.filter((m): m is string => typeof m === "string") : [];
};
