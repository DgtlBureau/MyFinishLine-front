const ChallengeCardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
      <div className="flex gap-3 items-start">
        <div className="w-[78px] h-[78px] rounded-lg bg-white/15 animate-pulse shrink-0" />
        <div className="w-full flex flex-col justify-between gap-2">
          <div className="h-6 w-3/4 rounded bg-white/15 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-white/15 animate-pulse" />
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="h-4 w-full rounded bg-white/15 animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-white/15 animate-pulse" />
      </div>
      <div className="mt-6 h-2 w-full rounded-full bg-white/15 animate-pulse" />
      <div className="flex justify-between items-center mt-8">
        <div className="h-6 w-20 rounded bg-white/15 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-white/15 animate-pulse" />
        <div className="h-6 w-16 rounded bg-white/15 animate-pulse" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
