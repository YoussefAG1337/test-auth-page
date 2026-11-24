"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalizedPath } from "intlayer";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { Button } from "@/shared/ui/button";
import { FormError } from "@/shared/ui/form-error";
import { TextInput } from "@/shared/ui/text-input";
import { buildRecoveryCodeSchema, type RecoveryCodeInput } from "../model/schema";
import { useVerifyBackupCode } from "../model/use-verify-backup-code";

type RecoveryCodeFormProps = {
  onUseVerificationCode: () => void;
  onSessionExpired: () => void;
  onVerified: () => void;
};

export function RecoveryCodeForm({
  onUseVerificationCode,
  onSessionExpired,
  onVerified,
}: RecoveryCodeFormProps) {
  const common = useIntlayer("common");
  const content = useIntlayer("recovery-code");
  const { locale } = useLocale();
  const router = useRouter();
  const verify = useVerifyBackupCode();
  const authErrorMessage = useAuthErrorMessage();

  const schema = useMemo(
    () => buildRecoveryCodeSchema({ required: common.validationRequired.value }),
    [common],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RecoveryCodeInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((values) => {
    verify.mutate(values, {
      onSuccess: () => {
        onVerified();
        router.push(getLocalizedPath("/dashboard", locale));
      },
      onError: (error) => {
        if (error.key === "twoFactorExpired") onSessionExpired();
        else if (error.key === "invalidRecoveryCode") {
          setError("code", { message: authErrorMessage(error.key) });
        }
      },
    });
  });

  const bannerKey =
    verify.error && verify.error.key !== "invalidRecoveryCode" ? verify.error.key : undefined;

  return (
    <div className="flex w-full flex-col items-center gap-3xl">
      <h1 className="text-center text-lm font-semibold leading-[34px] text-white">{content.heading}</h1>

      <form onSubmit={onSubmit} method="post" noValidate className="flex w-full flex-col gap-2xl">
        <TextInput
          autoComplete="one-time-code"
          autoCapitalize="none"
          spellCheck={false}
          label={content.codeLabel}
          errorMessage={errors.code?.message}
          {...register("code")}
        />

        <FormError message={authErrorMessage(bannerKey)} />

        <Button
          type="submit"
          variant="primary"
          alignment="center"
          textSize="base"
          isLoading={verify.isPending}
          disabled={verify.isSuccess}
          className="w-full rounded-s px-l py-m font-semibold text-white/90"
        >
          {content.submit}
        </Button>
      </form>

      <button
        type="button"
        onClick={onUseVerificationCode}
        className="cursor-pointer text-sx font-medium leading-5 text-primary-200 transition-colors hover:text-white"
      >
        {content.useVerificationCode}
      </button>

      <p className="text-center text-s font-light text-white/80">{content.help}</p>
    </div>
  );
}
