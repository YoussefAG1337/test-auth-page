"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, type AuthErrorKey, authErrorKey } from "@/shared/lib/auth-error";

/** "otp" is the emailed code, "totp" the authenticator-app code. */
export type CodeChannel = "otp" | "totp";

export type VerifyCodeInput = {
  code: string;
  channels: CodeChannel[];
};

const verifyWith = (channel: CodeChannel, code: string) =>
  channel === "otp"
    ? authClient.twoFactor.verifyOtp({ code })
    : authClient.twoFactor.verifyTotp({ code });

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
        firstError ??= key;
      }

      throw new AuthError(firstError ?? "generic");
    },
  });
}
