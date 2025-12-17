import { CircleQuestionMark } from "lucide-react";

export const FaqCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-[5px]">
        <CircleQuestionMark
          width={16}
          height={16}
          fill="var(--color-secondary)"
          className=""
        />
      </div>
      <div>
        <h2 className="flex items-center gap-2 text-sm font-medium">
          {question}
        </h2>
        <p className="text-sm">{answer}</p>
      </div>
    </div>
  );
};
