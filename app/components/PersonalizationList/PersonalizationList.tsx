import PersonalizationItem from "./PersonalizationItem/PersonalizationItem";

const PersonalizationList = ({
  items,
  selectedId,
  handleSelectItem,
  onClick,
}: {
  items: any[];
  selectedId: number | undefined;
  handleSelectItem: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
  onClick: (value: string) => void;
}) => {
  return (
    <ul className="grid grid-cols-2 gap-2 mt-2">
      {items.map((item, index) => (
        <PersonalizationItem
          key={item.id}
          {...item}
          index={index}
          isSelected={item.id === selectedId}
          handlePressSelect={handleSelectItem}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default PersonalizationList;
