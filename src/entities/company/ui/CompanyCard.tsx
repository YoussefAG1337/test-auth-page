import type { ReactNode } from "react";
import type { CompanyStatus } from "../model/company-status";
import { CompanyStatusBadge } from "./CompanyStatusBadge";

type CompanyCardProps = {
  name: string;
  description: string;
  status: CompanyStatus;
  /** The sector tags. Passed in because sectors are another entity this one can't import. */
  sectors: ReactNode;
};

// Figma "Mode Carte" (490:1342). The design's logos are a placeholder image, so the
// company's initial stands in, both in the small circle and in the large faded copy
// behind the top-left corner. That copy's mask reproduces the design's: a radial fade
// from 30% to nothing, centred on the card's corner, over ~183px.
export function CompanyCard({ name, description, status, sectors }: CompanyCardProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article className="relative w-[552px] overflow-clip rounded-[10px] bg-[var(--glass-background)] opacity-30 shadow-[0px_0px_30px_2px_rgba(255,255,255,0.15)]">
      <div
        aria-hidden
        className="absolute -top-[92px] -left-[94px] flex size-[300px] items-center justify-center rounded-full bg-[#1379cd] text-[160px] font-semibold text-white [mask-image:radial-gradient(circle_183px_at_94px_92px,rgb(0_0_0/0.3),transparent)]"
      >
        {initial}
      </div>

      <div className="relative flex flex-col gap-[19px] p-[18px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-sm">
              <span className="flex size-[38px] items-center justify-center rounded-full bg-[#1379cd] text-ms font-semibold text-white">
                {initial}
              </span>
              <p className="text-ms font-bold text-white">{name}</p>
            </div>
            <CompanyStatusBadge status={status} />
          </div>
          <p className="w-[378px] text-xs-plus leading-[18px] text-white">{description}</p>
        </div>

        <div className="flex items-center gap-[26px]">{sectors}</div>
      </div>
    </article>
  );
}
