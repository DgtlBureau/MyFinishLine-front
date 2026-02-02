import { STRAVA_CONFIG } from "@/app/lib/strava";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logger } from "@/app/lib/logger";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  logger.log("Callback received:", { code, error });

  if (error) {
    return NextResponse.redirect(new URL("/?error=auth_denied", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    const tokenResponse = await fetch(STRAVA_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: STRAVA_CONFIG.clientId,
        client_secret: STRAVA_CONFIG.clientSecret,
        code: code,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      logger.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(
        new URL("/?error=token_failed", request.url)
      );
    }

    logger.log("Token exchange successful");

    const cookieStore = await cookies();

    cookieStore.set("strava_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    });

    cookieStore.set("strava_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("strava_athlete", JSON.stringify(tokenData.athlete), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    logger.log("Cookies set, redirecting to homepage");
    return NextResponse.redirect(new URL("/homepage", request.url));
  } catch (error) {
    logger.error("Callback error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
