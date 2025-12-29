import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) throw new Error("No code provided");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: "https://dev.myfinishline.io/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "No access_token from Google" },
        { status: 400 }
      );
    }

    const payload = {
      provider: "google",
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token ?? null,
    };

    try {
      const { data } = await instance.post("/social-login", payload);

      const cookieStore = await cookies();
      cookieStore.set("auth_token", data.bearer_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return NextResponse.json({ success: true, from_auth: true, ...data });
    } catch (axiosErr: any) {
      console.error(
        "Backend /social-login error:",
        axiosErr.response?.data || axiosErr.message
      );
      return NextResponse.json(
        {
          error: "Backend login failed",
          details: axiosErr.response?.data || axiosErr.message,
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
