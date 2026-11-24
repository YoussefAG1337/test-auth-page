import { t, type Dictionary } from "intlayer";

const commonContent = {
  key: "common",
  content: {
    tabLogin: t({ en: "Sign in", fr: "Connexion" }),
    tabSignup: t({ en: "Sign up", fr: "Inscription" }),

    emailLabel: t({ en: "Email address", fr: "Adresse courriel" }),
    passwordLabel: t({ en: "Password", fr: "Mot de passe" }),

    showPassword: t({ en: "Show password", fr: "Afficher le mot de passe" }),
    hidePassword: t({ en: "Hide password", fr: "Masquer le mot de passe" }),

    termsOfUse: t({ en: "Terms of use", fr: "Conditions d’utilisation" }),
    privacyPolicy: t({ en: "Privacy policy", fr: "Politique de confidentialité" }),

    dashboardHeading: t({ en: "You are signed in", fr: "Vous êtes connecté" }),
    dashboardBody: t({
      en: "This page is only reachable with a valid session.",
      fr: "Cette page n’est accessible qu’avec une session valide.",
    }),
    signOut: t({ en: "Sign out", fr: "Se déconnecter" }),

    backToSignIn: t({ en: "Back to sign in", fr: "Retour à la connexion" }),

    validationRequired: t({
      en: "This field is required.",
      fr: "Ce champ est requis.",
    }),
    validationEmailInvalid: t({
      en: "Enter a valid email address.",
      fr: "Saisissez une adresse courriel valide.",
    }),
    validationPasswordTooShort: t({
      en: "Password must be at least 8 characters.",
      fr: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    validationPasswordsDoNotMatch: t({
      en: "Passwords do not match.",
      fr: "Les mots de passe ne correspondent pas.",
    }),
  },
} satisfies Dictionary;

export default commonContent;
