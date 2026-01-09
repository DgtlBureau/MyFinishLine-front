import PersonalizationItem from "./PersonalizationItem/PersonalizationItem";

const PersonalizationList = ({
  items,
  handleSelectItem,
}: {
  items: any[];
  handleSelectItem: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
}) => {
  return (
    <ul className="grid grid-cols-2 gap-2 mt-2">
      {items.map((item) => (
        <PersonalizationItem
          key={item.id}
          {...item}
          handlePressSelect={handleSelectItem}
        />
      ))}
    </ul>
  );
};

export default PersonalizationList;
