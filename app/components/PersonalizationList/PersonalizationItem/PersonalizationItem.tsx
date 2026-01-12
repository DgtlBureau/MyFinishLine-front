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
}: IPersonalizationItemProps) => {
  const handleSelectSkin = () => {
    handlePressSelect({ id, title, image_url, description });
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="border-border border rounded-2xl p-4"
    >
      <span className="text-xs">{title}</span>
      <Image
        className="w-full bg-[#d9d9d9] rounded-2xl mt-2"
        src={image_url}
        width={300}
        height={300}
        alt="Skin"
      />
      <p className="block mt-4 font-medium text-sm text-[#09090b]">
        {description}
      </p>
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
    </motion.li>
  );
};

export default PersonalizationItem;
