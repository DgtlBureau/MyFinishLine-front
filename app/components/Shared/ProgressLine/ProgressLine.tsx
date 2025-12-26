interface IProgressLineProps {
  progress: number;
}

const ProgressLine = ({ progress }: IProgressLineProps) => {
  return (
    <div className="w-full h-4 flex items-center shadow-lg rounded-3xl relative bg-white">
      <div
        className={`flex items-center text-white justify-end pr-1 absolute h-3.5 left-0 rounded-3xl bg-linear-to-r from-[#F4E8FD] to-[#C3B7E2] text-[10px] font-medium leading-5`}
        style={{ width: `${progress}%` }}
      >
        {progress?.toFixed(1)}%
      </div>
    </div>
  );
};

export default ProgressLine;
