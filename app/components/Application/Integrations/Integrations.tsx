import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { updateUser } from "@/app/lib/features/user/userSlice";
import axios from "axios";
import CustomModal from "../../Shared/CustomModal/CustomModal";
import { useState } from "react";

const Integrations = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/user/disconnect-strava");
      dispatch(updateUser(data));
      handleCloseModal();
    } catch (error) {
      console.error("Error logging out from Strava:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectStrava = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/link`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  const handleClickStrava = () => {
    if (user.has_strava_connect) {
      handleOpenModal();
    } else {
      handleConnectStrava();
    }
  };

  return (
    <>
      <Button
        className="h-fit w-full px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-start gap-3"
        variant="outline"
        onClick={handleClickStrava}
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
        <div className="flex items-center w-full justify-between">
          {user.has_strava_connect ? "Disconnect Strava" : "Connect Strava"}
          {user.has_strava_connect && (
            <span className="text-success-dark font-light">connected</span>
          )}
        </div>
      </Button>
      <Button
        className="mt-2 h-fit w-full px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-start gap-3"
        variant="outline"
        onClick={() => { }}
      >
        <svg fill="#000" viewBox="0 0 24 24">
          <g>
            <path d="M22.017 22.67H1.984c-.77 0-1.388-.383-1.694-1.002-.387-.61-.387-1.39 0-2.002L10.304 2.33c.385-.615 1.002-1 1.695-1 .77 0 1.386.385 1.69 1l10.02 17.336c.387.617.387 1.39 0 2.002-.31.695-.927 1.002-1.693 1.002z"></path>
          </g>
        </svg>
        <div className="flex items-center w-full justify-between">
          Connect Fitbit
          <span>WIP</span>
        </div>
      </Button>
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <span className="block text-2xl text-center">
          Are you sure you want to disconnect Strava?
        </span>
        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                Disconnecting...
              </>
            ) : (
              "Disconnect"
            )}
          </Button>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export default Integrations;
