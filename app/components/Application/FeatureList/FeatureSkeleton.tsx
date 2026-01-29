const SkeletonItem = () => {
  return (
    <li className="bg-white/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/30">
      <div className="flex flex-col p-3 pb-4">
        {/* Header skeleton */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="h-4 w-3/4 rounded bg-gray-200/60 animate-shimmer" />
        </div>

        {/* Image skeleton */}
        <div className="flex items-center justify-center mb-3">
          <div className="w-24 h-24 rounded-xl bg-gray-200/60 animate-shimmer" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-gray-200/60 animate-shimmer mx-auto" />
          <div className="h-3 w-2/3 rounded bg-gray-200/60 animate-shimmer mx-auto" />
        </div>
      </div>
    </li>
  );
};

interface FeatureSkeletonProps {
  count?: number;
}

const FeatureSkeleton = ({ count = 4 }: FeatureSkeletonProps) => {
  return (
    <ul className="grid grid-cols-2 gap-3 p-2 mt-2">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </ul>
  );
};

export default FeatureSkeleton;
