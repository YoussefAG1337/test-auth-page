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
import { PasswordInput } from "@/shared/ui/password-input";
import { TextInput } from "@/shared/ui/text-input";
import { buildSignupSchema, type SignupInput } from "../model/schema";
import { useSignup } from "../model/use-signup";

export function SignupForm() {
  const common = useIntlayer("common");
  const content = useIntlayer("signup");
  const { locale } = useLocale();
  const router = useRouter();
  const signup = useSignup();
  const authErrorMessage = useAuthErrorMessage();

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
    formState: { errors },
  } = useForm<SignupInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((values) => {
    signup.mutate(values, {
      onSuccess: () => router.push(getLocalizedPath("/dashboard", locale)),
    });
  });

  const visibilityLabels = {
    show: common.showPassword.value,
    hide: common.hidePassword.value,
  };

  const serverError = signup.error?.key;
  const serverEmailError = serverError === "emailAlreadyUsed" ? authErrorMessage(serverError) : undefined;
  const serverPasswordError =
    serverError === "passwordTooShort" ? authErrorMessage(serverError) : undefined;
  const bannerError =
    serverError && serverError !== "emailAlreadyUsed" && serverError !== "passwordTooShort"
      ? authErrorMessage(serverError)
      : undefined;

  return (
    // method="post" so a submit before hydration doesn't put the password in the URL.
    <form onSubmit={onSubmit} method="post" noValidate className="flex w-full flex-col gap-2xl">
      <div className="flex w-full flex-col gap-m">
        <TextInput
          type="email"
          autoComplete="email"
          label={common.emailLabel}
          errorMessage={errors.email?.message ?? serverEmailError}
          {...register("email")}
        />
        <PasswordInput
          autoComplete="new-password"
          label={common.passwordLabel}
          visibilityLabels={visibilityLabels}
          errorMessage={errors.password?.message ?? serverPasswordError}
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

      <FormError message={bannerError} />

      <Button
        type="submit"
        variant="primary"
        alignment="center"
        textSize="base"
        isLoading={signup.isPending}
        className="w-full rounded-s px-l py-m font-semibold text-white/90"
      >
        {content.submit}
      </Button>
    </form>
  );
}
