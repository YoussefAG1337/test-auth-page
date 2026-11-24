import { getLocalizedPath, isDeclaredLocale } from "intlayer";
import { notFound, redirect } from "next/navigation";

export const instant = false;

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isDeclaredLocale(locale)) notFound();
  redirect(getLocalizedPath("/login", locale));
}
