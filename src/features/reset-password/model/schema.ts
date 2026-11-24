import { z } from "zod";

export type ResetPasswordMessages = {
  required: string;
  passwordTooShort: string;
  passwordsDoNotMatch: string;
};

export const buildResetPasswordSchema = ({
  required,
  passwordTooShort,
  passwordsDoNotMatch,
}: ResetPasswordMessages) =>
  z
    .object({
      newPassword: z.string().min(8, { message: passwordTooShort }),
      confirmPassword: z.string().min(1, { message: required }),
    })
    .superRefine((values, ctx) => {
      if (values.newPassword !== values.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: passwordsDoNotMatch,
          path: ["confirmPassword"],
        });
      }
    });

export type ResetPasswordInput = z.infer<ReturnType<typeof buildResetPasswordSchema>>;
