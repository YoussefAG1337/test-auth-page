import { useMemo, useSyncExternalStore } from "react";
import { z } from "zod";
import { PENDING_TWO_FACTOR_COOKIE } from "./pending-two-factor-cookie";

// Same 10-minute lifetime as Better-Auth's 2FA cookie; a cookie so the server can render the right step on reload.
const MAX_AGE_SECONDS = 600;

const pendingTwoFactorSchema = z.object({
  email: z.string(),
  methods: z.array(z.string()),
});

export type PendingTwoFactor = z.infer<typeof pendingTwoFactorSchema>;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const parse = (raw: string | null): PendingTwoFactor | null => {
  if (!raw) return null;
  try {
    const parsed = pendingTwoFactorSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

const readCookie = (): string | null => {
  const prefix = `${PENDING_TWO_FACTOR_COOKIE}=`;
  const entry = document.cookie.split("; ").find((cookie) => cookie.startsWith(prefix));
  if (!entry) return null;
  try {
    return decodeURIComponent(entry.slice(prefix.length));
  } catch {
    return null;
  }
};

const writeCookie = (value: string, maxAgeSeconds: number) => {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${PENDING_TWO_FACTOR_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
};

const removeCookie = () => writeCookie("", 0);

export const savePendingTwoFactor = (pending: PendingTwoFactor) => {
  writeCookie(JSON.stringify(pending), MAX_AGE_SECONDS);
  listeners.forEach((listener) => listener());
};

export const clearPendingTwoFactor = () => {
  removeCookie();
  listeners.forEach((listener) => listener());
};

// Doesn't notify, so the sign-in form doesn't flash while the dashboard redirect is in flight.
export const forgetPendingTwoFactor = () => {
  removeCookie();
};

export const usePendingTwoFactor = (serverRaw: string | null): PendingTwoFactor | null => {
  const raw = useSyncExternalStore(subscribe, readCookie, () => serverRaw);
  return useMemo(() => parse(raw), [raw]);
};
