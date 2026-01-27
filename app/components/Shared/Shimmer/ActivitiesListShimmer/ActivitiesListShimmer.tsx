const ShimmerActivity = () => (
  <li className="shadow-md border border-[#E4E4E7] overflow-hidden rounded-lg">
    <div className="px-4 pt-4 pb-2.5 flex items-center justify-between bg-[#F4E8FD]">
      <div className="flex flex-1 items-center gap-1">
        <div className="w-4 h-4 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-14 h-4 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="flex flex-1 justify-center items-center gap-1">
        <div className="w-4 h-4 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-14 h-4 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="flex flex-1 justify-end items-center gap-1">
        <div className="w-4 h-4 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-20 h-4 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
    </div>
    <div className="pt-2 px-2 sm:px-6 pb-6">
      <div className="flex gap-4 items-stretch">
        <div className="w-[80px] min-w-[80px] h-[80px] rounded-[12px] bg-[#E4E4E7] animate-pulse" />
        <div className="w-full flex flex-col justify-between">
          <div className="w-36 h-5 rounded bg-[#E4E4E7] animate-pulse" />
          <div className="w-full flex items-end justify-between flex-1 mt-2">
            <div className="w-20 h-2.5 rounded bg-[#E4E4E7] animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-[#E4E4E7] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </li>
);

const ActivitiesListShimmer = ({ rows = 3 }: { rows?: number }) => {
  return (
    <ul className="flex flex-col gap-5 pb-2">
      {Array.from({ length: rows }, (_, i) => (
        <ShimmerActivity key={i} />
      ))}
    </ul>
  );
};

export default ActivitiesListShimmer;
