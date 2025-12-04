import { STRAVA_CONFIG } from "@/app/lib/strava";
import { cookies } from "next/headers";

// Temporary debug version - replace your current GET function with this:
export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("strava_access_token")?.value;

    if (!accessToken) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const response = await fetch(
      `${STRAVA_CONFIG.apiUrl}/athlete/activities?per_page=30&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Activities API Error Response:", errorText);

      if (response.status === 401) {
        cookieStore.delete("strava_access_token");
        cookieStore.delete("strava_athlete");
        return Response.json({ error: "Token expired" }, { status: 401 });
      }
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }

    const activities = await response.json();

    return Response.json({
      activities: activities,
    });
  } catch (error) {
    console.error("Activities API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
