import Stripe from "stripe";

let cached: Stripe | null = null;

/** Lazily create the Stripe client so a missing key only fails at request time, not build time. */
export function getStripe(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  cached = new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
  return cached;
}
