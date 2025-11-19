interface ILoaderProps {
  size?: number;
  color?: string;
}

const Loader = ({ size = 24, color = "#ff8904" }: ILoaderProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
      className={`animate-spin border-3 border-neutral-400 rounded-full`}
    ></div>
  );
};

export default Loader;
