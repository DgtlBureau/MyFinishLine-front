import CustomModal from "../../Shared/CustomModal/CustomModal";
import PersonalizationList from "../PersonalizationList";
import { useState } from "react";
import Image from "next/image";

const PersonalizationListWithPreview = (props: {
  items: any[];
  selectedId: number | undefined;
  handleSelectItem: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
}) => {
  const [clickedImageUrl, setClickedImageUrl] = useState("");

  const handleCloseModal = () => {
    setClickedImageUrl("");
  };
  return (
    <>
      <PersonalizationList {...props} onClick={setClickedImageUrl} />

      <CustomModal isOpen={!!clickedImageUrl} onClose={handleCloseModal}>
        <Image
          className="w-full h-full object-cover"
          src={clickedImageUrl}
          width={1080}
          height={800}
          alt="Personalization item"
        />
      </CustomModal>
    </>
  );
};

export default PersonalizationListWithPreview;
