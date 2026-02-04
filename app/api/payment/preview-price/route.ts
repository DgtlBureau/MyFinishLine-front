import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { data } = await instance.post("paddle/preview-price", body);

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/payment/preview-price");
  }
};
