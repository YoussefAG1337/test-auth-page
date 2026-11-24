import { useMemo, useSyncExternalStore } from "react";
import { z } from "zod";

// The 2FA challenge lives in an httpOnly cookie for 10 minutes, but which step the card
// shows is client state; this keeps the two in step across a reload. sessionStorage so
// it dies with the tab, and validated because anything in storage can be stale or edited.
const STORAGE_KEY = "stolos:2fa";

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

export const savePendingTwoFactor = (pending: PendingTwoFactor) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
  listeners.forEach((listener) => listener());
};

export const clearPendingTwoFactor = () => {
  sessionStorage.removeItem(STORAGE_KEY);
  listeners.forEach((listener) => listener());
};

/**
 * After a successful verification: drops the entry so a later visit to /login doesn't
 * restore a used challenge, but without notifying, so the card doesn't flash back to
 * the sign-in form while the dashboard navigation is in flight.
 */
export const forgetPendingTwoFactor = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};

/**
 * The page is prerendered as the sign-in form (server snapshot `null`); a pending
 * challenge is picked up on the client without a hydration mismatch.
 */
export const usePendingTwoFactor = (): PendingTwoFactor | null => {
  // The raw string is the snapshot because it compares stable between renders.
  const raw = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(STORAGE_KEY),
    () => null,
  );
  return useMemo(() => parse(raw), [raw]);
};
