import { z } from "zod";

export type LoginMessages = {
  emailInvalid: string;
  required: string;
};

export const buildLoginSchema = ({ emailInvalid, required }: LoginMessages) =>
  z.object({
    email: z.email({ message: emailInvalid }),
    password: z.string().min(1, { message: required }),
  });

export type LoginInput = z.infer<ReturnType<typeof buildLoginSchema>>;
