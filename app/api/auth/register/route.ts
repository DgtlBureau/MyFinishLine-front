import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import instance from "@/app/lib/utils/instance";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword, code } = body;

    console.log(body);

    if (!email || !password || !confirmPassword || !code) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const response = await instance.post("/registration", {
      email,
      password,
      code,
    });

    console.log("response", response);

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
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Service unavailable" },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
