"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { getUserFrames } from "@/app/lib/utils/userService";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [frames, setFrames] = useState([]);
  const dispatch = useAppDispatch();

  const handleLoadFrames = async () => {
    try {
      const data = await getUserFrames();
      setFrames(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetActive = async (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => {
    try {
      await axios.post("/api/user/update-cosmetics", {
        contracts_frame_id: item.id,
      });
      dispatch(updateUser({ selected_frame: item }));
    } catch (error) {
      toast.error("Error updating frame");
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadFrames();
  }, []);

  if (frames.length) {
    return (
      <PersonalizationList items={frames} handleSelectItem={handleSetActive} />
    );
  }

  return <span className="block text-center mt-2">No frames available</span>;
};

export default page;
