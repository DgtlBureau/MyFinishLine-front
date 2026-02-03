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
  viewOnly = false,
}: {
  items: PersonalizationItemType[];
  type: "frames" | "skins" | "banners" | "cards";
  selectedId: number | undefined;
  handleSelectItem: (item: {
    id: number;
    title: string;
    image_url: string | null;
    description: string;
  }) => void;
  viewOnly?: boolean;
}) => {
  return (
    <ul className="grid grid-cols-2 gap-3 mt-3 auto-rows-fr">
      {items.map((item, index) => (
        <PersonalizationItem
          key={item.id}
          type={type}
          {...item}
          index={index}
          isSelected={!viewOnly && item.id === selectedId}
          handlePressSelect={viewOnly ? undefined : handleSelectItem}
          viewOnly={viewOnly}
        />
      ))}
    </ul>
  );
};

export default PersonalizationList;
