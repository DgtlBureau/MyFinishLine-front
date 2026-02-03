import { NextRequest, NextResponse } from "next/server";
import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      throw new ApiError("All fields are required", HttpStatus.BAD_REQUEST);
    }

    const response = await instance.post("/send-code", {
      email,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/auth/send-code");
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: HttpStatus.METHOD_NOT_ALLOWED }
  );
}
