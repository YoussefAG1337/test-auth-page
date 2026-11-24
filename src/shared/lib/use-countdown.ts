import { useSyncExternalStore } from "react";

// A one-second clock as an external store: the remaining time is derived during render
// from a stored end timestamp, so it is right on the first frame after a reload rather
// than restarting from a fixed duration.
// Polled faster than once a second so the display is never a full second stale;
// React only re-renders when the whole-second snapshot actually changes.
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 250);
  return () => clearInterval(id);
};

// Whole seconds, so repeated reads within one render return the same snapshot.
const nowInSeconds = () => Math.floor(Date.now() / 1000);

/** Seconds left until `endsAt` (ms timestamp), never below 0. */
export function useCountdown(endsAt: number): number {
  // No clock on the server: report the countdown as finished rather than inventing one.
  const now = useSyncExternalStore(subscribe, nowInSeconds, () => Number.POSITIVE_INFINITY);
  // Both sides in whole seconds: mixing a ms end with a floored clock reads one high.
  return Math.max(0, Math.floor(endsAt / 1000) - now);
}
