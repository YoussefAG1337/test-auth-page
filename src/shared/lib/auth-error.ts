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
  readonly retryAfter?: number;

  constructor(key: AuthErrorKey, retryAfter?: number) {
    super(key);
    this.name = "AuthError";
    this.key = key;
    this.retryAfter = retryAfter;
  }
}

// Better-Auth's error object doesn't carry response headers.
export const readRetryAfter = (response: Response): number | undefined => {
  const seconds = Number(response.headers.get("X-Retry-After"));
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined;
};

// `code` and the two-factor fields are sent but missing from Better-Auth's types.
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
    case "INVALID_BACKUP_CODE":
      return "invalidRecoveryCode";
    case "OTP_HAS_EXPIRED":
      return "codeExpired";
    case "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE":
      return "tooManyCodeAttempts";
    case "INVALID_TWO_FACTOR_COOKIE":
      return "twoFactorExpired";
    case "INVALID_TOKEN":
      return "invalidResetLink";
    default:
      return "generic";
  }
};

export const readTwoFactorMethods = (data: unknown): string[] | null => {
  const record = toRecord(data);
  if (!record || record.twoFactorRedirect !== true) return null;

  const methods = record.twoFactorMethods;
  return Array.isArray(methods) ? methods.filter((m): m is string => typeof m === "string") : [];
};
