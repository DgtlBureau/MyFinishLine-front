import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import content from "@/app/lib/content/landing/content";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import Image from "next/image";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface IChallenge {
  id: number;
  title: string;
  description: string;
  icon?: any;
  distance: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  };
  content: {
    id: number;
    title: string;
    image: string;
    paragraphs: { id: number; text: string }[];
  }[];
}

interface IChallengesPageProps {
  params: {
    challengeId: string;
  };
}

const page = async ({ params }: IChallengesPageProps) => {
  const challengeId = (await params).challengeId;

  // @ts-ignore
  const challenge: IChallenge = content.challenges.features.find(
    (challenge) => challenge.id === Number(challengeId)
  ) || {
    id: 0,
    title: "",
    description: "",
    distance: "",
    icon: undefined,
    content: [],
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
        <ChallengeContent content={challenge.content} />
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute size-full mask-t-from-50% mask-t-to-100% mask-b-from-50% mask-b-to-90%">
          <div
            className={cn(
              "bg-chart-2 absolute size-full rounded-full blur-3xl will-change-transform",
              "top-0 left-0 -translate-y-1/3 md:-translate-x-1/3 md:translate-y-0"
            )}
          />
          <div
            className={cn(
              "bg-chart-3 absolute size-full rounded-full blur-3xl will-change-transform",
              "right-0 bottom-0 translate-y-1/3 md:top-0 md:translate-x-1/3 md:translate-y-0"
            )}
          />
        </div>
        <div className="relative w-full py-10 flex items-center justify-center">
          <PurchaseChallenge
            title={challenge.title}
            id={challenge.id}
            imageSrc={challenge.image.src}
          />
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default page;
