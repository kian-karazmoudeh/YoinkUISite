import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature") || "";

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed. ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        // let user;
        // Ensure data.object is a Checkout.Session
        const sessionObject = data.object as Stripe.Checkout.Session;
        const session = await stripe.checkout.sessions.retrieve(
          sessionObject.id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session?.customer;
        let customer = null;
        if (typeof customerId === "string") {
          customer = await stripe.customers.retrieve(customerId);
        } else {
          throw new Error("Customer ID is missing or invalid");
        }
        const priceId =
          session?.line_items && session.line_items.data.length > 0
            ? session.line_items.data[0]?.price?.id
            : undefined;

        console.log(customer);
        console.log(priceId);
        // if (customer.email) {
        //   user = await User.findOne({ email: customer.email });

        //   if (!user) {
        //     user = await User.create({
        //       email: customer.email,
        //       name: customer.name,
        //       customerId,
        //     });

        //     await user.save();
        //   }
        // } else {
        //   console.error("No user found");
        //   throw new Error("No user found");
        // }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        // user.priceId = priceId;
        // user.hasAccess = true;
        // await user.save();

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)

        // const subscription = await stripe.subscriptions.retrieve(
        //   data.object.id
        // );
        // const user = await User.findOne({
        //   customerId: subscription.customer,
        // });

        // // Revoke access to your product
        // user.hasAccess = false;
        // await user.save();

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
