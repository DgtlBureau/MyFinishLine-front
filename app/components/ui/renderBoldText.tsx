export const RenderBoldText = ({ text }: { text: string }) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] bg-clip-text text-transparent">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};
