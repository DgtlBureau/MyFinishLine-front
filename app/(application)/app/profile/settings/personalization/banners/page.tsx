"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import { Modal } from "@/app/components/ui/modal/Modal";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserBanners } from "@/app/lib/utils/userService";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { XIcon } from "lucide-react";

const page = () => {
  const [banners, setBanners] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
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
    console.log("selected", item.id);

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

  const handleCloseModal = () => {
    setSelectedImg("");
  };

  useEffect(() => {
    handleLoadBanners();
  }, []);

  if (banners.length) {
    return (
      <>
        <PersonalizationList
          items={banners}
          handleSelectItem={handleSetActive}
          selectedId={user.selected_banner?.id}
          onClick={setSelectedImg}
        />
        {selectedImg && (
          <Modal onClose={handleCloseModal} maxWidth={800}>
            {
              <div className="relative rounded-[8px] p-4 bg-white">
                <button
                  type="button"
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <XIcon className="h-4 w-4 fill-gray-700 md:h-4 md:w-4" />
                </button>
                <Image
                  src={selectedImg}
                  width={1080}
                  height={800}
                  alt="w-full h-full max-w-full"
                />
              </div>
            }
          </Modal>
        )}
      </>
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
