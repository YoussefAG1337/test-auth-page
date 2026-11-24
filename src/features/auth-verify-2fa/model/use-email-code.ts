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
  autoSend: boolean;
  onSessionExpired: () => void;
};

export function useEmailCode({ email, autoSend, onSessionExpired }: UseEmailCodeOptions) {
  const sendOtp = useSendOtp();
  const cooldownEnd = useCooldownEnd(PURPOSE, email);

  const send = () => {
    // Set before the request so a double trigger doesn't send twice.
    startCooldown(PURPOSE, email);

    sendOtp.mutate(undefined, {
      onError: (error) => {
        if (error.key === "twoFactorExpired") {
          onSessionExpired();
        } else if (error.key === "tooManyRequests") {
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
    if (getCooldownEnd(PURPOSE, email) > Date.now()) return;
    send();
  });

  return {
    send,
    cooldownEnd,
    emailSent: cooldownEnd > 0,
    sendError: sendOtp.error?.key === "tooManyRequests" ? undefined : sendOtp.error?.key,
  };
}
