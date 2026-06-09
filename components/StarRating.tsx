interface StarRatingProps {
  rating: number;
  className?: string;
}

/** Read-only star display for a 1-5 rating. */
export default function StarRating({ rating, className = "" }: StarRatingProps) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${rounded} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rounded ? "text-amber-400" : "text-slate-300"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
