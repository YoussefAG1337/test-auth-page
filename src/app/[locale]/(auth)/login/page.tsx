import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { AuthCard } from "@/widgets/auth-card";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: getIntlayer("login", locale).metaTitle };
}

export default function LoginPage() {
  return <AuthCard />;
}
