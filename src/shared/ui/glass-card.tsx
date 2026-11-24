import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

// The translucent card every auth screen sits in. The gap between its sections
// differs per screen in Figma, so callers pass it through `className`.
export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[595px] flex-col items-center rounded-m bg-white/[0.03] p-4xl shadow-[0px_30px_40px_0px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
