import { NextResponse } from "next/server";
import { getApprovedForBusiness, getBusiness, sortForDisplay } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * Public JSON API for approved testimonials.
 * GET /api/testimonials?businessId=brightledger
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId")?.trim();

  if (!businessId) {
    return NextResponse.json({ error: "businessId query parameter is required." }, { status: 400 });
  }

  const business = getBusiness(businessId);
  if (!business) {
    return NextResponse.json({ error: "Unknown business." }, { status: 404 });
  }

  const testimonials = sortForDisplay(await getApprovedForBusiness(businessId));

  return NextResponse.json({
    business: { id: business.id, name: business.name },
    count: testimonials.length,
    testimonials,
  });
}
