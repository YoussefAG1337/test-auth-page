"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey } from "@/shared/lib/auth-error";
import type { RecoveryCodeInput } from "./schema";

export function useVerifyBackupCode() {
  return useMutation<void, AuthError, RecoveryCodeInput>({
    mutationFn: async ({ code }) => {
      const { error } = await authClient.twoFactor.verifyBackupCode({ code });
      if (error) throw new AuthError(authErrorKey(error));
    },
  });
}
