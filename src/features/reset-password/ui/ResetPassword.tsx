"use client";

import { getLocalizedPath } from "intlayer";
import { useSearchParams } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useState } from "react";
import { BackToSignInLink } from "@/shared/ui/back-to-sign-in-link";
import { GlassCard } from "@/shared/ui/glass-card";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetPasswordOutcome } from "./ResetPasswordOutcome";

/**
 * The emailed link goes through Better-Auth first, which redirects here with `?token=`
 * when the token is usable and `?error=INVALID_TOKEN` when it is expired or used.
 * Reads the URL, so the page renders it inside a Suspense boundary.
 */
export function ResetPassword() {
  const content = useIntlayer("reset-password");
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [outcome, setOutcome] = useState<"done" | "invalid" | null>(null);

  if (outcome === "done") {
    return (
      <GlassCard className="gap-3xl">
        <ResetPasswordOutcome
          heading={content.doneHeading}
          body={content.doneBody}
          actionLabel={content.signIn}
          actionHref={getLocalizedPath("/login", locale)}
        />
      </GlassCard>
    );
  }

  if (outcome === "invalid" || token === null || searchParams.has("error")) {
    return (
      <GlassCard className="gap-3xl">
        <ResetPasswordOutcome
          heading={content.invalidHeading}
          body={content.invalidBody}
          actionLabel={content.requestNewLink}
          actionHref={getLocalizedPath("/forgot-password", locale)}
        >
          <BackToSignInLink />
        </ResetPasswordOutcome>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="gap-3xl">
      <ResetPasswordForm
        token={token}
        onDone={() => setOutcome("done")}
        onLinkInvalid={() => setOutcome("invalid")}
      />
    </GlassCard>
  );
}
