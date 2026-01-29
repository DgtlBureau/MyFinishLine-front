"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import PersonalizationSkeleton from "@/app/components/PersonalizationList/PersonalizationSkeleton";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserSkins } from "@/app/lib/utils/userService";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [skins, setSkins] = useState([]);
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handleLoadSkins = async () => {
    setIsLoading(true);
    try {
      const data = await getUserSkins();
      setSkins(data.data);
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
    const savedSelectedSkin = user.selected_skin;
    try {
      dispatch(updateUser({ selected_skin: item }));
      await axios.post("/api/user/update-cosmetics", {
        contracts_skin_id: item.id,
      });
    } catch (error) {
      toast.error("Error updating skin");
      dispatch(updateUser({ selected_skin: savedSelectedSkin }));
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadSkins();
  }, []);

  if (skins.length) {
    return (
      <PersonalizationList
        type="skins"
        items={skins}
        handleSelectItem={handleSetActive}
        selectedId={user.selected_skin?.id}
      />
    );
  }

  if (isLoading) {
    return <PersonalizationSkeleton />;
  }

  return <span className="block text-center mt-8 text-white/50 text-sm">No skins available</span>;
};

export default page;
