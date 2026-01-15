import { Button } from "../../ui/button";
import { motion } from "motion/react";
import Image from "next/image";

interface IPersonalizationItemProps {
  index: number;
  id: number;
  image_url: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: (value: string) => void;
  handlePressSelect: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
}

const PersonalizationItem = ({
  index,
  id,
  isSelected,
  title,
  image_url,
  description,
  handlePressSelect,
  onClick,
}: IPersonalizationItemProps) => {
  const handleSelectSkin = () => {
    handlePressSelect({ id, title, image_url, description });
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="border-border border gap-4 justify-between rounded-2xl w-full h-full p-4"
    >
      <div className="w-full h-fulloverflow-hidden">
        <span className="text-xs">{title}</span>
        <div className="w-full h-full aspect-square overflow-hidden rounded-[8px]">
          <Image
            className="w-full h-full object-cover"
            src={image_url}
            width={800}
            height={800}
            alt="Skin"
            onClick={() => {
              onClick(image_url);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col mt-[10px]">
        <p className="font-medium text-sm text-[#09090b]">{description}</p>
        {isSelected ? (
          <Button className="w-full mt-2" disabled variant="outline">
            Selected
          </Button>
        ) : (
          <Button
            className="w-full mt-2"
            type="button"
            onClick={handleSelectSkin}
          >
            Select
          </Button>
        )}
      </div>
    </motion.li>
  );
};

export default PersonalizationItem;
