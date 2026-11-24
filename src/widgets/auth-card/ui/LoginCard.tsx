import { cookies } from "next/headers";
import { Suspense } from "react";
import { PENDING_TWO_FACTOR_COOKIE } from "../model/pending-two-factor-cookie";
import { AuthCard } from "./AuthCard";

async function AuthCardWithPendingChallenge() {
  const pendingCookie = (await cookies()).get(PENDING_TWO_FACTOR_COOKIE)?.value ?? null;
  return <AuthCard pendingCookie={pendingCookie} />;
}

export function LoginCard() {
  return (
    <Suspense>
      <AuthCardWithPendingChallenge />
    </Suspense>
  );
}
