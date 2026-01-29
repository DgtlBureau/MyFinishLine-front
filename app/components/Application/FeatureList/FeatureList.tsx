import Feature from "./Feature/Feature";
import { IContract } from "@/app/types";
import { motion } from "motion/react";
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
    <ul className="grid grid-cols-2 gap-3 p-2">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
        >
          <Feature {...feature} />
        </motion.div>
      ))}
    </ul>
  );
}, areEqual);

export default FeatureList;
