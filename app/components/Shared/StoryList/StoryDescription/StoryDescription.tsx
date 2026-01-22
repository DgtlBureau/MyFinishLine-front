interface IStoryDescriptionProps {
  currentStoryNumber: number;
  storiesAmount: number;
  text: string;
}

const StoryDescription = ({
  currentStoryNumber,
  storiesAmount,
  text,
}: IStoryDescriptionProps) => {
  return (
    <div className="absolute bottom-0 z-100 left-0 right-0 bg-black/75 backdrop-blur-md">
      <div className="relative block h-full max-w-270 mx-auto pt-2 px-2 pb-9">
        <div className="absolute bottom-1 right-2 w-fit z-100 flex gap-1 bg-black/50 px-3 py-1.5 rounded-full text-white text-xs">
          {currentStoryNumber} / {storiesAmount}
        </div>
        <p className="text-white text-lg text-center font-medium">{text}</p>
      </div>
    </div>
  );
};

export default StoryDescription;
