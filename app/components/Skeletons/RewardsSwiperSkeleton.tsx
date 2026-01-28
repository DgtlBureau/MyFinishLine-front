const RewardCardSkeleton = () => {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-100">
      <div className="h-5 w-3/4 rounded bg-gray-200 animate-shimmer" />
      <div className="h-4 w-full mt-2 rounded bg-gray-200 animate-shimmer" />
      <div className="mt-4 w-full h-24 rounded-lg bg-gray-200 animate-shimmer" />
    </div>
  );
};

const RewardsSwiperSkeleton = () => {
  return (
    <section className="bg-[#F4F4F5] pt-10">
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between px-4">
          <div className="h-8 w-56 rounded bg-gray-300 animate-shimmer" />
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-shimmer" />
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-shimmer" />
          </div>
        </div>
        <div className="mt-8 pb-4 flex gap-4 px-4 overflow-hidden">
          <div className="min-w-[45%]">
            <RewardCardSkeleton />
          </div>
          <div className="min-w-[45%]">
            <RewardCardSkeleton />
          </div>
        </div>
        <div className="h-4 w-16 ml-auto mr-4 mt-2 rounded bg-gray-200 animate-shimmer" />
      </section>
    </section>
  );
};

export default RewardsSwiperSkeleton;
