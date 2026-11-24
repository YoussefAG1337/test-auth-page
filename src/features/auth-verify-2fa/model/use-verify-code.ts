"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, type AuthErrorKey, authErrorKey } from "@/shared/lib/auth-error";

/** "otp" is the emailed code, "totp" the authenticator-app code. */
export type CodeChannel = "otp" | "totp";

export type VerifyCodeInput = {
  code: string;
  /** Tried in order: the same six boxes accept either code for app + email accounts. */
  channels: CodeChannel[];
};

const verifyWith = (channel: CodeChannel, code: string) =>
  channel === "otp"
    ? authClient.twoFactor.verifyOtp({ code })
    : authClient.twoFactor.verifyTotp({ code });

// Errors that would be the same whichever channel is tried next.
const isFinal = (key: AuthErrorKey) => key === "twoFactorExpired" || key === "tooManyRequests";

export function useVerifyCode() {
  return useMutation<void, AuthError, VerifyCodeInput>({
    mutationFn: async ({ code, channels }) => {
      let firstError: AuthErrorKey | undefined;

      for (const channel of channels) {
        const { error } = await verifyWith(channel, code);
        if (!error) return;

        const key = authErrorKey(error);
        if (isFinal(key)) throw new AuthError(key);
        // The first channel is the one the user most likely meant, so its error
        // (e.g. "email code expired") is the useful one to show.
        firstError ??= key;
      }

      throw new AuthError(firstError ?? "generic");
    },
  });
}
