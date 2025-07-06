import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") || "";
  let event;
  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed. ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
  const data = event.data;
  const eventType = event.type;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const sessionObject = data.object as Stripe.Checkout.Session;

    switch (eventType) {
      case "checkout.session.completed": {
        // console.log(sessionObject);
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        // Ensure data.object is a Checkout.Session

        const clientReferenceId = sessionObject.client_reference_id;
        if (clientReferenceId) {
          const { error } = await supabase
            .from("profiles")
            .update({
              membership: "premium",
              customer_id: sessionObject.customer,
            })
            .eq("id", clientReferenceId);

          if (error) {
            console.error("Failed to update membership:", error.message);
            throw new Error("Failed to update membership");
          }
        } else {
          console.error("client_reference_id is missing in session");
          throw new Error("client_reference_id is missing in session");
        }

        break;
      }
      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const subscription = await stripe.subscriptions.retrieve(
          sessionObject.id
        );
        const { error } = await supabase
          .from("profiles")
          .update({ membership: "free" })
          .eq("customer_id", subscription.customer);

        if (error) {
          console.error("Failed to cancel membership:", error.message);
          throw new Error("Failed to cancel membership");
        }
        break;
      }
      default:
      // Unhandled event type
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(
      "stripe error: " + errorMessage + " | EVENT TYPE: " + eventType
    );
  }
  return NextResponse.json({});
}
