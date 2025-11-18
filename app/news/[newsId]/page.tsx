import { notFound } from "next/navigation";
import Image from "next/image";
import { news } from "@/app/data/news";

interface INewsPageProps {
  params: {
    newsId: string;
  };
}

const NewsPage = async ({ params }: INewsPageProps) => {
  const newsId = (await params).newsId;
  const newsItem = news.find((item) => item.id === Number(newsId));

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white min-h-screen overflow-hidden">
        <div className="relative h-96">
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6">
          <time className="text-gray-500 text-sm">
            {new Date(newsItem.date).toLocaleDateString("ru-RU")}
          </time>

          <h1 className="text-3xl font-bold mt-2 mb-4">{newsItem.title}</h1>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">{newsItem.description}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsPage;
