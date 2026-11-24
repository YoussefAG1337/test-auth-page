"use client";

import { useIntlayer } from "next-intlayer";
import type { Sector } from "./sectors";

export function useSectorLabel() {
  const content = useIntlayer("sectors");
  return (sector: Sector): string => content[sector].value;
}
