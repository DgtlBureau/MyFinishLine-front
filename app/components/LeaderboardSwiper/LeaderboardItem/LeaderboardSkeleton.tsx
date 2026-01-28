const SkeletonRow = ({ index }: { index: number }) => {
  const getMedalStyle = () => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-amber-200/50 to-yellow-100/30 border-l-4 border-l-amber-400";
      case 1:
        return "bg-gradient-to-r from-gray-200/50 to-slate-100/30 border-l-4 border-l-gray-400";
      case 2:
        return "bg-gradient-to-r from-orange-200/50 to-amber-100/30 border-l-4 border-l-orange-400";
      default:
        return "bg-white/30";
    }
  };

  return (
    <li
      className={`flex items-center justify-between px-3 py-3 border-b border-white/30 ${getMedalStyle()}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-7 h-7 rounded-full bg-white/40 animate-shimmer shrink-0" />
        <div className="w-14 h-14 rounded-full bg-white/40 animate-shimmer shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="w-28 h-4 rounded bg-white/40 animate-shimmer" />
          <div className="w-14 h-3 rounded bg-white/40 animate-shimmer" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 ml-3">
        <div className="w-20 h-4 rounded bg-white/40 animate-shimmer" />
        <div className="w-12 h-3 rounded bg-white/40 animate-shimmer" />
      </div>
    </li>
  );
};

interface LeaderboardSkeletonProps {
  count?: number;
}

const LeaderboardSkeleton = ({ count = 7 }: LeaderboardSkeletonProps) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] overflow-hidden">
      <ul>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonRow key={index} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardSkeleton;
