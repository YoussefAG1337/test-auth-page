"use client";

import { GlassCard } from "@/shared/ui/glass-card";
import { usePendingReset } from "../model/pending-reset";
import { ForgotPasswordRequest } from "./ForgotPasswordRequest";
import { ForgotPasswordSent } from "./ForgotPasswordSent";

export function ForgotPassword() {
  const pendingEmail = usePendingReset();

  return (
    <GlassCard className="gap-3xl">
      {pendingEmail ? <ForgotPasswordSent email={pendingEmail} /> : <ForgotPasswordRequest />}
    </GlassCard>
  );
}
