import { t, type Dictionary } from "intlayer";

const resetEmailContent = {
  key: "reset-email",
  content: {
    heading: t({ en: "Reset your password", fr: "Réinitialisez votre mot de passe" }),
    cta: t({ en: "Choose a new password", fr: "Choisir un nouveau mot de passe" }),
    body: t({
      en: "We received a request to reset the password of your Stolos account. This link expires in one hour.",
      fr: "Nous avons reçu une demande de réinitialisation du mot de passe de votre compte Stolos. Ce lien expire dans une heure.",
    }),
    ignore: t({
      en: "If you didn’t make this request, you can ignore this message: your password stays unchanged.",
      fr: "Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message : votre mot de passe reste inchangé.",
    }),
    copyLink: t({
      en: "Or copy this link into your browser:",
      fr: "Ou copiez ce lien dans votre navigateur :",
    }),
    footerBefore: t({ en: "This is an automated message from ", fr: "Ceci est un message automatique de " }),
    footerAfter: t({ en: ". Please do not reply.", fr: ". Merci de ne pas y répondre." }),

    emptyState: t({
      en: "No reset email yet.",
      fr: "Aucun courriel de réinitialisation pour l’instant.",
    }),
    emptyStateFor: t({
      en: "No reset email yet for",
      fr: "Aucun courriel de réinitialisation pour",
    }),
  },
} satisfies Dictionary;

export default resetEmailContent;
