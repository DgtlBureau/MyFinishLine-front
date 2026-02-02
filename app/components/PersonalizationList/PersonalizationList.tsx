import PersonalizationItem from "./PersonalizationItem/PersonalizationItem";
import { ICosmetic } from "@/app/types";

interface PersonalizationItemType extends ICosmetic {
  title: string;
  description: string;
}

const PersonalizationList = ({
  items,
  type,
  selectedId,
  handleSelectItem,
}: {
  items: PersonalizationItemType[];
  type: "frames" | "skins" | "banners";
  selectedId: number | undefined;
  handleSelectItem: (item: {
    id: number;
    title: string;
    image_url: string | null;
    description: string;
  }) => void;
}) => {
  return (
    <ul className="grid grid-cols-2 gap-3 mt-3 auto-rows-fr">
      {items.map((item, index) => (
        <PersonalizationItem
          key={item.id}
          type={type}
          {...item}
          index={index}
          isSelected={item.id === selectedId}
          handlePressSelect={handleSelectItem}
        />
      ))}
    </ul>
  );
};

export default PersonalizationList;
