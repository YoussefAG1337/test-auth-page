import { useSyncExternalStore } from "react";

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 250);
  return () => clearInterval(id);
};

const nowInSeconds = () => Math.floor(Date.now() / 1000);

export function useCountdown(endsAt: number): number {
  const now = useSyncExternalStore(subscribe, nowInSeconds, () => Number.POSITIVE_INFINITY);
  // Both sides in whole seconds, or it reads one high.
  return Math.max(0, Math.floor(endsAt / 1000) - now);
}
