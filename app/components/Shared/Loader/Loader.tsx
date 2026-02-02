interface ILoaderProps {
  size?: number;
  color?: string;
}

const Loader = ({ size = 24, color = "#4DA67A" }: ILoaderProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
      className={`animate-spin border-3 border-neutral-400 rounded-full w-fit`}
    />
  );
};

export default Loader;
