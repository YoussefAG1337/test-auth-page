import { t, type Dictionary } from "intlayer";

// One entry per Better-Auth error code we surface. Unmapped codes fall back to
// `generic` so an unrecognised server error can never leak whether an account exists.
const errorsContent = {
  key: "errors",
  content: {
    invalidCredentials: t({
      en: "Incorrect email address or password.",
      fr: "Adresse courriel ou mot de passe incorrect.",
    }),
    emailAlreadyUsed: t({
      en: "An account already exists with this email address.",
      fr: "Un compte existe déjà avec cette adresse courriel.",
    }),
    passwordTooShort: t({
      en: "Password must be at least 8 characters.",
      fr: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    tooManyRequests: t({
      en: "Too many attempts. Please try again in a moment.",
      fr: "Trop de tentatives. Veuillez réessayer dans un instant.",
    }),
    invalidCode: t({
      en: "Incorrect code. Check it and try again.",
      fr: "Code incorrect. Vérifiez-le et réessayez.",
    }),
    codeExpired: t({
      en: "This code has expired. Request a new one.",
      fr: "Ce code a expiré. Demandez-en un nouveau.",
    }),
    tooManyCodeAttempts: t({
      en: "Too many attempts with this code. Request a new one.",
      fr: "Trop de tentatives avec ce code. Demandez-en un nouveau.",
    }),
    twoFactorExpired: t({
      en: "Your sign-in session has expired. Please sign in again.",
      fr: "Votre session de connexion a expiré. Veuillez vous reconnecter.",
    }),
    generic: t({
      en: "Something went wrong. Please try again.",
      fr: "Une erreur est survenue. Veuillez réessayer.",
    }),
  },
} satisfies Dictionary;

export default errorsContent;
