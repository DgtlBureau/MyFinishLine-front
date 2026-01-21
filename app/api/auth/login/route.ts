import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import instance from "@/app/lib/utils/instance";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await instance.post("/login", {
      email,
      password,
    });
    const { data } = await instance.post(
      "/user/set-init",
      {},
      {
        headers: {
          Authorization: "Bearer " + response.data.bearer_token,
        },
      },
    );

    if (response.data.bearer_token) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", response.data.bearer_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      const { token, ...userData } = response.data;
      return NextResponse.json({ ...userData, set_init: data });
    }

    return NextResponse.json({ ...response.data, set_init: true });
  } catch (error: any) {
    console.error("Login API error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data?.message || "Authentication failed",
          error: error.response.data?.error || "authentication_error",
          ...error.response.data,
        },
        { status: error.response.status },
      );
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return NextResponse.json(
        {
          message: "Cannot connect to backend service",
          error: "service_unavailable",
        },
        { status: 503 },
      );
    }

    // Handle timeout
    if (error.code === "ECONNABORTED") {
      return NextResponse.json(
        {
          message: "Request timeout. Please try again.",
          error: "timeout_error",
        },
        { status: 408 },
      );
    }

    // Default error
    return NextResponse.json(
      {
        message: "Internal server error",
        error: "internal_error",
      },
      { status: 500 },
    );
  }
}
