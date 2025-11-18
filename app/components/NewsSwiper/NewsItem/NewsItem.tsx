import Image from "next/image";
import Link from "next/link";

interface INewsItemProps {
  id: number;
  image: string;
  title: string;
}

const NewsItem = ({ id, image, title }: INewsItemProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="relative flex items-end w-full h-60 rounded-sm bg-white border border-neutral-300 overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={70}
        className="object-cover rounded-sm z-0"
      />
      <div className="bg-neutral-900/75 text-white p-2 relative  w-full">
        <h2 className="text-sm font-bold  relative">{title}</h2>
      </div>
    </Link>
  );
};

export default NewsItem;
