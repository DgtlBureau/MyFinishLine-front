import { IFeature } from "../FeatureList";
import { Star } from "lucide-react";

const Feature = ({ title, description }: IFeature) => {
  return (
    <li className="flex items-center gap-4 first:mt-0 mt-9">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shrink-0">
        <Star width={20} height={20} />
      </div>
      <div className="">
        <span className="font-medium leading-7 text-[#09090B]">{title}</span>
        <p className="mb-0 mt-auto text-muted-foreground leading-6">
          {description}
        </p>
      </div>
    </li>
  );
};

export default Feature;
