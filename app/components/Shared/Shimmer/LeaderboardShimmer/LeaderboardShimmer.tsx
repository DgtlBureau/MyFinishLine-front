const ShimmerRow = () => (
  <li className="flex items-center justify-between p-4 not:last:border-b not:last:border-[#DADADA]">
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[#E4E4E7] animate-pulse" />
      <div className="w-12.5 h-12.5 flex items-center justify-center">
        <div className="w-10 h-10 rounded-lg bg-[#E4E4E7] animate-pulse" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-20 h-3 rounded bg-[#E4E4E7] animate-pulse" />
        <div className="w-12 h-2.5 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
    </div>
    <div className="flex flex-col items-end gap-1">
      <div className="w-10 h-2 rounded bg-[#E4E4E7] animate-pulse" />
      <div className="w-8 h-2 rounded bg-[#E4E4E7] animate-pulse" />
    </div>
  </li>
);

const LeaderboardShimmer = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="bg-linear-to-b from-[#F4E8FD] via-[#FFFFFF] to-[#F4E8FD] border border-[#E4E4E7] rounded-xl overflow-hidden">
      <ul>
        {Array.from({ length: rows }, (_, i) => (
          <ShimmerRow key={i} />
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardShimmer;
