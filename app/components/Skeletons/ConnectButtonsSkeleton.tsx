const ConnectButtonsSkeleton = () => {
  return (
    <section className="px-4 pb-4 w-full border-t border-white/20 pt-11">
      <div className="max-w-4xl mx-auto">
        <div className="h-6 w-3/4 mx-auto rounded bg-white/15 animate-pulse" />
        <div className="mt-5 max-w-25 w-full bg-white/20 h-px mx-auto" />
        <div className="mt-5 w-full h-[72px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 animate-pulse" />
        <div className="mt-3 w-full h-[72px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 animate-pulse" />
      </div>
    </section>
  );
};

export default ConnectButtonsSkeleton;
