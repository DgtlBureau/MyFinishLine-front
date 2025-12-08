import Image from "next/image";
import Link from "next/link";
import ProgressLine from "../Shared/ProgressLine/ProgressLine";

type Props = {};

const ChallengeCard = (props: Props) => {
  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
      <div className="flex gap-3">
        <Image
          className="shrink-0"
          src="/images/application/challenge1.png"
          alt="Challenge 1"
          width={78}
          height={78}
        />
        <div className="w-full flex flex-col justify-between">
          <h5 className="mt-2.5 text-lg font-medium leading-7 text-[#09090B]">
            Amazonia Route
          </h5>
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">649 km</span>
            <Link
              href="homepage"
              className="underline font-semibold text-[10px] text-black"
            >
              Go to map
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-8 text-sm leading-5 text-muted-foreground">
        We are traveling around South America to find some treasures!
      </p>
      <div className="mt-6">
        <ProgressLine progress={70} />
      </div>
      <div className="flex justify-between mt-8">
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          523 km
        </span>
        <div className="relative flex items-center justify-center rounded-full max-w-30 max-h-30 bg-linear-to-b from-[#EEDFBA] to-[#CBA76D] p-1">
          <div className="bg-white w-full h-full rounded-full">
            <Image
              className="px-4 pb-3 w-full object-contain h-full"
              src="/images/application/medal.png"
              width={1080}
              height={1080}
              alt="Medal"
            />
          </div>
        </div>
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          41.7 hrs
        </span>
      </div>
    </div>
  );
};

export default ChallengeCard;
