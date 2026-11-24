"use client";

import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { RecoveryCodeForm } from "@/features/auth-recovery-code";
import { VerificationScreen } from "@/features/auth-verify-2fa";
import { forgetPendingTwoFactor, type PendingTwoFactor } from "../model/pending-two-factor";

type TwoFactorStepProps = {
  pending: PendingTwoFactor;
  /** Back to the sign-in form; `sessionExpired` when the server's challenge timed out. */
  onLeave: (sessionExpired?: boolean) => void;
};

// The two features are siblings and can't import each other, so switching between
// code entry and the recovery code is owned here.
export function TwoFactorStep({ pending, onLeave }: TwoFactorStepProps) {
  const common = useIntlayer("common");
  const [view, setView] = useState<"code" | "recovery">("code");
  const onSessionExpired = () => onLeave(true);

  return (
    <>
      {view === "code" ? (
        <VerificationScreen
          email={pending.email}
          methods={pending.methods}
          onUseRecoveryCode={() => setView("recovery")}
          onSessionExpired={onSessionExpired}
          onVerified={forgetPendingTwoFactor}
        />
      ) : (
        <RecoveryCodeForm
          onUseVerificationCode={() => setView("code")}
          onSessionExpired={onSessionExpired}
          onVerified={forgetPendingTwoFactor}
        />
      )}
      {/* Not in the Figma frame, but without it a user who signed in to the wrong
          account has no way out of the challenge short of waiting for it to expire. */}
      <button
        type="button"
        onClick={() => onLeave()}
        className="cursor-pointer text-sx font-medium text-primary-200 transition-colors hover:text-white"
      >
        {common.backToSignIn}
      </button>
    </>
  );
}
