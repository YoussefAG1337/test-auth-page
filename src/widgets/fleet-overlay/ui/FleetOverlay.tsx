"use client";

import { CompanyCard } from "@/entities/company";
import { SectorTag, useSectorLabel } from "@/entities/sector";
import { cn } from "@/shared/lib/utils";
import { useCompanies } from "../model/companies";

// Positions from the 1920×1080 Figma frame; `top` scales with the viewport height.
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

export function FleetOverlay() {
  const { data: companies } = useCompanies();
  const sectorLabel = useSectorLabel();

  if (!companies) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 animate-fade-in motion-reduce:animate-none max-[1279px]:hidden">
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
