import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import instance from "@/app/lib/utils/instance";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword, code } = body;

    if (!email || !password || !confirmPassword || !code) {
      throw new ApiError("All fields are required", HttpStatus.BAD_REQUEST);
    }

    if (password !== confirmPassword) {
      throw new ApiError("Passwords do not match", HttpStatus.BAD_REQUEST);
    }

    if (password.length < 6) {
      throw new ApiError(
        "Password must be at least 6 characters",
        HttpStatus.BAD_REQUEST
      );
    }

    const response = await instance.post("/registration", {
      email,
      password,
      code,
    });

    if (response.data.bearer_token) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", response.data.bearer_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/auth/register");
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: HttpStatus.METHOD_NOT_ALLOWED }
  );
}
