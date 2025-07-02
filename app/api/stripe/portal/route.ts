import { DOMAIN } from "@/utils/getDomain";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
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

  try {
    const customerList = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    const customer = customerList.data[0];
    if (!customer) {
      return NextResponse.json(
        { error: "Stripe customer not found" },
        { status: 404 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${DOMAIN}/`,
    });

    return NextResponse.redirect(session.url || "/404");
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
