import { Suspense } from "react";
import { ResetPassword } from "@/features/reset-password";

// ResetPassword reads the token from the URL; the boundary lets the rest of the
// page (logo, background) prerender while the card renders on the client.
export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
