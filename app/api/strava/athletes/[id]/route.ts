import { STRAVA_CONFIG } from "@/app/lib/strava";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logger } from "@/app/lib/logger";
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    if (!id || id === "athletes" || id === "api") {
      return NextResponse.json(
        {
          error: "Athletes ID is required",
          debug: { pathParts, id, url: request.url },
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("strava_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const response = await fetch(
      `${STRAVA_CONFIG.apiUrl}/athletes/${id}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Strava API Error:`, errorText);

      if (response.status === 401) {
        cookieStore.delete("strava_access_token");
        cookieStore.delete("strava_athlete");
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }

      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const activity = await response.json();

    return NextResponse.json({
      success: true,
      data: activity,
      debug: { receivedId: id },
    });
  } catch (error: any) {
    logger.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
