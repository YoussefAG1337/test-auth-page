"use client";

import { useIntlayer } from "next-intlayer";
import type { CompanyStatus } from "../model/company-status";

export function CompanyStatusBadge({ status }: { status: CompanyStatus }) {
  const content = useIntlayer("company-status");

  if (status === "ACTIVE") return null;

  const isSold = status === "ACQUIRED";

  return (
    <span
      className={`shrink-0 rounded-xs px-s py-xs text-xs font-medium leading-4 ${
        isSold ? "bg-warning-50 text-warning" : "bg-closed-50 text-closed"
      }`}
    >
      {isSold ? content.sold : content.closed}
    </span>
  );
}
