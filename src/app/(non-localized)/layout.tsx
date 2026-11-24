import type { Metadata } from "next";
import type { ReactNode } from "react";
import { bodyClassName, htmlClassName } from "@/shared/ui/fonts";
import "../globals.css";

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
