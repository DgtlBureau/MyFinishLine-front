interface IProgressLineProps {
  progress: number;
}

const ProgressLine = ({ progress }: IProgressLineProps) => {
  return (
    <div className="w-full h-6 flex items-center shadow-lg rounded-3xl relative bg-white p-1">
      <div
        className={`flex items-center text-white justify-end pr-1 absolute h-5 left-0 rounded-3xl bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] border-r-2 border-[#996515] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1)]`}
        style={{ width: `${progress}%` }}
      >
        <span
          className="block absolute text-[13px] w-fit font-bold leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          style={
            progress < 15
              ? { left: "calc(100% + 4px)", color: "#996515" }
              : { right: 4, color: "white" }
          }
        >
          {progress?.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressLine;
