"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserSkins } from "@/app/lib/utils/userService";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
        items={skins}
        handleSelectItem={handleSetActive}
        selectedId={user.selected_skin?.id}
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

  return <span className="block text-center mt-2">No skins available</span>;
};

export default page;
