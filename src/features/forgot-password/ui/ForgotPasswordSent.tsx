"use client";

import { useIntlayer } from "next-intlayer";
import { clearCooldown, startCooldown, useCooldownEnd } from "@/shared/lib/resend-cooldown";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { BackToSignInLink } from "@/shared/ui/back-to-sign-in-link";
import { FormError } from "@/shared/ui/form-error";
import { ResendTimer } from "@/shared/ui/resend-timer";
import { clearPendingReset } from "../model/pending-reset";
import { RESET_LINK_COOLDOWN, useRequestPasswordReset } from "../model/use-request-password-reset";

export function ForgotPasswordSent({ email }: { email: string }) {
  const content = useIntlayer("forgot-password");
  const request = useRequestPasswordReset();
  const authErrorMessage = useAuthErrorMessage();
  const cooldownEnd = useCooldownEnd(RESET_LINK_COOLDOWN, email);

  const resend = () => {
    // Set before the request so a double click doesn't send twice.
    startCooldown(RESET_LINK_COOLDOWN, email);

    request.mutate(
      { email },
      {
        onError: (error) => {
          if (error.key !== "tooManyRequests") clearCooldown(RESET_LINK_COOLDOWN, email);
          else if (error.retryAfter) startCooldown(RESET_LINK_COOLDOWN, email, error.retryAfter);
        },
      },
    );
  };

  const bannerKey = request.error?.key === "tooManyRequests" ? undefined : request.error?.key;

  return (
    <>
      <header className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{content.sentHeading}</h1>
        <p className="text-s font-light text-white/80">{content.sentBody}</p>
      </header>

      <FormError className="text-center" message={authErrorMessage(bannerKey)} />

      <div className="flex flex-col items-center gap-m">
        <ResendTimer endsAt={cooldownEnd} onResend={resend} label={content.resendLink} />
        <BackToSignInLink onClick={clearPendingReset} />
      </div>
    </>
  );
}
