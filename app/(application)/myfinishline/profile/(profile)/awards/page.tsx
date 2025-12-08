import AwardsList from "@/app/components/Application/AwardsList/AwardsList";
import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard";

const page = () => {
  return (
    <section>
      <h2 className="mt-10 font-medium text-3xl leading-9 text-[#09090B] text-center">
        My Journey
      </h2>
      <div className="mt-8">
        <ChallengeCard />
      </div>
    </section>
  );
};

export default page;
