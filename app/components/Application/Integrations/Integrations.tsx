import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { updateUser } from "@/app/lib/features/user/userSlice";
import axios from "axios";
import CustomModal from "../../Shared/CustomModal/CustomModal";
import { useState } from "react";
import Image from "next/image";
import { linkFitbit } from "@/app/lib/utils/authWithFitbit";
import SheetContainer from "../../SheetContainer/SheetContainer";

const Integrations = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<"strava" | "fitbit">("strava");
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
      if (modalType === "fitbit") {
        const { data } = await axios.get("/api/user/disconnect-fitbit");
        dispatch(updateUser(data));
      } else {
        const { data } = await axios.get("/api/user/disconnect-strava");
        dispatch(updateUser(data));
      }
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
    setModalType("strava");
    if (user.has_strava_connect) {
      handleOpenModal();
    } else {
      handleConnectStrava();
    }
  };

  const handleClickFitbit = () => {
    setModalType("fitbit");
    if (user.has_fitbit_connect) {
      handleOpenModal();
    } else {
      linkFitbit();
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
          {user.has_strava_connect ? "Disconnect" : "Connect"} Strava
          {user.has_strava_connect && (
            <span className="text-success-dark font-light">connected</span>
          )}
        </div>
      </Button>
      <Button
        className="mt-2 h-fit w-full px-3 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-start gap-3"
        variant="outline"
        onClick={handleClickFitbit}
      >
        <Image
          src="/icons/fitbit.svg"
          width={16}
          height={16}
          alt="Fitbit icon"
        />
        <div className="flex items-center w-full justify-between">
          {user.has_fitbit_connect ? "Disconnect" : "Connect"} Fitbit
          {user.has_fitbit_connect && (
            <span className="text-success-dark font-light">connected</span>
          )}
        </div>
      </Button>
      <SheetContainer isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="max-w-lg mx-auto pb-5">
          <span className="block text-2xl text-center">
            Are you sure you want to disconnect{" "}
            <span className="capitalize">{modalType}</span>?
          </span>
          <div className="mt-4 pt-6 flex flex-col gap-2">
            <Button
              className="py-2"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                  Disconnecting...
                </>
              ) : (
                "Disconnect"
              )}
            </Button>
            <Button
              className="py-2"
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContainer>
    </>
  );
};

export default Integrations;
