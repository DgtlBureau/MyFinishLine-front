"use client";

import PersonalizationListWithPreview from "@/app/components/PersonalizationList/PersonalizationListWithPreview/PersonalizationListWithPreview";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserFrames } from "@/app/lib/utils/userService";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [frames, setFrames] = useState([]);
  const dispatch = useAppDispatch();

  const handleLoadFrames = async () => {
    setIsLoading(true);
    try {
      const data = await getUserFrames();
      setFrames(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetActive = async (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => {
    const savedSelectedFrame = user.selected_frame;
    try {
      dispatch(updateUser({ selected_frame: item }));
      await axios.post("/api/user/update-cosmetics", {
        contracts_frame_id: item.id,
      });
    } catch (error) {
      toast.error("Error updating frame");
      dispatch(updateUser({ selected_frame: savedSelectedFrame }));
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadFrames();
  }, []);

  if (frames.length) {
    return (
      <PersonalizationListWithPreview
        items={frames}
        handleSelectItem={handleSetActive}
        selectedId={user.selected_banner?.id}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <Loader2 width={48} height={48} className="animate-spin" />
      </div>
    );
  }

  return <span className="block text-center mt-2">No frames available</span>;
};

export default page;
