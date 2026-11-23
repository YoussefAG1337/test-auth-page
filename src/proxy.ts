export { intlayerProxy as proxy } from "next-intlayer/proxy";

// Explicit allowlist of locale-aware routes, rather than a negative-lookahead
// matcher — this project mixes locale routes (login, forgot-password,
// reset-password, dashboard) with non-locale ones (/, /code, /email, /api/*),
// and a negative lookahead rewrote the bare "/" too, 404ing the homepage.
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
