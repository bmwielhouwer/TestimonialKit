# TestimonialKit

**A lightweight, profitable SaaS that businesses use to collect customer testimonials and embed them anywhere — built and ready to sell.**

TestimonialKit gives any business two things every business wants: an effortless way to *collect* social proof, and a one-line widget to *display* it on their website. Customers leave testimonials through a clean public page, the owner approves the best ones from a private dashboard, and approved testimonials appear automatically in an embeddable widget.

It's a focused, single-purpose product in a market with proven demand and recurring buyer intent — social proof is one of the highest-leverage conversion tools online, and most small businesses still collect testimonials by hand.

---

## Why this is worth buying

- **Real, validated problem.** Every business with a website wants testimonials on it. The manual alternative (screenshots, copy-paste, hard-coded HTML) is painful and never gets updated.
- **One-time pricing that converts.** The Pro tier is a **$49 one-time** purchase, not a subscription. This dramatically lowers the buying friction and is a proven model for indie SaaS — no churn to manage, no dunning emails, immediate cash.
- **Tiny operational surface.** No database to administer, no servers to babysit. It deploys to Vercel's free/low-cost tier and runs itself.
- **Clean, modern codebase.** Next.js 14 App Router, TypeScript, and Tailwind only — no heavy component-library lock-in. Easy for any React developer to extend.
- **Already monetized.** Stripe Checkout and Resend email confirmations are wired in. Plug in your keys and you can take money on day one.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS (no component libraries) |
| Payments | Stripe Checkout + webhooks |
| Email | Resend |
| Hosting | Vercel (recommended) |
| Data | JSON files (zero-config; swap for a database to scale — see below) |

There are no other runtime dependencies. The entire product is `next`, `react`, `stripe`, and `resend`.

---

## How it works

1. **Collect** — Each business gets a public page at `/collect/[businessId]`. Customers fill in their name, role, company, a 1–5 star rating, and their testimonial. Submissions are saved with `approved: false`.
2. **Approve** — The owner reviews pending submissions in the dashboard, sees a count of pending vs. approved, and approves the good ones with one click.
3. **Display** — Approved testimonials render in an embeddable widget at `/widget/[businessId]`, designed to be dropped into any site via a copy-paste `<iframe>`. Featured testimonials sort to the top (Pro), and the Free tier displays up to 10.

A public read-only JSON API is also available at `/api/testimonials?businessId=…` for custom integrations.

---

## Deploy to Vercel in under 10 minutes

1. **Push the repo to your own GitHub account** (you likely already have it as part of the sale).
2. Go to [vercel.com/new](https://vercel.com/new), **import the repository**, and accept the defaults — Vercel auto-detects Next.js.
3. Add the environment variables from `.env.example` (see below) under **Project → Settings → Environment Variables**. At minimum set `NEXT_PUBLIC_APP_URL` to your production URL.
4. Click **Deploy**. That's it — your app is live.
5. Come back and fill in the Stripe and Resend keys (next sections) once you've created those accounts.

> **Note on data persistence:** Out of the box, submissions are stored in JSON files (`data/`). This is perfect for demos, a single-tenant deployment, or local use. On Vercel's serverless filesystem, writes are ephemeral. **Before going multi-tenant in production, point `lib/data.ts` at a real datastore** — Vercel KV, Postgres, Supabase, or Upstash are all drop-in friendly and the data layer is isolated in that one file to make this swap easy.

---

## Configure Stripe (and create the Pro price)

1. Create a [Stripe account](https://dashboard.stripe.com) and grab your **Secret key** and **Publishable key** from *Developers → API keys*.
2. Create the Pro product and price:
   - Go to *Products → Add product*.
   - Name it **TestimonialKit Pro**.
   - Set a **One-time** price of **$49**.
   - Save, then copy the **Price ID** (looks like `price_123…`). This is your `STRIPE_PRO_PRICE_ID`.
3. Set up the webhook so purchases trigger confirmation emails:
   - Go to *Developers → Webhooks → Add endpoint*.
   - Endpoint URL: `https://YOUR_DOMAIN/api/stripe-webhook`
   - Select the event **`checkout.session.completed`**.
   - Copy the **Signing secret** (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`.
4. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_PRO_PRICE_ID`, and `STRIPE_WEBHOOK_SECRET` to your environment variables.

The **Upgrade to Pro** button on the homepage creates a Stripe Checkout session server-side and redirects the buyer to Stripe's hosted checkout — no card data ever touches your app.

---

## Configure Resend (purchase emails)

1. Create a [Resend account](https://resend.com) and verify your sending domain.
2. Create an API key and set it as `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` to a verified sender, e.g. `TestimonialKit <hello@yourdomain.com>`.
4. Set `OWNER_EMAIL` to wherever you want sale notifications delivered.

When a purchase completes, the webhook sends the customer a **welcome confirmation** and you a **"new purchase" notification** automatically.

---

## Environment variables

All configuration lives in `.env.example`. Copy it to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-safe) |
| `STRIPE_SECRET_KEY` | Stripe secret key (server only) |
| `STRIPE_WEBHOOK_SECRET` | Verifies incoming Stripe webhooks |
| `STRIPE_PRO_PRICE_ID` | The $49 one-time Pro price ID |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `RESEND_FROM_EMAIL` | Verified "from" address |
| `OWNER_EMAIL` | Where owner notifications are sent |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the deployment |

No secrets are committed to the repo — every key is read from the environment.

---

## Accessing the owner dashboard

The dashboard lives at:

```
https://YOUR_DOMAIN/dashboard
```

It is intentionally **unlinked from the public site and excluded from search engines** (see `app/robots.ts`) so it acts as an obscure, low-friction admin page. It shows pending submissions in a table — author, company, rating, content preview, and date — with an **Approve** button per row, plus running totals of pending and approved testimonials.

> **Recommended hardening:** for a production sale, rename `app/dashboard` to a hard-to-guess path and/or add a simple password check (a single env-var-gated middleware is enough). It ships auth-free for simplicity.

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run lint                 # lint
```

Useful URLs while developing:

- Homepage / pricing — `/`
- Demo collection page — `/collect/brightledger`
- Demo widget — `/widget/brightledger`
- Owner dashboard — `/dashboard`

The repo ships with **30 realistic seed testimonials across 3 demo businesses** (`data/testimonials.json`) so the product looks alive the moment you open it.

---

## Revenue model

- **Free tier** — one collection page, up to 10 displayed testimonials. This is your acquisition funnel: businesses get value immediately and feel the 10-testimonial ceiling as they grow.
- **Pro tier — $49 one-time** — unlimited testimonials, featured sorting, and the embeddable widget. The widget is the natural upgrade trigger: the moment a business wants testimonials *on their own site*, they pay.

One-time pricing means **100% of revenue is collected upfront with zero churn**. At even a modest 50 sales/month that's ~$2,400/month in near-passive revenue against negligible hosting costs.

---

## Growth levers a new owner can pull

1. **Add recurring revenue.** Convert Pro into a low monthly plan, or layer a higher "Agency" tier (multiple businesses, team seats, remove branding) on top of the one-time Pro.
2. **Widget-driven virality.** Add a subtle "Powered by TestimonialKit" link in the free widget — every embed becomes a backlink and a lead source.
3. **More widget styles & themes.** Carousels, walls of love, single-quote spotlights, dark mode. Each new layout is an upsell and a marketing asset.
4. **Auto-request flow.** Email/SMS automations that ask customers for a testimonial after a purchase — among the most-requested features in this category.
5. **Video testimonials.** A premium tier capturing short video clips commands much higher pricing.
6. **Import & integrations.** Pull existing reviews from Google, Trustpilot, or G2; push testimonials to Webflow, Shopify, and WordPress with native plugins.
7. **SEO content engine.** "Testimonial request templates", "how to ask for a review" — high-intent, low-competition keywords that funnel straight into the free tier. The sitemap and metadata are already wired up.
8. **Lifetime deal launch.** List the Pro one-time deal on AppSumo or similar for a fast cash injection and a user base to upsell later.

---

## Project structure

```
app/
  page.tsx                     # Homepage + pricing
  collect/[businessId]/        # Public testimonial collection page
  widget/[businessId]/         # Embeddable widget
  dashboard/                   # Owner approval dashboard
  submit-success/              # Thank-you page
  api/
    submit/                    # Save a new submission
    approve/                   # Approve a pending submission
    checkout/                  # Create a Stripe Checkout session
    stripe-webhook/            # Verify Stripe events, send emails
    testimonials/              # Public read-only JSON API
  sitemap.ts / robots.ts       # SEO
components/                     # Reusable UI (cards, forms, buttons)
lib/                           # Data access, Stripe, email helpers
types/                         # Shared TypeScript types
data/                          # Seed + runtime JSON data
```

---

*Built with Next.js 14, TypeScript, and Tailwind CSS.*
