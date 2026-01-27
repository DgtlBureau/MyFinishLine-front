const ShimmerReward = () => (
  <div className="px-4">
    <div className="h-32 w-32 rounded-2xl bg-[#E4E4E7] animate-pulse" />
    <div className="w-28 h-5 mt-4 rounded bg-[#E4E4E7] animate-pulse" />
    <div className="flex flex-col gap-1 mt-2">
      <div className="w-48 h-3.5 rounded bg-[#E4E4E7] animate-pulse" />
      <div className="w-36 h-3.5 rounded bg-[#E4E4E7] animate-pulse" />
    </div>
  </div>
);

const RewardsSwiperShimmer = ({ slides = 2 }: { slides?: number }) => {
  return (
    <section className="bg-[#F4F4F5] pt-10">
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between px-4">
          <div className="w-64 h-8 rounded bg-[#E4E4E7] animate-pulse" />
        </div>
        <div className="flex mt-8 pb-4">
          {Array.from({ length: slides }, (_, i) => (
            <ShimmerReward key={i} />
          ))}
        </div>
        <div className="flex justify-end p-4">
          <div className="w-14 h-4 rounded bg-[#E4E4E7] animate-pulse" />
        </div>
      </section>
    </section>
  );
};

export default RewardsSwiperShimmer;
