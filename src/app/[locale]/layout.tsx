import { defaultLocale, getHTMLTextDir, getIntlayer, isDeclaredLocale } from "intlayer";
import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Providers } from "@/shared/api/providers";
import { bodyClassName, htmlClassName } from "@/shared/ui/fonts";
import "../globals.css";

export { generateStaticParams } from "next-intlayer";

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
