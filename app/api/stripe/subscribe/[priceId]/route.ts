import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import { DOMAIN } from "@/utils/getDomain";

const priceIds =
  process.env.NODE_ENV === "development"
    ? ["price_1RfeKRF3W42U01iFyeGDGH6J", "price_1RfeKRF3W42U01iFbTRrmxLo"] // testing
    : ["price_1RgLagF3W42U01iFr3wdwkgl", "price_1RgLbSF3W42U01iFSVKUMbGC"]; // production

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ priceId: string }> }
) {
  const { priceId } = await params;
  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/authenticate";
    url.searchParams.set("next", btoa(request.nextUrl.pathname));
    return NextResponse.redirect(url);
  }

  if (!priceIds.includes(priceId)) {
    return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // or 'subscription' if the price is recurring
      line_items: [
        {
          price: priceId, // Replace with your actual Price ID
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: user.id,
      success_url: `${DOMAIN}/thanks`,
      cancel_url: `${DOMAIN}/pricing`,
    });

    // console.log(session.client_reference_id);

    return NextResponse.redirect(session.url || "/404");
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
