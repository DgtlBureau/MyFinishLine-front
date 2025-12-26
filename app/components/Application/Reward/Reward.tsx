import { Medal } from "lucide-react";
import Image from "next/image";

interface IRewardProps {
  title: string;
  description: string;
  image: string;
}

const Reward = ({ title, description, image }: IRewardProps) => {
  return (
    <div>
      <div className="flex items-center justify-center h-32 w-32 bg-linear-to-b from-[#F4E8FD] to-[#C3B7E2] rounded-2xl">
        {image ? (
          <Image
            className="w-full h-full object-contain p-2"
            src={image}
            width={128}
            height={128}
            alt={`Reward ${title}`}
          />
        ) : (
          <Medal width={42} height={42} />
        )}
      </div>
      <span className="block mt-4 text-xl leading-7 font-medium">{title}</span>
      <p className="mt-2 text-muted-foreground leading-7 text-base max-w-60">
        {description}
      </p>
    </div>
  );
};

export default Reward;
