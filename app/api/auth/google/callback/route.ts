import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/google/callback";

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      return NextResponse.json(
        { error: "Token request failed", details: text },
        { status: 400 },
      );
    }

    const tokenData = await tokenRes.json();

    const payload = {
      provider: "google",
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token ?? null,
    };

    const { data } = await instance.post("/social-login", payload);

    return NextResponse.json({
      success: true,
      from_callback: true,
      ...payload,
      ...data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
