export { intlayerProxy as proxy } from "next-intlayer/proxy";

// An allowlist: a negative-lookahead matcher also rewrote "/" and 404'd it.
export const config = {
  matcher: [
    "/login",
    "/en/login",
    "/fr/login",
    "/forgot-password",
    "/en/forgot-password",
    "/fr/forgot-password",
    "/reset-password",
    "/en/reset-password",
    "/fr/reset-password",
    "/dashboard",
    "/en/dashboard",
    "/fr/dashboard",
  ],
};
