import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  console.log(
    "Callback received - code:",
    code ? "yes" : "no",
    "error:",
    error
  );

  if (error) {
    console.log("Auth error:", error);
    redirect("/?error=auth_denied");
  }

  if (!code) {
    console.log("No code received");
    redirect("/?error=no_code");
  }

  try {
    console.log("Exchanging code for token...");

    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", tokenData);
      redirect("/?error=token_failed");
    }

    console.log(
      "Token exchange successful for athlete:",
      tokenData.athlete?.firstname
    );

    const cookieStore = await cookies();

    // Устанавливаем cookies
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
    redirect("/homepage");
  } catch (error) {
    console.error("Callback error:", error);
    redirect("/?error=auth_failed");
  }
}
