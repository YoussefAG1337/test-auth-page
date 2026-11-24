"use client";

import type { ReactNode } from "react";
import { useCountdown } from "@/shared/lib/use-countdown";

type ResendTimerProps = {
  endsAt: number;
  onResend: () => void;
  label: ReactNode;
};

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
