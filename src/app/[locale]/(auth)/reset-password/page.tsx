import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPassword } from "@/features/reset-password";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: getIntlayer("reset-password", locale).metaTitle };
}

// ResetPassword reads the token from the URL; the boundary lets the rest of the
// page (logo, background) prerender while the card renders on the client.
export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
