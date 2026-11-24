import Image from "next/image";
import { cn } from "@/shared/lib/utils";

// The source artwork sits in the top-right of a much larger transparent canvas, so the
// mark is framed by a fixed window over a scaled, offset image — the same crop the
// design file uses. Next resizes the source down on delivery.
const WINDOW_WIDTH = 169;
const WINDOW_HEIGHT = 167;
const IMAGE_WIDTH = Math.round(WINDOW_WIDTH * 1.7217);
const IMAGE_HEIGHT = Math.round(WINDOW_HEIGHT * 2.1786);
const IMAGE_OFFSET_X = Math.round(WINDOW_WIDTH * -0.721);

// The crop is in px, so callers resize the whole logo with `zoom` via `className`.
export function StolosLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden", className)}
      style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
    >
      <Image
        src="/stolos-logo.png"
        alt="Stolos"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        priority
        className="absolute top-0 max-w-none"
        style={{ left: IMAGE_OFFSET_X }}
      />
    </div>
  );
}
