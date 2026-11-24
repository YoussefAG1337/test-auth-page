"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalizedPath } from "intlayer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { Button } from "@/shared/ui/button";
import { FormError } from "@/shared/ui/form-error";
import { PasswordInput } from "@/shared/ui/password-input";
import { TextInput } from "@/shared/ui/text-input";
import { buildLoginSchema, type LoginInput } from "../model/schema";
import { useLogin } from "../model/use-login";

type LoginFormProps = {
  onTwoFactorRequired: (email: string, methods: string[]) => void;
};

export function LoginForm({ onTwoFactorRequired }: LoginFormProps) {
  const common = useIntlayer("common");
  const content = useIntlayer("login");
  const { locale } = useLocale();
  const router = useRouter();
  const login = useLogin();
  const authErrorMessage = useAuthErrorMessage();

  const schema = useMemo(
    () =>
      buildLoginSchema({
        emailInvalid: common.validationEmailInvalid.value,
        required: common.validationRequired.value,
      }),
    [common],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: (result) => {
        if (result.outcome === "two-factor") {
          onTwoFactorRequired(values.email, result.methods);
          return;
        }
        router.push(getLocalizedPath("/dashboard", locale));
      },
    });
  });

  return (
    // method="post" so a submit before hydration doesn't put the password in the URL.
    <form onSubmit={onSubmit} method="post" noValidate className="flex w-full flex-col gap-2xl">
      <div className="flex w-full flex-col gap-xl">
        <div className="flex w-full flex-col gap-m">
          <TextInput
            type="email"
            autoComplete="email"
            label={common.emailLabel}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <PasswordInput
            autoComplete="current-password"
            label={common.passwordLabel}
            visibilityLabels={{
              show: common.showPassword.value,
              hide: common.hidePassword.value,
            }}
            errorMessage={errors.password?.message}
            {...register("password")}
          />
        </div>

        <Link
          href={getLocalizedPath("/forgot-password", locale)}
          className="text-sx font-medium leading-5 text-primary-200 transition-colors hover:text-white"
        >
          {content.forgotPassword}
        </Link>
      </div>

      <FormError message={authErrorMessage(login.error?.key)} />

      <Button
        type="submit"
        variant="primary"
        alignment="center"
        textSize="base"
        isLoading={login.isPending}
        className="w-full rounded-s px-l py-m font-semibold text-white/90"
      >
        {content.submit}
      </Button>
    </form>
  );
}
