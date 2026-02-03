"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { Button } from "@/app/components/ui/button";
import { Suspense } from "react";
import axios from "axios";

import { logger } from "@/app/lib/logger";
function StravaIntegrationButton() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/disconnect-strava");
      dispatch(updateUser({ has_strava_connect: false }));
    } catch (error) {
      logger.error("Error logging out from Strava:", error);
    }
  };

  const handleConnectStrava = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/callback`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  const handleClickStrava = () => {
    if (user.has_strava_connect) {
      handleLogout();
    } else {
      handleConnectStrava();
    }
  };

  return (
    <>
      <Button
        className={`mt-4 h-fit w-full py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-start gap-3`}
        variant="outline"
        onClick={handleClickStrava}
      >
        <svg className="h-10! w-10!" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
        <div className="flex items-center w-full justify-between">
          {user.has_strava_connect ? "Disconnect Strava" : "Connect Strava"}
          {user.has_strava_connect && (
            <span className="text-success-dark font-light">connected</span>
          )}
        </div>
      </Button>
    </>
  );
}

const page = () => {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h3 className="text-left text-2xl font-semibold">Integrations</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Integrate your Strava and Garmin accounts to track your progression
      </p>
      <Suspense fallback={null}>
        <StravaIntegrationButton />
      </Suspense>
      <Button
        className={`mt-4 h-fit w-full py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-start gap-3`}
        variant="outline"
        onClick={() => {}}
      >
        <svg className="h-10! w-10!" fill="#000000" viewBox="0 0 24 24">
          <g>
            <path d="M22.017 22.67H1.984c-.77 0-1.388-.383-1.694-1.002-.387-.61-.387-1.39 0-2.002L10.304 2.33c.385-.615 1.002-1 1.695-1 .77 0 1.386.385 1.69 1l10.02 17.336c.387.617.387 1.39 0 2.002-.31.695-.927 1.002-1.693 1.002z"></path>
          </g>
        </svg>
        <div className="flex items-center w-full justify-between">
          Connect FitBit
          <span>WIP</span>
        </div>
      </Button>
    </main>
  );
};

export default page;
