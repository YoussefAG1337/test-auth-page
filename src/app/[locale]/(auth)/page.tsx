import { getLocalizedPath, isDeclaredLocale } from "intlayer";
import { notFound, redirect } from "next/navigation";

// Never renders anything of its own (it redirects or 404s), so there is nothing to
// validate for instant navigation.
export const instant = false;

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

// The PDF switches language through /fr and /en, so those land on that locale's
// sign-in page. Any other single segment (/nope) is an unknown page.
export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isDeclaredLocale(locale)) notFound();
  redirect(getLocalizedPath("/login", locale));
}
