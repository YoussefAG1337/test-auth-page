"use client";

import { useIntlayer } from "next-intlayer";
import type { AuthErrorKey } from "./auth-error";

export function useAuthErrorMessage() {
  const content = useIntlayer("errors");

  return (key?: AuthErrorKey): string | undefined => {
    switch (key) {
      case "invalidCredentials":
        return content.invalidCredentials.value;
      case "emailAlreadyUsed":
        return content.emailAlreadyUsed.value;
      case "passwordTooShort":
        return content.passwordTooShort.value;
      case "tooManyRequests":
        return content.tooManyRequests.value;
      case "generic":
        return content.generic.value;
      default:
        return undefined;
    }
  };
}
