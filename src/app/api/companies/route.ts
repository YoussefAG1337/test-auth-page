import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { CompaniesResponse } from "@/widgets/fleet-overlay";

const querySchema = z.object({
  locale: z.enum(["en", "fr"]).catch("en"),
});

export async function GET(request: Request) {
  const { locale } = querySchema.parse(
    Object.fromEntries(new URL(request.url).searchParams),
  );

  try {
    const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });

    return Response.json({
      success: true,
      data: companies.map(({ id, name, sectors, status, descriptionFr, descriptionEn }) => ({
        id,
        name,
        sectors,
        status,
        description: locale === "fr" ? descriptionFr : descriptionEn,
      })),
    } satisfies CompaniesResponse);
  } catch {
    return Response.json(
      { success: false, error: "Companies could not be loaded." } satisfies CompaniesResponse,
      { status: 500 },
    );
  }
}
