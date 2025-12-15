"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState } from "react";

interface IAthlete {
  badge_type_id: number;
  bio: null | string;
  city: string;
  country: string;
  created_at: string;
  firstname: string;
  follower: null | string;
  friend: null | string;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string;
  profile_medium: string;
  resource_state: number;
  sex: string;
  state: string;
  summit: boolean;
  updated_at: string;
  username: string;
  weight: null | number;
}

const page = () => {
  const [stravaData, setStravaData] = useState<{
    isConnected: boolean;
    athlete?: IAthlete;
  }>({
    athlete: {} as IAthlete,
    isConnected: false,
  });

  const handleStravaLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/callback`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/strava/logout", {
        method: "POST",
      });
      if (response.status === 200) {
        setStravaData({ isConnected: false });
      }
    } catch (error) {
      console.error("Error logging out from Strava:", error);
    }
  };

  const handleGetStravaUser = async () => {
    try {
      const response = await fetch("/api/strava/user");
      const data = await response.json();
      setStravaData(data);
    } catch (error) {
      console.error("Error fetching Strava user data:", error);
    }
  };

  useEffect(() => {
    handleGetStravaUser();
  }, []);

  return (
    <div>
      {stravaData.athlete?.id && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Strava Athlete Info:</h3>
          <Input
            className="mt-2"
            readOnly
            value={stravaData.athlete.username}
          />
          <Input
            className="mt-2"
            readOnly
            value={stravaData.athlete.firstname}
          />
          <Input
            className="mt-2"
            readOnly
            value={stravaData.athlete.lastname}
          />
          <Input
            className="mt-2"
            readOnly
            value={stravaData.athlete.country + ", " + stravaData.athlete.city}
          />
        </div>
      )}
      <Button
        variant="outline"
        onClick={stravaData.isConnected ? handleLogout : handleStravaLogin}
        className="mt-2 w-full py-3 px-6 font-semibold cursor-pointer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
        {stravaData.isConnected ? "Logout from Strava" : "Connect with Strava"}
      </Button>
    </div>
  );
};

export default page;
