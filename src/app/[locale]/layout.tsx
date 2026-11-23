import { getHTMLTextDir } from "intlayer";
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

export const metadata: Metadata = {
  title: "Stolos",
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

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
