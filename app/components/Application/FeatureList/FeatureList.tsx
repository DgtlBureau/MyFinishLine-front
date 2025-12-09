import React from "react";
import Feature from "./Feature/Feature";

export interface IFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface IFeatureListProps {
  features: IFeature[];
}

const FeatureList = ({ features }: IFeatureListProps) => {
  return (
    <ul className="bg-linear-to-b from-[#F4E8FD] via-white to-[#F4E8FD] p-4 rounded-lg sm:p-8">
      {features.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </ul>
  );
};

export default FeatureList;
