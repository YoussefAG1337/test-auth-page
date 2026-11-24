"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { startCooldown } from "@/shared/lib/resend-cooldown";
import { useAuthErrorMessage } from "@/shared/lib/use-auth-error-message";
import { BackToSignInLink } from "@/shared/ui/back-to-sign-in-link";
import { Button } from "@/shared/ui/button";
import { FormError } from "@/shared/ui/form-error";
import { TextInput } from "@/shared/ui/text-input";
import { savePendingReset } from "../model/pending-reset";
import { buildForgotPasswordSchema, type ForgotPasswordInput } from "../model/schema";
import { RESET_LINK_COOLDOWN, useRequestPasswordReset } from "../model/use-request-password-reset";

// Node 497:52.
export function ForgotPasswordRequest() {
  const common = useIntlayer("common");
  const content = useIntlayer("forgot-password");
  const request = useRequestPasswordReset();
  const authErrorMessage = useAuthErrorMessage();

  const schema = useMemo(
    () => buildForgotPasswordSchema({ emailInvalid: common.validationEmailInvalid.value }),
    [common],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(schema) });

  // A 429 stays a banner here rather than moving on: the server limits per caller, not
  // per email, so the recent send may have been for another address.
  const onSubmit = handleSubmit((values) => {
    request.mutate(values, {
      onSuccess: () => {
        startCooldown(RESET_LINK_COOLDOWN, values.email);
        savePendingReset(values.email);
      },
    });
  });

  return (
    <>
      <header className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{content.heading}</h1>
        <p className="text-s font-light text-white/80">{content.subheading}</p>
      </header>

      {/* method="post": see LoginForm — keeps a pre-hydration submit out of the URL. */}
      <form onSubmit={onSubmit} method="post" noValidate className="flex w-full flex-col gap-2xl">
        <TextInput
          type="email"
          autoComplete="email"
          label={common.emailLabel}
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <FormError message={authErrorMessage(request.error?.key)} />

        <Button
          type="submit"
          variant="primary"
          alignment="center"
          textSize="base"
          isLoading={request.isPending}
          className="w-full rounded-s px-l py-m font-semibold text-white/90"
        >
          {content.submit}
        </Button>
      </form>

      <BackToSignInLink />
    </>
  );
}
