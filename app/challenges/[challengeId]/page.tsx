import Map from "@/app/components/Map/Map";
import Trophy from "@/app/components/Trophies/Trophy/Trophy";
import { challenges } from "@/app/data/challenges";
import Image from "next/image";
import React from "react";

interface IChallengesPageProps {
  params: {
    challengeId: string;
  };
}

const page = async ({ params }: IChallengesPageProps) => {
  const challengeId = (await params).challengeId;

  const challenge = challenges.find(
    (challenge) => challenge.id === Number(challengeId)
  );

  return (
    <article className="text-black">
      <div className="h-80 max-w-3xl mx-auto w-full">
        <div className="z-10 w-full flex justify-center">
          <h3 className="w-fit uppercase font-mono tracking-wide text-2xl text-black font-semibold">
            {challenge?.title}
          </h3>
        </div>
        <div className="relative h-[300px]">
          <Image
            src={challenge?.image || ""}
            fill
            alt={`Challenge ${challenge?.title}`}
            className="object-cover "
          />
        </div>
        <p className="p-4">{challenge?.description}</p>
        <section className="px-4">
          <span className="font-bold">Трофеи</span>
          <ul className="mt-2">
            <li className="relative max-w-20">
              <Trophy title="Петр I" rating={3} />
            </li>
          </ul>
        </section>
        <Map coordinates={challenge?.coordinates} />
      </div>
    </article>
  );
};

export default page;
