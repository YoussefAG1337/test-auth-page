import { getIntlayer, getLocalizedPath } from "intlayer";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/features/auth-sign-out";
import { GlassCard } from "@/shared/ui/glass-card";

export const instant = false;

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: getIntlayer("common", locale).dashboardMetaTitle };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  await connection();

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(getLocalizedPath("/login", locale));

  const common = getIntlayer("common", locale);

  return (
    <GlassCard className="gap-2xl text-center">
      <header className="flex flex-col items-center gap-2.5">
        <h1 className="text-lm font-semibold leading-[34px] text-white">
          {common.dashboardHeading}
        </h1>
        <p className="text-s font-light text-white/80">{common.dashboardBody}</p>
        <p className="text-sx text-primary-200">{session.user.email}</p>
      </header>

      <SignOutButton />
    </GlassCard>
  );
}
