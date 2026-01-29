const ConnectButtonsSkeleton = () => {
  return (
    <section className="px-4 pb-4 w-full border-t border-[#DADADA] pt-11">
      <div className="max-w-4xl mx-auto">
        <div className="h-6 w-3/4 mx-auto rounded bg-gray-200 animate-shimmer" />
        <div className="mt-5 max-w-25 w-full bg-[#dadada] h-px mx-auto" />
        <div className="mt-5 w-full h-14 rounded-2xl bg-gray-200 animate-shimmer" />
        <div className="mt-5 w-full h-14 rounded-2xl bg-gray-200 animate-shimmer" />
      </div>
    </section>
  );
};

export default ConnectButtonsSkeleton;
