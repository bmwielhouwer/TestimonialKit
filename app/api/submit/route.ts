import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addSubmission, getBusiness } from "@/lib/data";
import type { Testimonial } from "@/types";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const businessId = String(body.businessId ?? "").trim();
  const authorName = String(body.authorName ?? "").trim();
  const authorRole = String(body.authorRole ?? "").trim();
  const authorCompany = String(body.authorCompany ?? "").trim();
  const content = String(body.content ?? "").trim();
  const rating = Number(body.rating);

  if (!businessId || !getBusiness(businessId)) {
    return NextResponse.json({ error: "Unknown business." }, { status: 404 });
  }
  if (!authorName) {
    return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  }
  if (!content) {
    return NextResponse.json({ error: "A testimonial is required." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  const testimonial: Testimonial = {
    id: randomUUID(),
    businessId,
    authorName,
    authorRole,
    authorCompany,
    content,
    rating,
    approved: false,
    createdAt: new Date().toISOString(),
    featured: false,
  };

  await addSubmission(testimonial);

  return NextResponse.json({ ok: true }, { status: 201 });
}
