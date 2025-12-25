import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, text, category } = await req.json();
    const { data } = await instance.post("/feedback", {
      email,
      type_id: category,
      question: text,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.response?.data.message,
    });
  }
};
