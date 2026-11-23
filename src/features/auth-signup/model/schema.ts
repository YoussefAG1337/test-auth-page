import { z } from "zod";

export type SignupMessages = {
  emailInvalid: string;
  required: string;
  passwordTooShort: string;
  passwordsDoNotMatch: string;
};

// 8 characters is Better-Auth's default minimum; the server rejects anything shorter.
export const buildSignupSchema = ({
  emailInvalid,
  required,
  passwordTooShort,
  passwordsDoNotMatch,
}: SignupMessages) =>
  z
    .object({
      email: z.email({ message: emailInvalid }),
      password: z.string().min(8, { message: passwordTooShort }),
      confirmPassword: z.string().min(1, { message: required }),
    })
    .superRefine((values, ctx) => {
      if (values.password !== values.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: passwordsDoNotMatch,
          path: ["confirmPassword"],
        });
      }
    });

export type SignupInput = z.infer<ReturnType<typeof buildSignupSchema>>;
