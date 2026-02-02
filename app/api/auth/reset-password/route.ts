import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    await instance.post("/change-password", {
      email,
    });
    return NextResponse.json({
      status: 200,
      message: "Password was successfully reset",
    });
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/auth/reset-password");
  }
};
