"use client";

import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { RecoveryCodeForm } from "@/features/auth-recovery-code";
import { VerificationScreen } from "@/features/auth-verify-2fa";
import { forgetPendingTwoFactor, type PendingTwoFactor } from "../model/pending-two-factor";

type TwoFactorStepProps = {
  pending: PendingTwoFactor;
  onLeave: (sessionExpired?: boolean) => void;
};

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
