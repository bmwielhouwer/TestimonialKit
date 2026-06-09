import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectForm from "@/components/CollectForm";
import EmbedCode from "@/components/EmbedCode";
import { getBusiness } from "@/lib/data";

interface PageProps {
  params: { businessId: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const business = getBusiness(params.businessId);
  if (!business) {
    return { title: "Collection page not found" };
  }
  return {
    title: `Leave a testimonial for ${business.name}`,
    description: `Share your experience with ${business.name}. Your feedback helps others and takes less than a minute.`,
    robots: { index: false },
  };
}

export default function CollectPage({ params }: PageProps) {
  const business = getBusiness(params.businessId);
  if (!business) notFound();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Share your experience
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{business.name}</h1>
          <p className="mt-3 text-slate-600">
            We&apos;d love to hear how {business.name} worked for you. It only takes a minute.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <CollectForm businessId={business.id} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Submitted testimonials are reviewed before they appear publicly.
        </p>

        <div className="mt-12">
          <EmbedCode businessId={business.id} appUrl={appUrl} />
        </div>
      </div>
    </main>
  );
}
