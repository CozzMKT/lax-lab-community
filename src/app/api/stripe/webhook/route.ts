import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Lazy init — service role client only created at request time
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const uid = session.subscription_data?.metadata?.supabase_uid;
      if (uid) {
        await supabaseAdmin.from("profiles").update({
          subscription_status: "active",
          subscription_id: session.subscription as string,
        }).eq("id", uid);
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object;
      const uid = sub.metadata?.supabase_uid;
      if (uid) {
        await supabaseAdmin.from("profiles").update({
          subscription_status: sub.status,
          subscription_current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        }).eq("id", uid);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const uid = sub.metadata?.supabase_uid;
      if (uid) {
        await supabaseAdmin.from("profiles").update({
          subscription_status: "canceled",
          subscription_id: null,
        }).eq("id", uid);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
