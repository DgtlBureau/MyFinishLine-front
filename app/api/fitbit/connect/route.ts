import instance from "@/app/lib/utils/instance";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (body.token) {
      return NextResponse.json({
        access_token: body.token,
        success: true,
      });
    }

    if (body.code) {
      const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID || "23TW5R";
      const clientSecret = process.env.FITBIT_CLIENT_SECRET!;
      const redirectUri =
        body.redirect_uri || "http://localhost:3000/auth/fitbit/callback";

      const { data } = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code: body.code,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
          },
        },
      );

      if (data.access_token) {
        cookieStore.set("fitbit_access_token", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
        cookieStore.set("fitbit_refresh_token", data.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        if (token) {
          const { data: linkData } = await instance.post(
            "/user/fitbit/connect",
            {
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            },
          );
          return NextResponse.json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
            message: "FitBit connected successfully",
            status: 200,
            user: linkData,
          });
        } else {
          const { data: connectData } = await instance.post("/social-login", {
            provider: "fitbit",
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });

          if (connectData.bearer_token) {
            cookieStore.set("auth_token", connectData.bearer_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            });

            return NextResponse.json({
              status: 200,
              message: "Logged in successfully",
              user: connectData.user,
            });
          }
        }
      }
    }

    return NextResponse.json(
      { error: "No token or code provided" },
      { status: 400 },
    );
  } catch (error: any) {
    console.error("Fitbit connect error:", error.response.data);
    return NextResponse.json(
      { error: error.response.data.message || "Server error" },
      { status: 500 },
    );
  }
}
