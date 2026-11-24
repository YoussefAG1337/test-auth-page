import { useSyncExternalStore } from "react";

// Which address the "check your inbox" screen is about, so a reload stays on that
// screen with the resend timer instead of dropping back to the form. sessionStorage
// so it dies with the tab.
const STORAGE_KEY = "stolos:password-reset";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const savePendingReset = (email: string) => {
  sessionStorage.setItem(STORAGE_KEY, email);
  notify();
};

export const clearPendingReset = () => {
  sessionStorage.removeItem(STORAGE_KEY);
  notify();
};

/**
 * The page is prerendered as the form (server snapshot `null`); the sent screen is
 * picked up on the client without a hydration mismatch.
 */
export const usePendingReset = (): string | null =>
  useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(STORAGE_KEY),
    () => null,
  );
