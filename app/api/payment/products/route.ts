import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { data } = await instance.get("paddle/products");

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching Stripe products:", error);

    let errorMessage = "Failed to fetch products";
    let statusCode = 500;
    let errorCode = "PRODUCTS_FETCH_ERROR";

    if (error.response) {
      const { status, data } = error.response;

      statusCode = status || 500;
      errorMessage =
        data?.message || data?.error || "Failed to fetch products from Stripe";
      errorCode = data?.code || "STRIPE_API_ERROR";

      if (status === 401 || status === 403) {
        errorMessage = "Authentication error when accessing Stripe products";
        errorCode = "STRIPE_AUTH_ERROR";
      } else if (status === 404) {
        errorMessage = "Stripe products endpoint not found";
        errorCode = "ENDPOINT_NOT_FOUND";
      } else if (status === 429) {
        errorMessage = "Too many requests to Stripe API";
        errorCode = "RATE_LIMITED";
      }
    } else if (error.request) {
      errorMessage = "Stripe service is unreachable. Please try again later.";
      errorCode = "STRIPE_SERVICE_UNAVAILABLE";
      statusCode = 503;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request to Stripe timed out";
      errorCode = "STRIPE_TIMEOUT";
      statusCode = 408;
    } else if (error.message?.includes("Network Error")) {
      errorMessage = "Network error. Cannot connect to Stripe.";
      errorCode = "NETWORK_ERROR";
      statusCode = 503;
    } else if (error.message?.includes("Stripe")) {
      errorMessage = `Stripe error: ${error.message}`;
      errorCode = "STRIPE_ERROR";
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: errorCode,
        timestamp: new Date().toISOString(),
        path: "/stripe/products",
        ...(process.env.NODE_ENV === "development" && {
          debug: error.message,
          stack: error.stack,
        }),
      },
      { status: statusCode },
    );
  }
};
