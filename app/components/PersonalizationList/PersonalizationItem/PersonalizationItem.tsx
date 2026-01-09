import Image from "next/image";
import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "@/app/lib/features/user/userSlice";

interface IPersonalizationItemProps {
  id: number;
  image_url: string;
  title: string;
  description: string;
  handlePressSelect: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
}

const PersonalizationItem = ({
  id,
  title,
  image_url,
  description,
  handlePressSelect,
}: IPersonalizationItemProps) => {
  const { user } = useAppSelector((state) => state.user);

  console.log(user);

  const handleSelectSkin = () => {
    handlePressSelect({ id, title, image_url, description });
  };

  return (
    <li className="border-border border rounded-2xl p-4">
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
      {user.selected_skin?.id === id ? (
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
    </li>
  );
};

export default PersonalizationItem;
