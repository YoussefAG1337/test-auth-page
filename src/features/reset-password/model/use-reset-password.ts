"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey } from "@/shared/lib/auth-error";

export function useResetPassword() {
  return useMutation<void, AuthError, { newPassword: string; token: string }>({
    mutationFn: async ({ newPassword, token }) => {
      const { error } = await authClient.resetPassword({ newPassword, token });
      if (error) throw new AuthError(authErrorKey(error));
    },
  });
}
