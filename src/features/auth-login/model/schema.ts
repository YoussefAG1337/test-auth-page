import { z } from "zod";

export type LoginMessages = {
  emailInvalid: string;
  required: string;
};

// A factory rather than a module-level schema: the messages are translated, and
// translations are only available inside a component.
export const buildLoginSchema = ({ emailInvalid, required }: LoginMessages) =>
  z.object({
    email: z.email({ message: emailInvalid }),
    password: z.string().min(1, { message: required }),
  });

export type LoginInput = z.infer<ReturnType<typeof buildLoginSchema>>;
