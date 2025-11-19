import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: Request) {
  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "paymentIntentId is required" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    console.log("Payment intent canceled:", paymentIntent.id);

    return NextResponse.json({
      success: true,
      message: "Payment intent was successfully closed",
      status: paymentIntent.status,
      id: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Error cancelling payment intent:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
