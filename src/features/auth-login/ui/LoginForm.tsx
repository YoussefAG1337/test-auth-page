"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalizedPath } from "intlayer";
import Link from "next/link";
import { useIntlayer, useLocale } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
import { TextInput } from "@/shared/ui/text-input";
import { buildLoginSchema, type LoginInput } from "../model/schema";

export function LoginForm() {
  const common = useIntlayer("common");
  const content = useIntlayer("login");
  const { locale } = useLocale();

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
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(() => {
    // Wired to Better-Auth in a follow-up commit.
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-2xl">
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
