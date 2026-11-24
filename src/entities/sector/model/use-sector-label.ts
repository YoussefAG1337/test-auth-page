"use client";

import { useIntlayer } from "next-intlayer";
import type { Sector } from "./sectors";

/** The provided sectors carry no names; this is where they get translated ones. */
export function useSectorLabel() {
  const content = useIntlayer("sectors");
  return (sector: Sector): string => content[sector].value;
}
