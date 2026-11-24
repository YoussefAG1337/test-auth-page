"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/shared/ui/button";

type ResetPasswordOutcomeProps = {
  heading: ReactNode;
  body: ReactNode;
  actionLabel: ReactNode;
  actionHref: string;
  children?: ReactNode;
};

export function ResetPasswordOutcome({
  heading,
  body,
  actionLabel,
  actionHref,
  children,
}: ResetPasswordOutcomeProps) {
  return (
    <>
      <header className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{heading}</h1>
        <p className="text-s font-light text-white/80">{body}</p>
      </header>

      <Button
        asChild
        variant="primary"
        alignment="center"
        textSize="base"
        className="w-full rounded-s px-l py-m font-semibold text-white/90"
      >
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>

      {children}
    </>
  );
}
