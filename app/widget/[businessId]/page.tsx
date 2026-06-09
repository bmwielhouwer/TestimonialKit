import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TestimonialCard from "@/components/TestimonialCard";
import { getApprovedForBusiness, getBusiness, sortForDisplay } from "@/lib/data";

export const dynamic = "force-dynamic";

const FREE_TIER_LIMIT = 10;

interface PageProps {
  params: { businessId: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const business = getBusiness(params.businessId);
  if (!business) {
    return { title: "Widget not found" };
  }
  return {
    title: `${business.name} — Customer testimonials`,
    description: `Real testimonials from customers of ${business.name}.`,
    robots: { index: false },
  };
}

export default async function WidgetPage({ params }: PageProps) {
  const business = getBusiness(params.businessId);
  if (!business) notFound();

  const isPro = business.plan === "pro";
  const all = await getApprovedForBusiness(business.id);

  // Pro unlocks featured sorting; free shows newest first.
  const ordered = isPro
    ? sortForDisplay(all)
    : [...all].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Free tier displays up to 10 testimonials.
  const testimonials = isPro ? ordered : ordered.slice(0, FREE_TIER_LIMIT);

  return (
    <main className="min-h-screen bg-transparent p-4 sm:p-6">
      {testimonials.length === 0 ? (
        <p className="py-12 text-center text-slate-500">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      )}
    </main>
  );
}
