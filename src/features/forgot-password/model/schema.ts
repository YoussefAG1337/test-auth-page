import { z } from "zod";

// A factory for the same reason as the login schema: the message is translated.
export const buildForgotPasswordSchema = ({ emailInvalid }: { emailInvalid: string }) =>
  z.object({
    email: z.email({ message: emailInvalid }),
  });

export type ForgotPasswordInput = z.infer<ReturnType<typeof buildForgotPasswordSchema>>;
