import type { JSX } from "react";
import type { ComponentType, SVGProps } from "react";

interface FaqMenuProps {
  options: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  }[];
  selectedCategory: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  };

  onClick: (category: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  }) => void;
}

export const FaqMenu = ({
  options,
  selectedCategory,
  onClick,
}: FaqMenuProps): JSX.Element => {
  const handleClick = (category: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  }) => {
    onClick(category);
  };

  return (
    <div className="flex w-full flex-col flex-wrap gap-2">
      {options.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            name={item.name}
            className={`font-publicSans flex w-full cursor-pointer items-center gap-2 rounded-md p-[10px_16px] text-left text-sm font-semibold text-gray-600 capitalize duration-300 ${
              selectedCategory.id === item.id ? "bg-primary text-white" : ""
            } ${
              selectedCategory.id !== item.id
                ? "hover:bg-primary/20 hover:text-primary"
                : ""
            }`}
            onClick={() => {
              handleClick({ id: item.id, name: item.name, icon: Icon ?? null });
            }}
          >
            {Icon && <Icon width={16} height={16} />}
            {item.name}
          </button>
        );
      })}
    </div>
  );
};
