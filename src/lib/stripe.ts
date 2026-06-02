import Stripe from "stripe";

// Lazy init so build doesn't fail without env vars
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}
// Keep named export for compatibility
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as never)[prop as keyof Stripe];
  },
});

export const PLANS = {
  monthly: {
    name: "Lax Lab Elite",
    price: 149,
    interval: "month" as const,
    priceId: process.env.STRIPE_PRICE_ID!,
    features: [
      "Full Drill Library (26+ drills with video)",
      "Offensive Skills Foundation Program",
      "D1 Recruiting Roadmap",
      "Weekly Live Coaching Calls",
      "Private Community Access",
      "Direct Coach Messaging",
      "Leaderboard & Challenges",
      "Upcoming Camps Info",
    ],
  },
} as const;
