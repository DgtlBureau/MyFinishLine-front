import CustomModal from "../../Shared/CustomModal/CustomModal";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddActivitityModalContent from "./AddActivitityModalContent/AddActivitityModalContent";
import { IActivity } from "@/app/types";

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
        className="ml-auto mr-0 rounded-full w-10 h-10"
      >
        <Plus width={40} height={40} />
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
