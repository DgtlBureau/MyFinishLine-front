import SearchIcon from "@/public/icons/faq/search.svg";
import Image from "next/image";
import banner from "@/public/images/faq/header.webp";

export const FaqBanner = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center">
      <div className="absolute inset-0 bg-[url('@/public/images/faq/header.webp')] bg-cover bg-center" />
      <div className="z-10 flex flex-col items-center justify-center gap-3">
        <h1 className="z-10 text-xl font-semibold text-gray-700 md:text-2xl">
          How can we help
        </h1>
        <span className="px-4 text-center text-gray-600">
          or choose a category to quickly find the help you need
        </span>
        <div className="flex max-w-[428px] items-center justify-start gap-4 rounded-md border border-gray-300 bg-white p-2 px-4 placeholder:text-gray-500">
          <Image src={SearchIcon} width={16} height={16} alt="search icon" />
          <input
            type="text"
            placeholder="Search by question"
            value={search}
            onChange={(e) => setSearch(e)}
            className="w-[200px] outline-none md:w-[300px] placeholder:text-gray-400/70"
          />
        </div>
      </div>
    </div>
  );
};
