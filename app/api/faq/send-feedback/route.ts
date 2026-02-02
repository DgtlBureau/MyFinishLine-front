import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const POST = async (req: NextRequest) => {
  try {
    const { email, question, category, user_id, phone } = await req.json();
    const { data } = await instance.post("/feedback", {
      email,
      type_id: category,
      question,
      ...(user_id ? { user_id } : {}),
      ...(phone ? { phone } : {}),
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/faq/send-feedback");
  }
};
