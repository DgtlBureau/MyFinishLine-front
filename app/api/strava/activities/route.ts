import { STRAVA_CONFIG } from "@/app/lib/strava";
import { IActivity } from "@/app/types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const accessToken = cookieStore.get("strava_access_token")?.value;

    if (!accessToken) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const response = await fetch(
      `${STRAVA_CONFIG.apiUrl}/athlete/activities?per_page=30&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Токен истек - очищаем cookies
        cookieStore.delete("strava_access_token");
        cookieStore.delete("strava_refresh_token");
        cookieStore.delete("strava_athlete");
        return Response.json({ error: "Token expired" }, { status: 401 });
      }
      throw new Error("Failed to fetch activities");
    }

    const activities = await response.json();
    const runs = activities.filter(
      (activity: IActivity) =>
        activity.type === "Run" || activity.sport_type === "Run"
    );

    return Response.json({ activities: runs });
  } catch (error) {
    console.error("Activities API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
