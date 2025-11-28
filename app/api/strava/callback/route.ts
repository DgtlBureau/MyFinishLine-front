import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  console.log("Callback received - code:", code, "error:", error);

  if (error) {
    console.log("Auth error:", error);
    redirect("/myfinishline/profile/account/?error=auth_denied");
  }

  if (!code) {
    console.log("No code received");
    redirect("/myfinishline/profile/account/?error=no_code");
  }

  try {
    console.log("Exchanging code for token...");
    console.log("Client ID exists:", !!process.env.STRAVA_CLIENT_ID);
    console.log("Client Secret exists:", !!process.env.STRAVA_CLIENT_SECRET);

    const params = new URLSearchParams();
    params.append("client_id", process.env.STRAVA_CLIENT_ID!);
    params.append("client_secret", process.env.STRAVA_CLIENT_SECRET!);
    params.append("code", code);
    params.append("grant_type", "authorization_code");

    console.log("Making request to Strava...");

    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    // Get the raw response text
    const responseText = await tokenResponse.text();
    console.log("=== STRAVA RESPONSE ===");
    console.log("Status:", tokenResponse.status);
    console.log("Status Text:", tokenResponse.statusText);
    console.log("Response length:", responseText.length);
    console.log("First 500 chars:", responseText.substring(0, 500));
    console.log("=== END RESPONSE ===");

    // Check if response is HTML (error page)
    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html")
    ) {
      console.error("Strava returned HTML error page");
      // Log the full HTML for debugging
      console.error("Full HTML response:", responseText);
      redirect("/myfinishline/profile/account/?error=strava_html_error");
    }

    let tokenData;
    try {
      tokenData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Response that failed to parse:", responseText);
      redirect("/myfinishline/profile/account/?error=invalid_json");
    }

    // Check for Strava API errors
    if (tokenData.errors || !tokenResponse.ok) {
      console.error("Strava API error:", tokenData);
      redirect("/myfinishline/profile/account/?error=strava_api_error");
    }

    if (!tokenData.access_token) {
      console.error("No access token in response:", tokenData);
      redirect("/myfinishline/profile/account/?error=no_access_token");
    }

    console.log(
      "Token exchange successful for athlete:",
      tokenData.athlete?.firstname
    );

    const cookieStore = await cookies();

    cookieStore.set("strava_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60, // 6 hours
      path: "/",
    });

    cookieStore.set("strava_athlete", JSON.stringify(tokenData.athlete), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    console.log("Cookies set, redirecting to dashboard");
    redirect("/myfinishline/profile/strava");
  } catch (error) {
    console.error("Callback error:", error);
    redirect("/myfinishline/profile/account/?error=auth_failed");
  }
}
