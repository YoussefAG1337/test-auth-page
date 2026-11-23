import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { type Sector, sectorMap } from "./sectors";

type SectorTagVariant = "empty-small" | "filled-large" | "empty-large";

const iconVariants = cva("aspect-square h-2.5", {
  variants: {
    variant: {
      "empty-small": "w-2",
      "filled-large": "w-2.5",
      "empty-large": "size-3.5",
    },
  },
});

interface IProps {
  sector: Sector;
  /** Translated name of the sector. */
  label: string;
  variant?: SectorTagVariant;
  /** Tinted background in the sector colour. */
  bg?: "dim" | "light-dim";
  /** White icon and text, no background: the look used on the company cards. */
  isMonochrome?: boolean;
  className?: string;
}

export const SectorTag = ({ sector, label, variant = "empty-small", bg, isMonochrome = false, className }: IProps) => {
  const { emptyIcon: EmptyIcon, filledIcon: FilledIcon, color: sectorColor } = sectorMap[sector];
  const Icon = variant === "filled-large" ? FilledIcon : EmptyIcon;
  const backgroundColor = isMonochrome || !bg ? undefined : `${sectorColor}${bg === "dim" ? "0F" : "1A"}`;

  return (
    <div
      className={cn("flex items-center gap-s rounded-xs py-xs", !isMonochrome && "px-s", className)}
      style={{ color: isMonochrome ? "white" : sectorColor, backgroundColor }}
    >
      <Icon className={iconVariants({ variant })} />
      <p className="text-xs-plus font-light tracking-[0.26px]">{label}</p>
    </div>
  );
};
