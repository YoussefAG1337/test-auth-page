"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { BackToSignInLink } from "@/shared/ui/back-to-sign-in-link";
import { Button } from "@/shared/ui/button";
import { FormError } from "@/shared/ui/form-error";
import { PasswordInput } from "@/shared/ui/password-input";
import { buildResetPasswordSchema, type ResetPasswordInput } from "../model/schema";
import { useResetPassword } from "../model/use-reset-password";

type ResetPasswordFormProps = {
  token: string;
  onDone: () => void;
  /** The token expired or was used between opening the link and submitting. */
  onLinkInvalid: () => void;
};

// Node 498:357.
export function ResetPasswordForm({ token, onDone, onLinkInvalid }: ResetPasswordFormProps) {
  const common = useIntlayer("common");
  const content = useIntlayer("reset-password");
  const reset = useResetPassword();
  const authErrorMessage = useAuthErrorMessage();

  const schema = useMemo(
    () =>
      buildResetPasswordSchema({
        required: common.validationRequired.value,
        passwordTooShort: common.validationPasswordTooShort.value,
        passwordsDoNotMatch: common.validationPasswordsDoNotMatch.value,
      }),
    [common],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(({ newPassword }) => {
    reset.mutate(
      { newPassword, token },
      {
        onSuccess: onDone,
        onError: (error) => {
          if (error.key === "invalidResetLink") onLinkInvalid();
        },
      },
    );
  });

  const visibilityLabels = {
    show: common.showPassword.value,
    hide: common.hidePassword.value,
  };

  const serverError = reset.error?.key;
  const serverPasswordError =
    serverError === "passwordTooShort" ? authErrorMessage(serverError) : undefined;
  const bannerError =
    serverError && serverError !== "passwordTooShort" && serverError !== "invalidResetLink"
      ? authErrorMessage(serverError)
      : undefined;

  return (
    <>
      <header className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{content.heading}</h1>
        <p className="text-s font-light text-white/80">{content.subheading}</p>
      </header>

      {/* method="post": see LoginForm — keeps a pre-hydration submit out of the URL. */}
      <form onSubmit={onSubmit} method="post" noValidate className="flex w-full flex-col gap-2xl">
        <div className="flex w-full flex-col gap-m">
          <PasswordInput
            autoComplete="new-password"
            label={content.newPasswordLabel}
            visibilityLabels={visibilityLabels}
            errorMessage={errors.newPassword?.message ?? serverPasswordError}
            {...register("newPassword")}
          />
          <PasswordInput
            autoComplete="new-password"
            label={content.confirmPasswordLabel}
            visibilityLabels={visibilityLabels}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <FormError message={bannerError} />

        <Button
          type="submit"
          variant="primary"
          alignment="center"
          textSize="base"
          isLoading={reset.isPending}
          className="w-full rounded-s px-l py-m font-semibold text-white/90"
        >
          {content.submit}
        </Button>
      </form>

      <BackToSignInLink />
    </>
  );
}
