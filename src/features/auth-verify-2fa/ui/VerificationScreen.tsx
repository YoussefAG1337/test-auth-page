"use client";

import { getLocalizedPath } from "intlayer";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useRef, useState } from "react";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { FormError } from "@/shared/ui/form-error";
import { useEmailCode } from "../model/use-email-code";
import { type CodeChannel, useVerifyCode } from "../model/use-verify-code";
import { OtpInput, type OtpInputHandle } from "./OtpInput";

const linkClassName =
  "cursor-pointer text-sx font-medium leading-5 text-primary-200 transition-colors hover:text-white";

type VerificationScreenProps = {
  email: string;
  methods: string[];
  onUseRecoveryCode: () => void;
  onSessionExpired: () => void;
  onVerified: () => void;
};

export function VerificationScreen({
  email,
  methods,
  onUseRecoveryCode,
  onSessionExpired,
  onVerified,
}: VerificationScreenProps) {
  const content = useIntlayer("verify-2fa");
  const { locale } = useLocale();
  const router = useRouter();
  const authErrorMessage = useAuthErrorMessage();
  const [code, setCode] = useState("");
  const otpRef = useRef<OtpInputHandle>(null);

  const hasApp = methods.includes("totp");
  const hasEmail = methods.includes("otp");
  const emailCode = useEmailCode({ email, autoSend: hasEmail && !hasApp, onSessionExpired });
  const verify = useVerifyCode();

  // Without an emailed code there is nothing for verifyOtp to match, so it isn't tried.
  const channels: CodeChannel[] = !hasEmail
    ? ["totp"]
    : !hasApp
      ? ["otp"]
      : emailCode.emailSent
        ? ["otp", "totp"]
        : ["totp"];

  const handleComplete = (completed: string) => {
    verify.mutate(
      { code: completed, channels },
      {
        onSuccess: () => {
          onVerified();
          router.push(getLocalizedPath("/dashboard", locale));
        },
        onError: (error) => {
          if (error.key === "twoFactorExpired") {
            onSessionExpired();
            return;
          }
          setCode("");
          // The boxes are disabled while verifying; focus once they're enabled again.
          requestAnimationFrame(() => otpRef.current?.focusFirst());
        },
      },
    );
  };

  const help = hasApp && hasEmail ? content.helpAppAndEmail : hasEmail ? content.helpEmail : content.helpApp;
  const showResend = hasEmail && (!hasApp || emailCode.emailSent);

  return (
    <div className="flex w-full flex-col items-center gap-3xl">
      <h1 className="text-center text-lm font-semibold leading-[34px] text-white">{content.heading}</h1>

      <div className="flex w-full flex-col items-center gap-sm">
        <OtpInput
          ref={otpRef}
          value={code}
          onChange={(next) => {
            setCode(next);
            if (verify.isError) verify.reset();
          }}
          onComplete={handleComplete}
          groupLabel={content.codeLabel.value}
          digitLabel={content.digitLabel.value}
          disabled={verify.isPending || verify.isSuccess}
          invalid={verify.isError}
        />

        <FormError
          className="text-center"
          message={authErrorMessage(verify.error?.key ?? emailCode.sendError)}
        />

        <div className="flex flex-col items-center gap-xs">
          {hasEmail && !showResend && (
            <button type="button" onClick={emailCode.send} className={linkClassName}>
              {content.sendEmailCode}
            </button>
          )}
          {showResend && (
            <p className="flex items-center gap-s text-sx">
              <span className="font-medium leading-5 text-primary-200 opacity-50">{content.resendCode}</span>
              <span className="font-light text-white/80">(30s)</span>
            </p>
          )}
          <button type="button" onClick={onUseRecoveryCode} className={linkClassName}>
            {content.useRecoveryCode}
          </button>
        </div>
      </div>

      <p className="text-center text-s font-light text-white/80">{help}</p>
    </div>
  );
}
