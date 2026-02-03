import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code && code.length === 6 && /^\d+$/.test(code)) {
      const cookieStore = await cookies();

      cookieStore.set("user_authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60,
        path: "/",
      });

      cookieStore.set("user_email", "demo@example.com", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60,
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Email confirmed!",
        user: {
          email: "demo@example.com",
          isVerified: true,
        },
      });
    } else {
      throw new ApiError("Wrong code", HttpStatus.BAD_REQUEST);
    }
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/auth/verify");
  }
}
