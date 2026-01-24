import { Medal } from "lucide-react";
import Image from "next/image";

interface IRewardProps {
  title: string;
  description: string;
  isLegendary: boolean;
  rewards: { id: number; contract_id: number; image_url: string }[];
}

const Reward = ({ title, description, isLegendary, rewards }: IRewardProps) => {
  const rewardImage = rewards?.[0]?.image_url;

  return (
    <div>
      <div
        className={`flex items-center justify-center h-32 w-32 bg-cover bg-center rounded-2xl ${isLegendary ? "bg-[url('/images/application/legendary.png')]" : "bg-[url('/images/application/common.png')]"}`}
      >
        {rewardImage ? (
          <Image
            className="w-full h-full object-contain p-2"
            src={rewardImage}
            width={128}
            height={128}
            alt={`Reward ${title}`}
          />
        ) : (
          <Medal width={42} height={42} />
        )}
      </div>
      <span className="block mt-4 text-md leading-7 font-medium">{title}</span>
      <p className="mt-2 text-[#71717A] text-sm max-w-60">{description}</p>
    </div>
  );
};

export default Reward;
