"use client";

import { useIntlayer } from "next-intlayer";
import { BackToSignInLink } from "@/shared/ui/back-to-sign-in-link";
import { GlassCard } from "@/shared/ui/glass-card";

// not-found receives no params, so the locale comes from the provider, as in the
// rest of the client UI.
export default function NotFound() {
  const common = useIntlayer("common");

  return (
    <GlassCard className="gap-3xl">
      <header className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{common.notFoundHeading}</h1>
        <p className="text-s font-light text-white/80">{common.notFoundBody}</p>
      </header>
      <BackToSignInLink />
    </GlassCard>
  );
}
