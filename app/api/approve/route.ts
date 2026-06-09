import { NextResponse } from "next/server";
import { approveSubmission } from "@/lib/data";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!id) {
    return NextResponse.json({ error: "A testimonial id is required." }, { status: 400 });
  }

  const approved = await approveSubmission(id);
  if (!approved) {
    return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, testimonial: approved });
}
