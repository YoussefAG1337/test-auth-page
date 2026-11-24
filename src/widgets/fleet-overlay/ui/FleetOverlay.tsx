"use client";

import { CompanyCard } from "@/entities/company";
import { SectorTag, useSectorLabel } from "@/entities/sector";
import { cn } from "@/shared/lib/utils";
import { useCompanies } from "../model/companies";

// Card positions from the 1920×1080 Figma frames (490:960 and siblings). Each card is
// anchored to its own edge, in px (negative = partly off screen), so the two columns
// keep clear of the centred auth card at any width; `top` is a share of the viewport
// height so the columns also fit at 900px tall.
const DESIGN_HEIGHT = 1080;
const SLOTS = [
  { side: "left", offset: -136, top: 57 },
  { side: "left", offset: -283, top: 317 },
  { side: "left", offset: -114, top: 587 },
  { side: "left", offset: -207, top: 856 },
  { side: "right", offset: -117, top: 66 },
  { side: "right", offset: -266, top: 326 },
  { side: "right", offset: -156, top: 599 },
  { side: "right", offset: -271, top: 847 },
] as const;

/**
 * The faded company cards behind every auth screen. Content comes from
 * GET /api/companies; while it loads (or if it fails) nothing is shown, since the
 * layer is decorative.
 *
 * Below 1920px wide the cards shrink to 80% towards their edge: at 1400px that keeps
 * the left column under 306px, clear of the auth card at 402px. Below 1280px, which
 * isn't a target size, there is no room for them at all.
 */
export function FleetOverlay() {
  const { data: companies } = useCompanies();
  const sectorLabel = useSectorLabel();

  if (!companies) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 max-[1279px]:hidden">
      {SLOTS.map((slot, index) => {
        const company = companies[index];
        if (!company) return null;

        return (
          <div
            key={company.id}
            className={cn(
              "absolute max-[1919px]:scale-[0.8]",
              slot.side === "left" ? "origin-top-left" : "origin-top-right",
            )}
            style={{ top: `${(slot.top / DESIGN_HEIGHT) * 100}%`, [slot.side]: slot.offset }}
          >
            <CompanyCard
              name={company.name}
              description={company.description}
              status={company.status}
              sectors={company.sectors.map((sector) => (
                <SectorTag key={sector} sector={sector} label={sectorLabel(sector)} isMonochrome />
              ))}
            />
          </div>
        );
      })}
    </div>
  );
}
