"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
import { TextInput } from "@/shared/ui/text-input";
import { buildSignupSchema, type SignupInput } from "../model/schema";

export function SignupForm() {
  const common = useIntlayer("common");
  const content = useIntlayer("signup");

  const schema = useMemo(
    () =>
      buildSignupSchema({
        emailInvalid: common.validationEmailInvalid.value,
        required: common.validationRequired.value,
        passwordTooShort: common.validationPasswordTooShort.value,
        passwordsDoNotMatch: common.validationPasswordsDoNotMatch.value,
      }),
    [common],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(() => {
    // Wired to Better-Auth in a follow-up commit.
  });

  const visibilityLabels = {
    show: common.showPassword.value,
    hide: common.hidePassword.value,
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-2xl">
      <div className="flex w-full flex-col gap-m">
        <TextInput
          type="email"
          autoComplete="email"
          label={common.emailLabel}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          autoComplete="new-password"
          label={common.passwordLabel}
          visibilityLabels={visibilityLabels}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          autoComplete="new-password"
          label={content.confirmPasswordLabel}
          visibilityLabels={visibilityLabels}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        alignment="center"
        textSize="base"
        isLoading={isSubmitting}
        className="w-full rounded-s px-l py-m font-semibold text-white/90"
      >
        {content.submit}
      </Button>
    </form>
  );
}
