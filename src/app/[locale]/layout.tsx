import { IntlayerProvider } from "next-intlayer/server";
import { Providers } from "@/shared/api/providers";
import type { NextLayoutIntlayer } from "next-intlayer";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <IntlayerProvider locale={locale}>
      <Providers>{children}</Providers>
    </IntlayerProvider>
  );
};

export default LocaleLayout;
