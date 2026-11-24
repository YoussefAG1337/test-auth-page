import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { ForgotPassword } from "@/features/forgot-password";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: getIntlayer("forgot-password", locale).metaTitle };
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
