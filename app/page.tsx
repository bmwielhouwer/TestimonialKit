import type { Metadata } from "next";
import Link from "next/link";
import UpgradeButton from "@/components/UpgradeButton";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "TestimonialKit — Collect and display customer testimonials",
  description:
    "Collect customer testimonials with a shareable page and embed approved ones on any website with a single line of code. Free to start, $49 one-time for Pro.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TestimonialKit — Social proof on autopilot",
    description:
      "Collect customer testimonials with a shareable page and embed approved ones on any website with a single line of code.",
    url: appUrl,
    siteName: "TestimonialKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestimonialKit — Social proof on autopilot",
    description:
      "Collect customer testimonials and embed them anywhere with a single line of code.",
  },
};

const freeFeatures = [
  "One public collection page",
  "Up to 10 testimonials displayed",
  "Star ratings and author details",
  "Owner approval dashboard",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited testimonials displayed",
  "Featured testimonial sorting",
  "Embeddable widget for any website",
  "Priority email support",
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.29 6.8-6.79a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-20 text-center sm:pt-28">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Social proof, the easy way
        </span>
        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Turn happy customers into your best marketing
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-600">
          TestimonialKit gives your business a clean page to collect customer testimonials and an
          embeddable widget to show the best ones on your website — no developers required.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/collect/brightledger"
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            Get Started Free
          </Link>
          <Link
            href="/widget/brightledger"
            className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            See a live widget
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400">No credit card required to start.</p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Share your link",
              body: "Send customers your collection page after a great experience.",
            },
            {
              step: "2",
              title: "Approve the best",
              body: "Review submissions in your dashboard and approve the ones you love.",
            },
            {
              step: "3",
              title: "Embed anywhere",
              body: "Drop one line of code on your site to display approved testimonials.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Simple, honest pricing</h2>
          <p className="mt-3 text-slate-600">Try it free, then unlock everything with one payment.</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Free — limited starter plan, intentionally understated */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8 md:scale-95">
            <h3 className="text-lg font-semibold text-slate-500">Starter</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-700">Free</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              A limited starter plan to try things out. You&apos;ll quickly outgrow it as your
              testimonials add up.
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-slate-500">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/collect/brightledger"
              className="mt-8 block rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-medium text-slate-500 transition hover:bg-slate-50"
            >
              Get Started Free
            </Link>
            <p className="mt-2 text-center text-xs text-slate-400">
              Try the live demo — no signup required.
            </p>
          </div>

          {/* Pro — visually dominant, recommended option */}
          <div className="relative flex flex-col rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-2xl ring-2 ring-indigo-200 md:scale-110">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              Recommended
            </span>
            <h3 className="text-lg font-bold text-indigo-700">Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-slate-900">$49</span>
              <span className="text-slate-500">one-time</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              The complete toolkit, yours for a single payment. No subscriptions, no limits.
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-2 text-sm font-medium text-slate-800">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <UpgradeButton className="mt-8 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
              Upgrade to Pro
            </UpgradeButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} TestimonialKit. Built with Next.js.</p>
      </footer>
    </main>
  );
}
