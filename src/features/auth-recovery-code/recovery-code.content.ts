import { t, type Dictionary } from "intlayer";

const recoveryCodeContent = {
  key: "recovery-code",
  content: {
    heading: t({ en: "Enter a recovery code", fr: "Saisissez un code de récupération" }),
    codeLabel: t({ en: "Recovery code", fr: "Code de récupération" }),
    submit: t({ en: "Verify and sign in", fr: "Valider et se connecter" }),
    useVerificationCode: t({
      en: "Use a verification code",
      fr: "Utiliser un code de vérification",
    }),
    help: t({
      en: "Use one of the recovery codes you saved when you turned on two-step verification. Each code can be used only once.",
      fr: "Utilisez l’un des codes de récupération sauvegardés lors de l’activation de la vérification en deux étapes. Chaque code est à usage unique.",
    }),
  },
} satisfies Dictionary;

export default recoveryCodeContent;
