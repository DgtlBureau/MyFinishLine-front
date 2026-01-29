const StatBlockShimmer = () => (
  <div className="px-2 flex flex-col items-center gap-1">
    <div className="w-12 h-4 rounded bg-[#E4E4E7] animate-pulse" />
    <div className="w-10 h-2.5 rounded bg-[#E4E4E7] animate-pulse" />
  </div>
);

const ProfileUserlineShimmer = () => {
  return (
    <section className="flex justify-between px-2 pt-12 pb-4 rounded-tl-xl rounded-tr-xl relative max-w-4xl mx-auto">
      <div className="flex gap-4 relative items-end">
        {/* Avatar placeholder */}
        <div className="flex items-center justify-center relative w-32 h-32">
          <div className="w-32 h-32 rounded-full bg-[#E4E4E7] animate-pulse" />
        </div>

        <div className="flex flex-col justify-end gap-2">
          {/* Name and username */}
          <div className="flex flex-col gap-1">
            <div className="w-28 h-4 rounded bg-[#E4E4E7] animate-pulse" />
            <div className="w-20 h-3 rounded bg-[#E4E4E7] animate-pulse" />
          </div>

          {/* Stats */}
          <div className="flex items-stretch">
            <div className="border-r border-neutral-400">
              <StatBlockShimmer />
            </div>
            <div className="border-r border-neutral-400">
              <StatBlockShimmer />
            </div>
            <StatBlockShimmer />
          </div>
        </div>
      </div>

      {/* Talisman placeholder */}
      <div className="self-start w-20 h-20 rounded-lg bg-[#E4E4E7] animate-pulse" />
    </section>
  );
};

export default ProfileUserlineShimmer;
