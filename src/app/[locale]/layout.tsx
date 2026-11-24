import { defaultLocale, getHTMLTextDir, getIntlayer, isDeclaredLocale } from "intlayer";
import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Providers } from "@/shared/api/providers";
import { bodyClassName, htmlClassName } from "@/shared/ui/fonts";
import "../globals.css";

// Root layout for every localized route. It owns <html> so that `lang` can follow
// the active locale, which a shared app-level root layout could only do by reading
// request headers — and that would make the whole app dynamic.
export { generateStaticParams } from "next-intlayer";

// Each page sets its own localized title; the template appends the product name.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { metaDescription } = getIntlayer("common", locale);

  return {
    title: { template: "%s · Stolos", default: "Stolos" },
    description: metaDescription,
  };
}

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale: requested } = await params;
  // An unknown first segment (/nope) still renders this layout on its way to the
  // 404. Unprefixed URLs are the default locale, so that is what it falls back to.
  const locale = isDeclaredLocale(requested) ? requested : defaultLocale;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} className={htmlClassName}>
      <body className={bodyClassName}>
        <IntlayerProvider locale={locale}>
          <Providers>{children}</Providers>
        </IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
