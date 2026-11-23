import type { Metadata } from "next";
import type { ReactNode } from "react";
import { bodyClassName, htmlClassName } from "@/shared/ui/fonts";
import "../globals.css";

// Root layout for the routes that are deliberately not localized: the "/" redirect
// and the dev helper pages. The localized routes have their own root layout under
// [locale], which is what lets <html lang> follow the active locale.
export const metadata: Metadata = {
  title: "Stolos",
};

export default function NonLocalizedLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={htmlClassName}>
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
