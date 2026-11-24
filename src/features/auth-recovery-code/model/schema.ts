import { z } from "zod";

export const buildRecoveryCodeSchema = ({ required }: { required: string }) =>
  z.object({
    code: z.string().trim().min(1, { message: required }),
  });

export type RecoveryCodeInput = z.infer<ReturnType<typeof buildRecoveryCodeSchema>>;
