export const FaqBanner = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative flex h-[180px] w-full items-center justify-center pt-16">
      <div className="z-10 flex flex-col items-center justify-center gap-3">
        <h1 className="z-10 text-xl font-semibold text-white md:text-2xl">
          How can we help
        </h1>
        <span className="px-4 text-center text-white/70">
          or choose a category to quickly find the help you need
        </span>
      </div>
    </div>
  );
};
