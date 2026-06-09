import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  cached = new Resend(key);
  return cached;
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendArgs): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }
  await getResend().emails.send({ from, to, subject, html });
}

/** Confirmation email sent to a customer after a successful Pro purchase. */
export function proPurchaseCustomerEmail(): { subject: string; html: string } {
  return {
    subject: "Welcome to TestimonialKit Pro 🎉",
    html: `
      <div style="font-family:sans-serif;line-height:1.6;color:#0f172a">
        <h2>You're on Pro!</h2>
        <p>Thanks for upgrading to TestimonialKit Pro. Your account now includes:</p>
        <ul>
          <li>Unlimited testimonials</li>
          <li>Featured testimonial sorting</li>
          <li>The embeddable widget for any website</li>
        </ul>
        <p>Head back to your dashboard to start collecting and displaying testimonials.</p>
        <p style="color:#64748b">— The TestimonialKit team</p>
      </div>
    `,
  };
}

/** Notification email sent to the owner when a Pro purchase completes. */
export function proPurchaseOwnerEmail(customerEmail: string, amount: string): {
  subject: string;
  html: string;
} {
  return {
    subject: "💰 New TestimonialKit Pro purchase",
    html: `
      <div style="font-family:sans-serif;line-height:1.6;color:#0f172a">
        <h2>New Pro purchase</h2>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <p><strong>Amount:</strong> ${amount}</p>
      </div>
    `,
  };
}
