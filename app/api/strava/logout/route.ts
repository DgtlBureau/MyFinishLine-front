import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("strava_access_token");
  cookieStore.delete("strava_athlete");

  return NextResponse.json({ success: true });
}
