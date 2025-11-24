import { challenges } from "../data/challenges";
import Challenge from "../components/Challenges/Challenge/Challenge";
import LoggedLayout from "../components/LoggedLayout/LoggedLayout";

const page = () => {
  return (
    <LoggedLayout>
      <div className="px-4 flex flex-col gap-4 max-w-3xl mx-auto">
        <span className="w-fit uppercase font-mono tracking-wide text-2xl text-black font-semibold">
          Челленджи
        </span>
        <ul className="">
          {challenges.map((challenge) => (
            <li key={challenge.id}>
              <Challenge {...challenge} />
            </li>
          ))}
        </ul>
      </div>
    </LoggedLayout>
  );
};

export default page;
