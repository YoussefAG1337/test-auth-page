import Image from "next/image";
import { cn } from "@/shared/lib/utils";

const WINDOW_WIDTH = 169;
const WINDOW_HEIGHT = 167;
const IMAGE_WIDTH = Math.round(WINDOW_WIDTH * 1.7217);
const IMAGE_HEIGHT = Math.round(WINDOW_HEIGHT * 2.1786);
const IMAGE_OFFSET_X = Math.round(WINDOW_WIDTH * -0.721);

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
