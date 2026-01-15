"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import { Modal } from "@/app/components/ui/modal/Modal";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserSkins } from "@/app/lib/utils/userService";
import axios from "axios";
import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [skins, setSkins] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
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
      <>
        <PersonalizationList
          items={skins}
          handleSelectItem={handleSetActive}
          selectedId={user.selected_skin?.id}
          onClick={setSelectedImg}
        />
        {selectedImg && (
          <Modal onClose={() => setSelectedImg("")} maxWidth={500}>
            {
              <div className="relative rounded-[8px] p-4 bg-white">
                <button
                  type="button"
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={() => setSelectedImg("")}
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

  return <span className="block text-center mt-2">No skins available</span>;
};

export default page;
