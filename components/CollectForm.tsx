"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CollectFormProps {
  businessId: string;
}

export default function CollectForm({ businessId }: CollectFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      businessId,
      authorName: String(data.get("authorName") ?? ""),
      authorRole: String(data.get("authorRole") ?? ""),
      authorCompany: String(data.get("authorCompany") ?? ""),
      content: String(data.get("content") ?? ""),
      rating,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      router.push("/submit-success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const activeStars = hovered || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="authorName" className="mb-1 block text-sm font-medium text-slate-700">
          Your name <span className="text-rose-500">*</span>
        </label>
        <input
          id="authorName"
          name="authorName"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="Jane Doe"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="authorRole" className="mb-1 block text-sm font-medium text-slate-700">
            Role
          </label>
          <input
            id="authorRole"
            name="authorRole"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Marketing Manager"
          />
        </div>
        <div>
          <label htmlFor="authorCompany" className="mb-1 block text-sm font-medium text-slate-700">
            Company
          </label>
          <input
            id="authorCompany"
            name="authorCompany"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-slate-700">Rating</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <svg
                viewBox="0 0 20 20"
                className={`h-8 w-8 ${value <= activeStars ? "text-amber-400" : "text-slate-300"}`}
                fill="currentColor"
              >
                <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium text-slate-700">
          Your testimonial <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="Tell us what you loved..."
        />
      </div>

      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit testimonial"}
      </button>
    </form>
  );
}
