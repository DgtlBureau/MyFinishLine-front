import { RenderBoldText } from "../../ui/renderBoldText";

interface IAnswerProps {
  answer: {
    id: number;
    variant: string;
  }[];
  sub_answer?: string;
}

export const AnswerComponent = ({ sub_answer, answer }: IAnswerProps) => {
  return (
    <div className="flex flex-col gap-[4px]">
      {sub_answer && <span className="">{sub_answer}</span>}
      <ol
        className={`flex flex-col gap-[2px] ${
          answer.length > 1
            ? "list-decimal list-inside marker:font-semibold"
            : ""
        }`}
      >
        {answer.map((item) => (
          <li key={item.id}>{<RenderBoldText text={item.variant} />}</li>
        ))}
      </ol>
    </div>
  );
};
