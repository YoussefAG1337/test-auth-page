import { useSyncExternalStore } from "react";

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

export const usePendingReset = (): string | null =>
  useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(STORAGE_KEY),
    () => null,
  );
