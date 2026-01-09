"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { getUserBanners } from "@/app/lib/utils/userService";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [banners, setBanners] = useState([]);
  const dispatch = useAppDispatch();

  const handleLoadBanners = async () => {
    try {
      const data = await getUserBanners();
      setBanners(data.data);
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
        contracts_banner_id: item.id,
      });
      dispatch(updateUser({ selected_banner: item }));
    } catch (error) {
      toast.error("Error updating banner");
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadBanners();
  }, []);

  if (banners.length) {
    return (
      <PersonalizationList items={banners} handleSelectItem={handleSetActive} />
    );
  }

  return <span className="block text-center mt-2">No banners available</span>;
};

export default page;
