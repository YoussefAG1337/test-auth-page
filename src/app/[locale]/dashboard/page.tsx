import { getIntlayer, getLocalizedPath } from "intlayer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/features/auth-sign-out";

// This page has to know who you are before it renders anything, so it blocks rather
// than streaming a shell that would flash before the redirect lands. Scoped to this
// page on purpose: on the [locale] layout it would hold every route, login included.
export const instant = false;

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  // Keeps the session read on the request path instead of letting it be prerendered.
  // Note PPR still answers the document with a static shell (200) and resolves the
  // redirect on resume — the guard holds because the shell carries no session data,
  // but don't read the 200 as "the page was served".
  await connection();

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(getLocalizedPath("/login", locale));

  // getIntlayer rather than the hook: this is an async server component.
  const common = getIntlayer("common", locale);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-xl overflow-hidden bg-[#1c1835] px-m py-xl text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_0%,rgba(150,128,230,0.30),transparent_70%),radial-gradient(75%_45%_at_50%_100%,rgba(116,95,196,0.28),transparent_72%)]"
      />

      <div className="relative flex w-full max-w-[595px] flex-col items-center gap-2xl rounded-m bg-white/[0.03] p-4xl shadow-[0px_30px_40px_0px_rgba(0,0,0,0.3)]">
        <header className="flex flex-col items-center gap-2.5">
          <h1 className="text-lm font-semibold leading-[34px] text-white">
            {common.dashboardHeading}
          </h1>
          <p className="text-s font-light text-white/80">{common.dashboardBody}</p>
          <p className="text-sx text-primary-200">{session.user.email}</p>
        </header>

        <SignOutButton />
      </div>
    </main>
  );
}
