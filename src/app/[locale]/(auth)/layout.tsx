import type { ReactNode } from "react";
import { StolosLogo } from "@/shared/ui/stolos-logo";
import { FleetOverlay } from "@/widgets/fleet-overlay";

// Shared chrome for every auth screen: the dark page, its two soft purple glows and
// the logo above the card. The glows are CSS gradients rather than the exported Figma
// SVGs so they keep their proportions across both target resolutions.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1c1835] px-m py-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_0%,rgba(150,128,230,0.30),transparent_70%),radial-gradient(75%_45%_at_50%_100%,rgba(116,95,196,0.28),transparent_72%)]"
      />

      <FleetOverlay />

      <main className="relative flex w-full flex-col items-center gap-xl">
        <StolosLogo />
        {children}
      </main>
    </div>
  );
}
