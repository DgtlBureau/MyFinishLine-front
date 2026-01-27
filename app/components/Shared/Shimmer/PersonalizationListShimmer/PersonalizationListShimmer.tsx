const ShimmerPersonalizationItem = ({ height }: { height?: string }) => (
  <li className="border-border border rounded-2xl p-4">
    <div
      className={`w-full ${height ?? "h-50"} rounded-2xl mt-2 bg-[#E4E4E7] animate-pulse`}
    />
    <div className="w-3/4 h-4 mt-4 rounded bg-[#E4E4E7] animate-pulse" />
    <div className="w-full h-9 mt-2 rounded-md bg-[#E4E4E7] animate-pulse" />
  </li>
);

const PersonalizationListShimmer = ({
  items = 4,
  imageHeight,
}: {
  items?: number;
  imageHeight?: string;
}) => {
  return (
    <ul className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
      {Array.from({ length: items }, (_, i) => (
        <ShimmerPersonalizationItem key={i} height={imageHeight} />
      ))}
    </ul>
  );
};

export default PersonalizationListShimmer;
