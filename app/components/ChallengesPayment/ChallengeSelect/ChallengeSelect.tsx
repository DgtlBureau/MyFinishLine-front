import Image from "next/image";
import { ChangeEvent } from "react";

interface IChallengeSelectProps<T> {
  isChecked: boolean;
  imageSrc: string;
  price: string | number;
  title: string;
  value: string;
  onChange: (value: T) => void;
}

const ChallengeSelect = <T,>({
  isChecked,
  imageSrc,
  price,
  title,
  value,
  onChange,
}: IChallengeSelectProps<T>) => {
  const handlePress = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <label
      className={`border border-neutral-300 rounded p-4 relative flex-1 flex flex-col justify-end hover:bg-accent transition-all ${
        isChecked && "border-orange-400 shadow-xl"
      }`}
    >
      <Image
        className="mx-auto object-contain max-h-25 h-full w-fit"
        src={imageSrc}
        height={400}
        width={600}
        sizes="100%"
        alt="Challenge 1"
      />
      <span className="font-bold text-sm text-right mt-4">${price}</span>
      <span className="text-center text-sm mt-2 flex-1">{title}</span>
      <input
        className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10"
        type="radio"
        name="challenge"
        value={value}
        checked={isChecked}
        onChange={handlePress}
      />
      <div className="border border-neutral-300 w-8 h-8 rounded-full absolute top-2 right-2 flex items-center justify-center">
        {isChecked && <div className="w-5 h-5 bg-orange-400 rounded-full" />}
      </div>
    </label>
  );
};

export default ChallengeSelect;
