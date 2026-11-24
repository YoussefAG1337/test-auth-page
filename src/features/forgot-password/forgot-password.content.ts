import { t, type Dictionary } from "intlayer";

const forgotPasswordContent = {
  key: "forgot-password",
  content: {
    heading: t({ en: "Forgot your password?", fr: "Mot de passe oublié ?" }),
    subheading: t({
      en: "Enter your account’s email address. We’ll send you a link to reset your password.",
      fr: "Saisissez l’adresse courriel de votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    }),
    submit: t({ en: "Send the link", fr: "Envoyer le lien" }),

    sentHeading: t({ en: "Check your inbox", fr: "Vérifiez votre boîte courriel" }),
    sentBody: t({
      en: "If an account is linked to this address, you’ll receive a link to reset your password. Remember to check your spam folder.",
      fr: "Si un compte est associé à cette adresse, vous recevrez un lien pour réinitialiser votre mot de passe. Pensez à vérifier vos courriers indésirables.",
    }),
    resendLink: t({ en: "Resend the link", fr: "Renvoyer le lien" }),
  },
} satisfies Dictionary;

export default forgotPasswordContent;
