import { z } from "zod";

export const buildForgotPasswordSchema = ({ emailInvalid }: { emailInvalid: string }) =>
  z.object({
    email: z.email({ message: emailInvalid }),
  });

export type ForgotPasswordInput = z.infer<ReturnType<typeof buildForgotPasswordSchema>>;
