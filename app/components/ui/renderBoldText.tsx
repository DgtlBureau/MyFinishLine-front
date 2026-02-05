export const RenderBoldText = ({ text }: { text: string }) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold bg-gradient-to-r from-[#6B8FE8] to-[#7FD89F] bg-clip-text text-transparent"
          style={{
            WebkitTextStroke: '0.5px rgba(107, 143, 232, 0.3)',
            paintOrder: 'stroke fill'
          }}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};
