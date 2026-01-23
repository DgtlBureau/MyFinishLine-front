import CustomModal from "../../Shared/CustomModal/CustomModal";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddActivitityModalContent from "./AddActivitityModalContent/AddActivitityModalContent";
import { IActivity } from "@/app/types";
import Image from "next/image";

const AddActivityModal = ({
  handleAddActivity,
}: {
  handleAddActivity: (activity: IActivity) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="ml-auto mr-0 rounded-full w-10 h-10 p-2.5"
      >
        <Image
          className="w-full"
          src="/icons/navigation-add.svg"
          width={24}
          height={24}
          alt="Add activity"
        />
      </Button>
      <CustomModal isOpen={isOpen} onClose={handleCloseModal}>
        <AddActivitityModalContent
          onClose={handleCloseModal}
          handleAddActivity={handleAddActivity}
        />
      </CustomModal>
    </>
  );
};

export default AddActivityModal;
