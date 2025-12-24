import { IContract } from "@/app/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const areEqual = (prevProps: IContract, nextProps: IContract) => {
  return prevProps.id === nextProps.id;
};

const Feature = memo(({ name, description, image_url }: IContract) => {
  return (
    <li className="flex gap-4 mt-1 bg-white rounded-xl p-4">
      <div>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shrink-0 border border-[#F4E8FD]">
          {image_url ? (
            <Image src={image_url} alt="Feature image" width={40} height={40} />
          ) : (
            <Star width={20} height={20} />
          )}
        </div>
        <div className="mx-auto mt-2 w-fit p-1 py-px bg-[#FFA600] rounded-lg font-medium text-[8px] text-center text-white">
          2 days
        </div>
      </div>
      <div className="">
        <span className="font-medium leading-7 text-[#09090B]">{name}</span>
        <p className="mb-0 mt-auto text-muted-foreground leading-6">
          {description}
        </p>
      </div>
    </li>
  );
}, areEqual);

export default Feature;
