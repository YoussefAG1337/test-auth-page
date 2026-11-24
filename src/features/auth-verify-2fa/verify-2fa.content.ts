import { t, type Dictionary } from "intlayer";

const verifyTwoFactorContent = {
  key: "verify-2fa",
  content: {
    heading: t({ en: "Confirm your identity", fr: "Confirmez votre identité" }),
    codeLabel: t({ en: "Verification code", fr: "Code de vérification" }),
    digitLabel: t({ en: "Digit", fr: "Chiffre" }),

    sendEmailCode: t({ en: "Send a code by email", fr: "Envoyer un code par courriel" }),
    resendCode: t({ en: "Resend a code", fr: "Renvoyer un code" }),
    useRecoveryCode: t({ en: "Use a recovery code", fr: "Utiliser un code de récupération" }),

    helpApp: t({
      en: "Enter the six-digit code shown in your authenticator app.",
      fr: "Saisissez le code à six chiffres affiché dans votre application d’authentification.",
    }),
    helpAppAndEmail: t({
      en: "Enter the six-digit code sent to your account’s email address, or the code shown in your authenticator app.",
      fr: "Saisissez le code à six chiffres envoyé à l’adresse courriel de votre compte, ou le code affiché dans votre application d’authentification.",
    }),
    helpEmail: t({
      en: "Enter the six-digit code sent to your account’s email address. If it expires, request a new code.",
      fr: "Saisissez le code à six chiffres envoyé à l’adresse courriel de votre compte. S’il expire, demandez un nouveau code.",
    }),
  },
} satisfies Dictionary;

export default verifyTwoFactorContent;
