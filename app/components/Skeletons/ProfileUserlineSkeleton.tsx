const ProfileUserlineSkeleton = () => {
  return (
    <section className="flex flex-col items-center px-4 pt-12 pb-4 relative max-w-4xl mx-auto">
      {/* Avatar skeleton */}
      <div className="w-36 h-36 rounded-full bg-white/15 animate-pulse" />

      {/* Name and Username skeleton */}
      <div className="mt-3 flex flex-col items-center gap-2">
        <div className="h-6 w-32 rounded bg-white/15 animate-pulse" />
        <div className="h-4 w-24 rounded bg-white/15 animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-4 py-3">
        <div className="flex items-start justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-20 rounded bg-white/15 animate-pulse" />
            <div className="h-6 w-12 rounded bg-white/15 animate-pulse" />
          </div>
          <div className="w-px h-12 bg-white/30 self-center" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-20 rounded bg-white/15 animate-pulse" />
            <div className="h-6 w-28 rounded bg-white/15 animate-pulse" />
          </div>
          <div className="w-px h-12 bg-white/30 self-center" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-24 rounded bg-white/15 animate-pulse" />
            <div className="h-6 w-8 rounded bg-white/15 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserlineSkeleton;
