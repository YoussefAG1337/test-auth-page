import { t, type Dictionary } from "intlayer";

const loginContent = {
  key: "login",
  content: {
    metaTitle: t({ en: "Sign in", fr: "Connexion" }),
    heading: t({
      en: "Good to see you again on Stolos!",
      fr: "Ravi de vous revoir sur Stolos !",
    }),
    subheading: t({
      en: "Sign in to your account",
      fr: "Connectez-vous à votre compte",
    }),
    forgotPassword: t({
      en: "Forgot your password?",
      fr: "Mot de passe oublié ?",
    }),
    submit: t({ en: "Sign in", fr: "Se connecter" }),
  },
} satisfies Dictionary;

export default loginContent;
