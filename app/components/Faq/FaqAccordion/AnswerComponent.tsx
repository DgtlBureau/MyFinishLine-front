interface IAnswerProps {
  answer: {
    id: number;
    variant: string;
  }[];
  sub_answer?: string;
}

const renderBoldText = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary/90">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

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
          <li key={item.id}>{renderBoldText(item.variant)}</li>
        ))}
      </ol>
    </div>
  );
};
