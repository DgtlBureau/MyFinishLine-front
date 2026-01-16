"use client";

import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserBanners } from "@/app/lib/utils/userService";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PersonalizationListWithPreview from "@/app/components/PersonalizationList/PersonalizationListWithPreview/PersonalizationListWithPreview";

const page = () => {
  const [banners, setBanners] = useState([]);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAppSelector((state) => state.user);

  const handleLoadBanners = async () => {
    setIsLoading(true);
    try {
      const data = await getUserBanners();
      setBanners(data.data);
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
    const savedSelectedBanner = user.selected_banner;
    try {
      dispatch(updateUser({ selected_banner: item }));
      await axios.post("/api/user/update-cosmetics", {
        contracts_banner_id: item.id,
      });
    } catch (error) {
      toast.error("Error updating banner");
      dispatch(updateUser({ selected_banner: savedSelectedBanner }));
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadBanners();
  }, []);

  if (banners.length) {
    return (
      <PersonalizationListWithPreview
        items={banners}
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

  return <span className="block text-center mt-2">No banners available</span>;
};

export default page;
