import Challenges from "../components/Challenges/Challenges";
import LoggedLayout from "../components/LoggedLayout/LoggedLayout";
import NewsSwiper from "../components/NewsSwiper/NewsSwiper";
import Block from "../components/Shared/Block/Block";
import Stories from "../components/Stories/Stories";
import Trophies from "../components/Trophies/Trophies";

const Homepage = () => {
  return (
    <LoggedLayout>
      <main className="flex flex-col gap-6">
        <Stories />
        <Block title="Челленджи" link="/challenges">
          <Challenges />
        </Block>
        <Block title="Новости" link="/news">
          <NewsSwiper />
        </Block>
        <Block title="Мои награды">
          <Trophies />
        </Block>
      </main>
    </LoggedLayout>
  );
};

export default Homepage;
