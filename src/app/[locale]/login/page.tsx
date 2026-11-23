import { Suspense } from "react";
import { getLocale } from "next-intlayer/server";

async function LocaleLabel() {
  const locale = await getLocale();
  return <>({locale})</>;
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center text-white">
      <p>
        Login — placeholder, built in Phase 2{" "}
        <Suspense fallback={null}>
          <LocaleLabel />
        </Suspense>
      </p>
    </main>
  );
}
