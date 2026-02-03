import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import instance from "@/app/lib/utils/instance";
import { handleApiError } from "@/app/lib/api-error-handler";

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
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/auth/login");
  }
}
