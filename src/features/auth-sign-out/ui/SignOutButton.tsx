"use client";

import { useMutation } from "@tanstack/react-query";
import { getLocalizedPath } from "intlayer";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/ui/button";

export function SignOutButton() {
  const common = useIntlayer("common");
  const { locale } = useLocale();
  const router = useRouter();

  const signOut = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      router.replace(getLocalizedPath("/login", locale));
      router.refresh();
    },
  });

  return (
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
  );
}
