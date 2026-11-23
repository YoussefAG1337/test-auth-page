"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey } from "@/shared/lib/auth-error";
import type { SignupInput } from "./schema";

// The design has no name field, but Better-Auth requires one, so it comes from the
// address the account is created with.
const nameFromEmail = (email: string) => {
  const localPart = email.split("@")[0]?.trim();
  return localPart && localPart.length > 0 ? localPart : "Stolos";
};

export function useSignup() {
  return useMutation<void, AuthError, SignupInput>({
    mutationFn: async ({ email, password }) => {
      const { error } = await authClient.signUp.email({
        name: nameFromEmail(email),
        email,
        password,
      });

      if (error) throw new AuthError(authErrorKey(error));
    },
  });
}
