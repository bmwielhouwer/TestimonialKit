import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you!",
  description: "Your testimonial was submitted successfully.",
  robots: { index: false },
};

export default function SubmitSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Thank you!</h1>
        <p className="mt-3 text-slate-600">
          Your testimonial has been submitted and is now waiting for review. We really appreciate you
          taking the time to share your experience.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
