import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("strava_access_token")?.value;
    const athleteCookie = cookieStore.get("strava_athlete")?.value;

    if (!accessToken || !athleteCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const athlete = JSON.parse(athleteCookie);

    return NextResponse.json({
      athlete,
      isConnected: true,
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
