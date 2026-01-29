import { ChallengeCardShimmer } from "../ChallengeCardShimmer/ChallengeCardShimmer";

const ChallengesShimmer = () => {
  return (
    <div className="flex flex-col justify-center px-2 pt-12 pb-4 rounded-tl-xl rounded-tr-xl relative max-w-4xl mx-auto">
      <div className="w-48 h-10 mx-auto rounded bg-[#E4E4E7] animate-pulse mb-4" />
      <ChallengeCardShimmer />
    </div>
  );
};

export default ChallengesShimmer;
