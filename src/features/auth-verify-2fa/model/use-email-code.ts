"use client";

import { useEffect, useRef } from "react";
import {
  clearCooldown,
  getCooldownEnd,
  startCooldown,
  useCooldownEnd,
} from "@/shared/lib/resend-cooldown";
import { useSendOtp } from "./use-send-otp";

const PURPOSE = "two-factor-otp";

type UseEmailCodeOptions = {
  email: string;
  /** Email-only accounts get their code sent as soon as the screen appears. */
  autoSend: boolean;
  onSessionExpired: () => void;
};

export function useEmailCode({ email, autoSend, onSessionExpired }: UseEmailCodeOptions) {
  const sendOtp = useSendOtp();
  const cooldownEnd = useCooldownEnd(PURPOSE, email);

  const send = () => {
    // Written before the request so a second trigger (double click, StrictMode's
    // double effect, a reload mid-request) sees the cooldown and doesn't send again.
    startCooldown(PURPOSE, email);

    sendOtp.mutate(undefined, {
      onError: (error) => {
        if (error.key === "twoFactorExpired") {
          onSessionExpired();
        } else if (error.key === "tooManyRequests") {
          // The server is the authority: resync to its remaining wait.
          if (error.retryAfter) startCooldown(PURPOSE, email, error.retryAfter);
        } else {
          clearCooldown(PURPOSE, email);
        }
      },
    });
  };

  const autoSendTried = useRef(false);
  useEffect(() => {
    if (!autoSend || autoSendTried.current) return;
    autoSendTried.current = true;
    // "On arrival" only: a reload or a return from the recovery screen within the
    // cooldown shows the timer rather than invalidating the code already sent.
    if (getCooldownEnd(PURPOSE, email) > Date.now()) return;
    send();
  });

  return {
    send,
    cooldownEnd,
    // Any stored cooldown means a code was emailed from this browser at some point, so
    // the emailed code is worth trying first — even after a reload past the 30s window.
    emailSent: cooldownEnd > 0,
    // 429 is reflected by the timer, not as an error message.
    sendError: sendOtp.error?.key === "tooManyRequests" ? undefined : sendOtp.error?.key,
  };
}
