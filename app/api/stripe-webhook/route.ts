import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  proPurchaseCustomerEmail,
  proPurchaseOwnerEmail,
  sendEmail,
} from "@/lib/email";

export const dynamic = "force-dynamic";

function formatAmount(session: Stripe.Checkout.Session): string {
  const total = session.amount_total;
  if (total == null) return "—";
  const currency = (session.currency ?? "usd").toUpperCase();
  return `${(total / 100).toFixed(2)} ${currency}`;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  // Stripe signature verification requires the raw, unparsed request body.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature.";
    return NextResponse.json({ error: `Webhook verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;
    const ownerEmail = process.env.OWNER_EMAIL;

    try {
      if (customerEmail) {
        const customerMsg = proPurchaseCustomerEmail();
        await sendEmail({ to: customerEmail, ...customerMsg });
      }
      if (ownerEmail) {
        const ownerMsg = proPurchaseOwnerEmail(customerEmail ?? "unknown", formatAmount(session));
        await sendEmail({ to: ownerEmail, ...ownerMsg });
      }
    } catch (err) {
      // Don't fail the webhook on email errors — Stripe would otherwise retry.
      console.error("Failed to send purchase emails:", err);
    }
  }

  return NextResponse.json({ received: true });
}
