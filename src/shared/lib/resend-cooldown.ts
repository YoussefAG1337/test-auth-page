import { useSyncExternalStore } from "react";
import { RESEND_COOLDOWN_SECONDS } from "./constants";

// Mirrors the server's limit so the timer survives a reload.
export type CooldownPurpose = "two-factor-otp" | "password-reset";

const storageKey = (purpose: CooldownPurpose, email: string) =>
  `stolos:cooldown:${purpose}:${email.toLowerCase()}`;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

export const getCooldownEnd = (purpose: CooldownPurpose, email: string): number => {
  const end = Number(localStorage.getItem(storageKey(purpose, email)));
  return Number.isFinite(end) ? end : 0;
};

export const startCooldown = (
  purpose: CooldownPurpose,
  email: string,
  seconds: number = RESEND_COOLDOWN_SECONDS,
) => {
  localStorage.setItem(storageKey(purpose, email), String(Date.now() + seconds * 1000));
  notify();
};

export const clearCooldown = (purpose: CooldownPurpose, email: string) => {
  localStorage.removeItem(storageKey(purpose, email));
  notify();
};

export const useCooldownEnd = (purpose: CooldownPurpose, email: string): number =>
  useSyncExternalStore(
    subscribe,
    () => getCooldownEnd(purpose, email),
    () => 0,
  );
