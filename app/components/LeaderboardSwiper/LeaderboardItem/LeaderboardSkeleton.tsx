const SkeletonRow = ({ index }: { index: number }) => {
  const getMedalStyle = () => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-amber-100 to-yellow-50 border-l-4 border-l-amber-400";
      case 1:
        return "bg-gradient-to-r from-gray-100 to-slate-50 border-l-4 border-l-gray-400";
      case 2:
        return "bg-gradient-to-r from-orange-100 to-amber-50 border-l-4 border-l-orange-400";
      default:
        return "bg-white";
    }
  };

  return (
    <li
      className={`flex items-center justify-between px-3 py-2.5 border-b border-gray-100 ${getMedalStyle()}`}
    >
      <div className="flex items-center gap-2 flex-1">
        <div className="w-7 h-7 rounded-full bg-gray-200 animate-shimmer shrink-0" />
        <div className="w-11 h-11 rounded-lg bg-gray-200 animate-shimmer shrink-0" />
        <div className="flex flex-col gap-1 flex-1">
          <div className="w-24 h-3.5 rounded bg-gray-200 animate-shimmer" />
          <div className="w-12 h-2.5 rounded bg-gray-200 animate-shimmer" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-2">
        <div className="w-16 h-3.5 rounded bg-gray-200 animate-shimmer" />
        <div className="w-10 h-2.5 rounded bg-gray-200 animate-shimmer" />
      </div>
    </li>
  );
};

interface LeaderboardSkeletonProps {
  count?: number;
}

const LeaderboardSkeleton = ({ count = 7 }: LeaderboardSkeletonProps) => {
  return (
    <div className="bg-gradient-to-b from-[#CEE9D8] via-white to-[#CEE9D8] border border-[#E4E4E7] rounded-xl overflow-hidden">
      <ul>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonRow key={index} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardSkeleton;
