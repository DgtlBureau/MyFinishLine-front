const SkeletonItem = () => {
  return (
    <li className="bg-white mt-1 rounded-xl overflow-hidden border border-border">
      <div className="flex flex-col h-[284px] gap-4 justify-between">
        <div className="flex gap-4 px-4 pt-4">
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-200 animate-shimmer" />
            <div className="w-10 h-3 mt-1 rounded bg-gray-200 animate-shimmer" />
          </div>
          <div className="flex-1">
            <div className="h-6 w-3/4 rounded bg-gray-200 animate-shimmer" />
            <div className="h-4 w-full mt-2 rounded bg-gray-200 animate-shimmer" />
            <div className="h-4 w-2/3 mt-1 rounded bg-gray-200 animate-shimmer" />
          </div>
        </div>
        <div className="flex items-center flex-col gap-2 mt-2 bg-gradient-to-b from-transparent to-[#E8E0F0] p-4">
          <div className="w-32 h-32 rounded-lg bg-gray-200 animate-shimmer" />
          <div className="w-20 h-3 rounded bg-gray-200 animate-shimmer" />
        </div>
      </div>
    </li>
  );
};

interface FeatureSkeletonProps {
  count?: number;
}

const FeatureSkeleton = ({ count = 3 }: FeatureSkeletonProps) => {
  return (
    <ul className="bg-gradient-to-b from-[#CEE9D8] via-white to-[#CEE9D8] p-4 rounded-xl mt-2">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </ul>
  );
};

export default FeatureSkeleton;
