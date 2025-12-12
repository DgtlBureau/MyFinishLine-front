import { ComponentType, SVGProps } from "react";
import { HomeIcon } from "lucide-react";

export const AccordionHeader = ({
  selectedCategory,
}: {
  selectedCategory: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  };
}) => {
  const Icon = selectedCategory.icon ?? HomeIcon;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-primary/20 h-10 h-full w-10 w-auto rounded-md p-3">
        <Icon />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-600">
          {selectedCategory.name ? selectedCategory.name : "All categories"}
        </h2>
        <p className="font-publicSans text-sm text-gray-500">
          {"get_help_with"}{" "}
          <span className="lowercase">
            {selectedCategory.name ? selectedCategory.name : "All categories"}
          </span>
        </p>
      </div>
    </div>
  );
};
