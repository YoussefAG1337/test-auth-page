"use client";

import { getLocalizedPath } from "intlayer";
import Link from "next/link";
import { useIntlayer, useLocale } from "next-intlayer";

type BackToSignInLinkProps = {
  onClick?: () => void;
};

export function BackToSignInLink({ onClick }: BackToSignInLinkProps) {
  const common = useIntlayer("common");
  const { locale } = useLocale();

  return (
    <Link
      href={getLocalizedPath("/login", locale)}
      onClick={onClick}
      className="text-sx font-medium leading-5 text-primary-200 transition-colors hover:text-white"
    >
      {common.backToSignIn}
    </Link>
  );
}
