"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey, readTwoFactorMethods } from "@/shared/lib/auth-error";
import type { LoginInput } from "./schema";

export type LoginResult = { outcome: "signed-in" } | { outcome: "two-factor"; methods: string[] };

export function useLogin() {
  return useMutation<LoginResult, AuthError, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await authClient.signIn.email({ email, password });

      if (error) throw new AuthError(authErrorKey(error));

      const methods = readTwoFactorMethods(data);
      return methods ? { outcome: "two-factor", methods } : { outcome: "signed-in" };
    },
  });
}
