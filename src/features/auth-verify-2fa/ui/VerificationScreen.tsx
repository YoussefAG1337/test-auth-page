"use client";

import { useIntlayer } from "next-intlayer";
import { useRef, useState } from "react";
import { OtpInput, type OtpInputHandle } from "./OtpInput";

const linkClassName =
  "cursor-pointer text-sx font-medium leading-5 text-primary-200 transition-colors hover:text-white";

type VerificationScreenProps = {
  methods: string[];
  onUseRecoveryCode: () => void;
};

export function VerificationScreen({ methods, onUseRecoveryCode }: VerificationScreenProps) {
  const content = useIntlayer("verify-2fa");
  const [code, setCode] = useState("");
  const otpRef = useRef<OtpInputHandle>(null);

  const hasApp = methods.includes("totp");
  const hasEmail = methods.includes("otp");
  const help = hasApp && hasEmail ? content.helpAppAndEmail : hasEmail ? content.helpEmail : content.helpApp;

  return (
    <div className="flex w-full flex-col items-center gap-3xl">
      <h1 className="text-center text-lm font-semibold leading-[34px] text-white">{content.heading}</h1>

      <div className="flex flex-col items-center gap-sm">
        <OtpInput
          ref={otpRef}
          value={code}
          onChange={setCode}
          onComplete={() => {}}
          groupLabel={content.codeLabel.value}
          digitLabel={content.digitLabel.value}
        />

        <div className="flex flex-col items-center gap-xs">
          {hasApp && hasEmail && (
            <button type="button" className={linkClassName}>
              {content.sendEmailCode}
            </button>
          )}
          {!hasApp && hasEmail && (
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
