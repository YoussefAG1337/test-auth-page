export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|code|email|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
