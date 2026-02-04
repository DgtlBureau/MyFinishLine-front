import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const GET = async () => {
  try {
    const { data } = await instance.get("paddle/shipping-rates");

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/payment/shipping-rates");
  }
};
