import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { twoFactor } from "better-auth/plugins";
import { prisma } from "./prisma";

/** Seconds a user must wait before asking for another email code or reset link. */
export const RESEND_COOLDOWN_SECONDS = 30;

const isEmailSignIn = ({ path }: { path?: string }) => path === "/sign-in/email";

type LoginMfaContext = { loginEmailMfaEnabled?: boolean };

// Better Auth offers the email code ("otp") to every account with 2FA as soon as a sender exists.
// The sign-in response must list only what the account really has, so "otp" is dropped unless
// the user has `emailTwoFactorEnabled`. The 2FA plugin deletes the pending session in its own hook,
// which is why the flag is read in a hook placed before it.
const withAccountMfaMethods = (plugin: ReturnType<typeof twoFactor>) =>
  ({
    ...plugin,
    hooks: {
      ...plugin.hooks,
      after: [
        {
          matcher: isEmailSignIn,
          handler: createAuthMiddleware(async (ctx) => {
            const user = ctx.context.newSession?.user as { emailTwoFactorEnabled?: boolean } | undefined;
            (ctx.context as typeof ctx.context & LoginMfaContext).loginEmailMfaEnabled =
              user?.emailTwoFactorEnabled === true;
          }),
        },
        ...plugin.hooks.after,
        {
          matcher: isEmailSignIn,
          handler: createAuthMiddleware(async (ctx) => {
            const result = ctx.context.returned;
            if (
              !result ||
              typeof result !== "object" ||
              !("twoFactorMethods" in result) ||
              !Array.isArray(result.twoFactorMethods)
            )
              return;
            const emailEnabled = (ctx.context as typeof ctx.context & LoginMfaContext).loginEmailMfaEnabled;
            return ctx.json({
              ...result,
              twoFactorMethods: result.twoFactorMethods.filter((method) => method !== "otp" || emailEnabled),
            });
          }),
        },
      ],
    },
  }) satisfies BetterAuthPlugin;

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // No real email is sent: the reset link is stored and shown on /code.
    sendResetPassword: async ({ user, url, token }) => {
      // Better Auth keeps earlier reset links valid until they expire; here only the latest one works.
      await prisma.verification.deleteMany({
        where: {
          value: user.id,
          identifier: { startsWith: "reset-password:", not: `reset-password:${token}` },
        },
      });
      await prisma.devMail.create({ data: { to: user.email, kind: "PASSWORD_RESET", content: url } });
    },
  },
  user: {
    additionalFields: {
      emailTwoFactorEnabled: { type: "boolean", required: false, defaultValue: false, input: false },
    },
  },
  // Rate limiting is off in development by default; it is what enforces the resend cooldown.
  rateLimit: {
    enabled: true,
    customRules: {
      "/two-factor/send-otp": { window: RESEND_COOLDOWN_SECONDS, max: 1 },
      "/request-password-reset": { window: RESEND_COOLDOWN_SECONDS, max: 1 },
    },
  },
  plugins: [
    withAccountMfaMethods(
      twoFactor({
        issuer: "Stolos",
        otpOptions: {
          // No real email is sent: the code is stored and shown on /code.
          sendOTP: async ({ user, otp }) => {
            await prisma.devMail.create({ data: { to: user.email, kind: "MFA_CODE", content: otp } });
          },
        },
      }),
    ),
  ],
});
