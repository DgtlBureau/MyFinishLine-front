import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    console.log("email", email);
    await instance.post("/change-password", {
      email,
    });
    return NextResponse.json({
      status: 200,
      message: "Password was successfully reset",
    });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Service unavailable" },
      { status: 503 },
    );
  }
};
