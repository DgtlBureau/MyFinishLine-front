import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const POST = async (req: NextRequest) => {
  try {
    const { stripe_price_id } = await req.json();

    const { data } = await instance.get("/stripe/payment-url", {
      params: {
        products: [
          {
            price_id: stripe_price_id,
            quantity: 1,
          },
        ],
      },
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/payment/order");
  }
};
