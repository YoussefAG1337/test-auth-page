"use client";

import type { ReactNode } from "react";
import { useCountdown } from "@/shared/lib/use-countdown";

type ResendTimerProps = {
  /** When the cooldown ends (ms timestamp); 0 or past means resending is allowed. */
  endsAt: number;
  onResend: () => void;
  label: ReactNode;
};

// Node 496:1053, and "Renvoyer le lien" on 498:60: the label dims to 50% and the
// remaining seconds sit beside it in white/80 while the cooldown runs; once it ends
// the label is a normal link again.
export function ResendTimer({ endsAt, onResend, label }: ResendTimerProps) {
  const secondsLeft = useCountdown(endsAt);
  const coolingDown = secondsLeft > 0;

  return (
    <div className="flex items-center gap-s text-sx">
      <button
        type="button"
        onClick={onResend}
        disabled={coolingDown}
        className="cursor-pointer font-medium leading-5 text-primary-200 transition-colors hover:text-white disabled:cursor-default disabled:opacity-50 disabled:hover:text-primary-200"
      >
        {label}
      </button>
      {coolingDown && <span className="font-light text-white/80 tabular-nums">({secondsLeft}s)</span>}
    </div>
  );
}
