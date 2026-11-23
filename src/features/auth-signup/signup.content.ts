import { t, type Dictionary } from "intlayer";

const signupContent = {
  key: "signup",
  content: {
    heading: t({
      en: "Welcome to Stolos!",
      fr: "Bienvenue sur Stolos !",
    }),
    subheading: t({
      en: "Create your account",
      fr: "Créez votre compte",
    }),
    confirmPasswordLabel: t({
      en: "Confirm password",
      fr: "Confirmez le mot de passe",
    }),
    submit: t({ en: "Create my account", fr: "Créer mon compte" }),
  },
} satisfies Dictionary;

export default signupContent;
