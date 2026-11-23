"use client";

import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { LoginForm } from "@/features/auth-login";
import { SignupForm } from "@/features/auth-signup";
import { cn } from "@/shared/lib/utils";
import type { AuthState } from "../model/state";

const tabClassName = (isActive: boolean) =>
  cn(
    "relative cursor-pointer pb-sm text-s font-semibold capitalize leading-[1.64] transition-colors",
    "after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:transition-colors",
    isActive
      ? "text-primary-300 after:bg-primary-300"
      : "text-white/80 after:bg-transparent hover:text-white",
  );

export function AuthCard() {
  const [state, setState] = useState<AuthState>({ step: "login" });
  const common = useIntlayer("common");
  const login = useIntlayer("login");
  const signup = useIntlayer("signup");

  const isSignup = state.step === "signup";
  const heading = isSignup ? signup.heading : login.heading;
  const subheading = isSignup ? signup.subheading : login.subheading;

  return (
    <div className="flex w-full max-w-[595px] flex-col items-center gap-4xl rounded-m bg-white/[0.03] p-4xl shadow-[0px_30px_40px_0px_rgba(0,0,0,0.3)]">
      <header className="flex flex-col items-center justify-center gap-2.5 text-center">
        <h1 className="text-lm font-semibold leading-[34px] text-white">{heading}</h1>
        <p className="text-s font-light text-white/80">{subheading}</p>
      </header>

      <div className="flex w-full flex-col items-center gap-2xl">
        <div className="flex w-full flex-col items-center gap-xl">
          <div className="flex w-full flex-col items-center gap-sm">
            <div className="flex items-center gap-4xl">
              <button
                type="button"
                onClick={() => setState({ step: "login" })}
                aria-current={!isSignup}
                className={tabClassName(!isSignup)}
              >
                {common.tabLogin}
              </button>
              <button
                type="button"
                onClick={() => setState({ step: "signup" })}
                aria-current={isSignup}
                className={tabClassName(isSignup)}
              >
                {common.tabSignup}
              </button>
            </div>
            <div className="h-px w-full bg-white/15" />
          </div>

          {isSignup ? <SignupForm /> : <LoginForm />}
        </div>

        <div className="flex items-center justify-center gap-2.5">
          <span className="text-sx tracking-[-0.28px] text-white">{common.termsOfUse}</span>
          <span className="h-[11px] w-px bg-white/50" />
          <span className="text-sx tracking-[-0.28px] text-primary-50">{common.privacyPolicy}</span>
        </div>
      </div>
    </div>
  );
}
