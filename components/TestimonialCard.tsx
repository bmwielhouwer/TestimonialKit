import type { Testimonial } from "@/types";
import StarRating from "@/components/StarRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { authorName, authorRole, authorCompany, content, rating, featured } = testimonial;

  const roleLine = [authorRole, authorCompany].filter(Boolean).join(", ");
  const initials = authorName
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition ${
        featured ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <StarRating rating={rating} />
        {featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
            </svg>
            Featured
          </span>
        )}
      </div>

      <blockquote className="flex-1 text-slate-700">
        <p className="leading-relaxed">&ldquo;{content}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          {initials || "?"}
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold text-slate-900">{authorName}</div>
          {roleLine && <div className="truncate text-sm text-slate-500">{roleLine}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
