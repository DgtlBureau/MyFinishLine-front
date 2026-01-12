import Feature from "./Feature/Feature";
import { IContract } from "@/app/types";
import { AnimatePresence } from "motion/react";
import { memo } from "react";

interface IFeatureListProps {
  features: IContract[];
}

const areEqual = (
  prevProps: IFeatureListProps,
  nextProps: IFeatureListProps
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
    <ul className="border border-border bg-linear-to-b from-[#F4E8FD] via-white to-[#F4E8FD] p-4 rounded-xl">
      {features.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </ul>
  );
}, areEqual);

export default FeatureList;
