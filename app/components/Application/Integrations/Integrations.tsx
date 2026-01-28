import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { updateUser } from "@/app/lib/features/user/userSlice";
import axios from "axios";
import Image from "next/image";
import { linkFitbit } from "@/app/lib/utils/authWithFitbit";
import SwipeToUnlock from "../../Shared/SwipeToUnlock/SwipeToUnlock";

const Integrations = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleConnectStrava = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/link`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  const handleDisconnectStrava = async () => {
    try {
      const { data } = await axios.get("/api/user/disconnect-strava");
      dispatch(updateUser(data));
    } catch (error) {
      console.error("Error disconnecting Strava:", error);
    }
  };

  const handleDisconnectFitbit = async () => {
    try {
      const { data } = await axios.get("/api/user/disconnect-fitbit");
      dispatch(updateUser(data));
    } catch (error) {
      console.error("Error disconnecting Fitbit:", error);
    }
  };

  return (
    <div className="space-y-2 mb-2">
      <SwipeToUnlock
        onUnlock={handleConnectStrava}
        onDisconnect={handleDisconnectStrava}
        label="Swipe the slider to the right to connect Strava"
        disconnectLabel="Swipe the slider to the right to disconnect Strava"
        isConnected={user.has_strava_connect}
        serviceName="Strava"
        icon={
          <div className="p-2 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm">
            <div className="w-14 h-14 relative rounded-xl overflow-hidden">
              <Image
                src="/icons/strava.svg"
                fill
                alt="Strava"
                className="object-cover"
              />
            </div>
          </div>
        }
      />

      <SwipeToUnlock
        onUnlock={() => linkFitbit()}
        onDisconnect={handleDisconnectFitbit}
        label="Swipe the slider to the right to connect Fitbit"
        disconnectLabel="Swipe the slider to the right to disconnect Fitbit"
        isConnected={user.has_fitbit_connect}
        serviceName="Fitbit"
        icon={
          <div className="p-2 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm">
            <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-[#00B0B9] flex items-center justify-center">
              <Image
                src="/icons/fitbit.svg"
                width={32}
                height={32}
                alt="Fitbit"
                className="invert"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Integrations;
