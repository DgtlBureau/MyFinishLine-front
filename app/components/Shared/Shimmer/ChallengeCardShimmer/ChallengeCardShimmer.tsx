export const ChallengeCardShimmer = () => {
  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
      <div className="flex gap-3 items-start">
        <div className="w-[78px] h-[78px] shrink-0 rounded-lg bg-[#E4E4E7] animate-pulse" />
        <div className="w-full flex flex-col justify-between gap-2">
          <div className="w-40 h-5 rounded bg-[#E4E4E7] animate-pulse" />
          <div className="w-48 h-3.5 rounded bg-[#E4E4E7] animate-pulse" />
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          <div className="w-20 h-5 rounded-full bg-[#E4E4E7] animate-pulse" />
          <div className="w-24 h-3 rounded bg-[#E4E4E7] animate-pulse" />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <div className="w-full h-3.5 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-3/4 h-3.5 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="mt-6">
        <div className="w-full h-2.5 rounded-full bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="w-16 h-5 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-14 h-14 rounded-full bg-[#E4E4E7] animate-pulse" />
        <div className="w-10 h-5 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="w-full h-10 mt-8 rounded-lg bg-[#E4E4E7] animate-pulse" />
    </div>
  );
};