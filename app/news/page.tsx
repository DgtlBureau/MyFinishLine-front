import LoggedLayout from "../components/LoggedLayout/LoggedLayout";
import NewsItem from "../components/NewsSwiper/NewsItem/NewsItem";
import { news } from "../data/news";

const page = () => {
  return (
    <LoggedLayout>
      <div className="px-4 flex flex-col gap-4 max-w-3xl mx-auto">
        <span className="w-fit uppercase font-mono tracking-wide text-2xl text-black font-semibold">
          Новости
        </span>
        <ul className="">
          {news.map((item) => (
            <li key={item.id}>
              <NewsItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </LoggedLayout>
  );
};

export default page;
