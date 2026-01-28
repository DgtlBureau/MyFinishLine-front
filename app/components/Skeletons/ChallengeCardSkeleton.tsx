const ChallengeCardSkeleton = () => {
  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-gradient-to-b from-[#5170D5] via-[#FBFBFB] to-[#CEE9D8]">
      <div className="flex gap-3 items-start">
        <div className="w-[78px] h-[78px] rounded-lg bg-gray-200 animate-shimmer shrink-0" />
        <div className="w-full flex flex-col justify-between gap-2">
          <div className="h-6 w-3/4 rounded bg-gray-200 animate-shimmer" />
          <div className="h-4 w-1/2 rounded bg-gray-200 animate-shimmer" />
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 animate-shimmer" />
        <div className="h-4 w-2/3 rounded bg-gray-200 animate-shimmer" />
      </div>
      <div className="mt-6 h-2 w-full rounded-full bg-gray-200 animate-shimmer" />
      <div className="flex justify-between items-center mt-8">
        <div className="h-6 w-20 rounded bg-gray-200 animate-shimmer" />
        <div className="w-16 h-16 rounded-full bg-gray-200 animate-shimmer" />
        <div className="h-6 w-16 rounded bg-gray-200 animate-shimmer" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
