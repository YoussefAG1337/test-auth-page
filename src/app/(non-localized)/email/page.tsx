import { getIntlayer, localeDetector } from "intlayer";
import { headers } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import { ResetPasswordEmail } from "@/features/forgot-password";
import { prisma } from "@/lib/prisma";

// Development mailbox for the reset email: no real email is sent, so the last stored
// link is rendered as the email the user would have received. `?to=` picks an account.

type EmailPageProps = {
  searchParams: Promise<{ to?: string | string[] }>;
};

// Reads the database on every request, so it streams in behind the static page shell.
async function LatestResetEmail({ searchParams }: EmailPageProps) {
  await connection();
  const { to } = await searchParams;
  const recipient = typeof to === "string" ? to : undefined;

  const mail = await prisma.devMail.findFirst({
    where: { kind: "PASSWORD_RESET", ...(recipient && { to: recipient }) },
    orderBy: { createdAt: "desc" },
  });

  if (!mail) {
    // No URL locale on this page, so the empty state follows the browser's language.
    const locale = localeDetector({ "accept-language": (await headers()).get("accept-language") ?? undefined });
    const { emptyState, emptyStateFor } = getIntlayer("reset-email", locale);

    return (
      <p lang={locale} className="text-sx text-white/60">
        {recipient ? `${emptyStateFor} ${recipient}.` : emptyState}
      </p>
    );
  }

  return <ResetPasswordEmail resetUrl={mail.content} />;
}

export default function EmailPage({ searchParams }: EmailPageProps) {
  return (
    <main className="flex min-h-screen w-full justify-center bg-[#17132a] px-m py-4xl">
      <Suspense>
        <LatestResetEmail searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
