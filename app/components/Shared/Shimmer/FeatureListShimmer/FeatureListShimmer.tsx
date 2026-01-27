const ShimmerFeature = () => (
  <li className="bg-white mt-1 rounded-xl overflow-hidden border border-border">
    <div className="flex flex-col h-[284px] gap-4 justify-between">
      <div className="flex gap-4 px-4 pt-4">
        <div>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#F4E8FD]">
            <div className="w-5 h-5 rounded bg-[#E4E4E7] animate-pulse" />
          </div>
          <div className="w-8 h-2.5 mt-1 mx-auto rounded bg-[#E4E4E7] animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-32 h-5 rounded bg-[#E4E4E7] animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-full h-3 rounded bg-[#E4E4E7] animate-pulse" />
            <div className="w-3/4 h-3 rounded bg-[#E4E4E7] animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-2 bg-linear-to-b from-[#F4E8FD00] to-[#C3B7E2] p-4">
        <div className="w-34 h-32 rounded-lg bg-[#E4E4E7] animate-pulse" />
        <div className="w-16 h-2.5 rounded bg-[#E4E4E7] animate-pulse" />
      </div>
    </div>
  </li>
);

const FeatureListShimmer = ({ rows = 3 }: { rows?: number }) => {
  return (
    <ul className="bg-linear-to-b from-[#F4E8FD] via-white to-[#F4E8FD] p-4 rounded-xl">
      {Array.from({ length: rows }, (_, i) => (
        <ShimmerFeature key={i} />
      ))}
    </ul>
  );
};

export default FeatureListShimmer;
