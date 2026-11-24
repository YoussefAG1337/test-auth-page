"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intlayer";
import { z } from "zod";
import { CompanyStatus } from "@/entities/company";
import { SECTORS } from "@/entities/sector";

// The contract of GET /api/companies. It lives here rather than in entities/company
// because it joins two entities (company + sector), which only a higher layer may do.
// The description arrives already in the requested language; sectors and status are
// keys the UI translates.
const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sectors: z.array(z.enum(SECTORS)),
  status: z.enum(CompanyStatus),
});

const companiesResponseSchema = z.discriminatedUnion("success", [
  z.object({ success: z.literal(true), data: z.array(companySchema) }),
  z.object({ success: z.literal(false), error: z.string() }),
]);

export type Company = z.infer<typeof companySchema>;
export type CompaniesResponse = z.infer<typeof companiesResponseSchema>;

export const companyKeys = {
  all: ["companies"] as const,
  list: (locale: string) => [...companyKeys.all, locale] as const,
};

export function useCompanies() {
  const { locale } = useLocale();

  return useQuery({
    queryKey: companyKeys.list(locale),
    queryFn: async (): Promise<Company[]> => {
      const response = await fetch(`/api/companies?locale=${locale}`);
      const result = companiesResponseSchema.parse(await response.json());
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    // The list doesn't change during a visit; one request per locale is enough.
    staleTime: Number.POSITIVE_INFINITY,
  });
}
