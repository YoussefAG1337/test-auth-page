import { t, type Dictionary } from "intlayer";

const resetPasswordContent = {
  key: "reset-password",
  content: {
    metaTitle: t({ en: "New password", fr: "Nouveau mot de passe" }),
    heading: t({ en: "Create a new password", fr: "Créez un nouveau mot de passe" }),
    subheading: t({
      en: "Choose a new password for your account.",
      fr: "Choisissez un nouveau mot de passe pour votre compte.",
    }),
    newPasswordLabel: t({ en: "New password", fr: "Nouveau mot de passe" }),
    confirmPasswordLabel: t({ en: "Confirm the password", fr: "Confirmez le mot de passe" }),
    submit: t({ en: "Save the password", fr: "Enregistrer le mot de passe" }),

    // Not in Figma: what the link leads to when it can't be used any more.
    invalidHeading: t({ en: "Link expired or already used", fr: "Lien expiré ou déjà utilisé" }),
    invalidBody: t({
      en: "This reset link is no longer valid. Request a new one to choose a new password.",
      fr: "Ce lien de réinitialisation n’est plus valide. Demandez-en un nouveau pour choisir un nouveau mot de passe.",
    }),
    requestNewLink: t({ en: "Request a new link", fr: "Demander un nouveau lien" }),

    // Not in Figma: shown once the new password is saved.
    doneHeading: t({ en: "Password updated", fr: "Mot de passe mis à jour" }),
    doneBody: t({
      en: "You can now sign in with your new password.",
      fr: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    }),
    signIn: t({ en: "Sign in", fr: "Se connecter" }),
  },
} satisfies Dictionary;

export default resetPasswordContent;
