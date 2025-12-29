import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.response?.data.message,
    });
  }
};
