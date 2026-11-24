"use client";

import { useMutation } from "@tanstack/react-query";
import { getLocalizedPath } from "intlayer";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { authClient } from "@/lib/auth-client";
import { AuthError, authErrorKey } from "@/shared/lib/auth-error";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { Button } from "@/shared/ui/button";
import { FormError } from "@/shared/ui/form-error";

export function SignOutButton() {
  const common = useIntlayer("common");
  const { locale } = useLocale();
  const router = useRouter();
  const authErrorMessage = useAuthErrorMessage();

  const signOut = useMutation<void, AuthError>({
    mutationFn: async () => {
      const result = await authClient.signOut().catch((cause: unknown) => ({ error: cause }));
      if (result.error) throw new AuthError(authErrorKey(result.error));
    },
    onSuccess: () => {
      router.replace(getLocalizedPath("/login", locale));
      router.refresh();
    },
  });

  return (
    <>
      <FormError message={authErrorMessage(signOut.error?.key)} />
      <Button
      type="button"
      variant="primary"
      alignment="center"
      textSize="base"
      isLoading={signOut.isPending}
      onClick={() => signOut.mutate()}
      className="w-full rounded-s px-l py-m font-semibold text-white/90"
    >
        {common.signOut}
      </Button>
    </>
  );
}
