import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { logger } from "@/app/lib/logger";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  logger.log("Callback received - code:", code, "error:", error);

  if (error) {
    logger.log("Auth error:", error);
    redirect("/app/profile/journey?status=auth_denied");
  }

  if (!code) {
    logger.log("No code received");
    redirect("/app/profile/journey?status=no_code");
  }

  let redirectUrl: string | null = null;

  try {
    logger.log("Client ID exists:", !!process.env.STRAVA_CLIENT_ID);
    logger.log("Client Secret exists:", !!process.env.STRAVA_CLIENT_SECRET);

    const params = new URLSearchParams();
    params.append("client_id", process.env.STRAVA_CLIENT_ID!);
    params.append("client_secret", process.env.STRAVA_CLIENT_SECRET!);
    params.append("code", code);
    params.append("grant_type", "authorization_code");

    logger.log("Making request to Strava...");

    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const responseText = await tokenResponse.text();
    logger.log("=== STRAVA RESPONSE ===");
    logger.log("Status:", tokenResponse.status);
    logger.log("Status Text:", tokenResponse.statusText);
    logger.log("Response length:", responseText.length);
    logger.log("First 500 chars:", responseText.substring(0, 500));
    logger.log("=== END RESPONSE ===");

    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html")
    ) {
      logger.error("Strava returned HTML error page");
      logger.error("Full HTML response:", responseText);
      return redirect("/app/profile/journey?status=strava_html_error");
    }

    let tokenData;
    try {
      tokenData = JSON.parse(responseText);
    } catch (parseError) {
      logger.error("JSON parse error:", parseError);
      logger.error("Response that failed to parse:", responseText);
      return redirect("/app/profile/journey?status=invalid_json");
    }

    if (tokenData.errors || !tokenResponse.ok) {
      logger.error("Strava API error:", tokenData);
      return redirect("/app/profile/journey?status=strava_api_error");
    }

    if (!tokenData.access_token) {
      logger.error("No access token in response:", tokenData);
      return redirect("/app/profile/journey?status=no_access_token");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.post(
      "/user/strava/connect",
      {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    cookieStore.set("strava_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60,
      path: "/",
    });

    redirectUrl = `/app/profile/journey?data=${encodeURIComponent(
      JSON.stringify(data)
    )}`;
  } catch (error) {
    logger.error("Callback error:", error);
    return redirect("/app/profile/journey?error=strava_callback_failed");
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}
