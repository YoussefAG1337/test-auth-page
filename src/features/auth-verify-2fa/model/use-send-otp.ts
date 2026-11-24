"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey, readRetryAfter } from "@/shared/lib/auth-error";

export function useSendOtp() {
  return useMutation<void, AuthError, void>({
    mutationFn: async () => {
      let retryAfter: number | undefined;
      const { error } = await authClient.twoFactor.sendOtp({
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
