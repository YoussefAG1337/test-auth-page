"use client";

import { useMutation } from "@tanstack/react-query";
import { getLocalizedPath } from "intlayer";
import { useLocale } from "next-intlayer";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey, readRetryAfter } from "@/shared/lib/auth-error";
import type { CooldownPurpose } from "@/shared/lib/resend-cooldown";
import type { ForgotPasswordInput } from "./schema";

export const RESET_LINK_COOLDOWN: CooldownPurpose = "password-reset";

export function useRequestPasswordReset() {
  const { locale } = useLocale();

  return useMutation<void, AuthError, ForgotPasswordInput>({
    mutationFn: async ({ email }) => {
      let retryAfter: number | undefined;
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: getLocalizedPath("/reset-password", locale),
        fetchOptions: {
          onError: ({ response }) => {
            retryAfter = readRetryAfter(response);
          },
        },
      });

      if (error) throw new AuthError(authErrorKey(error), retryAfter);
    },
  });
}
