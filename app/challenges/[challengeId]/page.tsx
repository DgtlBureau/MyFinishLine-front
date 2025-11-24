import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import content from "@/app/lib/content/landing/content";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";

interface IChallengesPageProps {
  params: {
    challengeId: string;
  };
}

const page = async ({ params }: IChallengesPageProps) => {
  const challengeId = (await params).challengeId;

  const challenge = content.challenges.features.find(
    (challenge) => challenge.id === Number(challengeId)
  ) || {
    id: 0,
    title: "",
    description: "",
    distance: "",
    image: {
      src: "",
      alt: "",
      width: 0,
      height: 0,
      className: "",
    },
  };

  return (
    <>
      <LumenBackgroundBlock>
        <ChallengeHero
          id={challenge.id}
          title={challenge.title}
          description={challenge.description}
          image={challenge.image}
          distance={challenge.distance}
        />
      </LumenBackgroundBlock>
      <section className="mt-40">
        <ChallengeContent
          id={challenge.id}
          title={challenge.title}
          description={challenge.description}
          image={challenge.image}
        />
      </section>
    </>
  );
};

export default page;
