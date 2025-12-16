import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder,
  onBlur,
  className,
}: {
  value: string;
  options: { id: number; name: string }[];
  onChange: (option: { id: number; name: string }) => void;
  placeholder: string;
  onBlur?: () => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, innerText } = e.currentTarget;

    const newValue = { id: Number(value), name: innerText };
    setIsOpen(false);
    onBlur?.();
    onChange(newValue);
  };

  return (
    <div className={`z-10 flex h-[40px] w-full flex-col items-start bg-white`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`flex w-full cursor-pointer items-center justify-between rounded-t-md border-gray-300 p-2 ${
          isOpen
            ? "border-t border-r border-l"
            : "${className} rounded-b-md border"
        } ${isOpen ? "" : className}`}
        onBlur={() => onBlur?.()}
      >
        <span className={`text-md ${value ? "" : "text-gray-500"} `}>
          {value ? value : placeholder}
        </span>
        <ChevronDown
          width={16}
          height={16}
          className={`${
            isOpen ? "-rotate-180" : ""
          } transition-transform duration-300`}
        />
      </button>
      <ul
        className={`flex w-full flex-col items-start rounded-b-md border-gray-300 bg-white ${
          isOpen
            ? "h-fit border-r border-b border-l opacity-100"
            : "pointer-events-none h-0 opacity-0"
        } transition-all duration-300`}
      >
        {options.map((item) => (
          <li
            key={item.id}
            className="m-0 w-full items-start overflow-hidden p-0 last:rounded-b-md"
          >
            <button
              type="button"
              value={item.id}
              onClick={handleChange}
              className={`font-publicSans w-full cursor-pointer p-2 text-left text-sm ${
                value === item.name
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
