"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey } from "@/shared/lib/auth-error";
import type { SignupInput } from "./schema";

// Better-Auth requires a name, and the design has no field for it.
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
