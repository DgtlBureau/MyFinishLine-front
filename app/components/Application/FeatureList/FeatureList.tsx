import Feature from "./Feature/Feature";
import { IContract } from "@/app/types";
import { AnimatePresence } from "motion/react";
import { memo } from "react";

interface IFeatureListProps {
  features: IContract[];
}

const areEqual = (
  prevProps: IFeatureListProps,
  nextProps: IFeatureListProps,
) => {
  let prevIdString = "";
  let nextIdString = "";
  prevProps.features.forEach((element) => {
    prevIdString += element;
  });
  nextProps.features.forEach((element) => {
    nextIdString += element;
  });
  return prevIdString === nextIdString;
};

const FeatureList = memo(({ features }: IFeatureListProps) => {
  return (
    <ul className="bg-linear-to-b from-[#CEE9D8] via-white to-[#CEE9D8] p-4 rounded-xl">
      {features.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </ul>
  );
}, areEqual);

export default FeatureList;
