import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/app/components/DashboardClient/DashboardClient";
import { IActivity } from "../types";
import LoggedLayout from "../components/LoggedLayout/LoggedLayout";

async function getAthleteData() {
  try {
    const cookieStore = await cookies();
    const athleteCookie = cookieStore.get("strava_athlete");
    const accessToken = cookieStore.get("strava_access_token")?.value;

    if (!athleteCookie || !accessToken) {
      return null;
    }

    return {
      athlete: JSON.parse(athleteCookie.value),
      accessToken: accessToken,
    };
  } catch (error) {
    console.error("Error getting athlete data:", error);
    return null;
  }
}

async function getActivities(accessToken: string) {
  if (!accessToken) return [];

  try {
    console.log("Fetching activities with token...");
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(
        "Activities fetch failed:",
        response.status,
        response.statusText
      );
      return [];
    }

    const activities = await response.json();
    const runs = activities.filter(
      (activity: IActivity) =>
        activity.type === "Run" || activity.sport_type === "Run"
    );

    console.log(`Found ${runs.length} running activities`);
    return runs;
  } catch (error) {
    console.error("Failed to load activities:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const userData = await getAthleteData();

  if (!userData) {
    console.log("No user data, redirecting to home");
    redirect("/");
  }

  const activities = await getActivities(userData.accessToken);

  return (
    <LoggedLayout>
      <DashboardClient athlete={userData.athlete} activities={activities} />
    </LoggedLayout>
  );
}
