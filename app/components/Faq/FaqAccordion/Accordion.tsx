"use client";

import { useMemo, useState } from "react";
import ArrowDownIcon from "@/public/icons/faq/cheveron-down.svg";
import Image from "next/image";
// import { useTranslation } from 'react-i18next'

interface FaqAccordionProps {
  items: {
    id: number;
    question: string;
    answer: string;
  }[];
  search: string;
}

export const FaqAccordion = ({ items, search }: FaqAccordionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  // const { t } = useTranslation()

  // const filteredItems = () => {
  //   return items.filter((item) =>
  //     item.question.toLowerCase().includes(search.toLowerCase())
  //   );
  // };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.question.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleClick = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="accordion accordion-arrow accordion-bordered flex w-full flex-col gap-2">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => {
          const isOpen = openItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-md bg-white p-4 shadow-md transition-all duration-300"
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between"
                onClick={() => handleClick(item.id)}
              >
                <h2 className="text-md text-left font-medium text-gray-700">
                  {item.question}
                </h2>
                <div>
                  {/* <ArrowDownIcon
                    width={16}
                    height={16}
                    className={`transition-all transition-transform duration-300 ${
                      isOpen ? "-rotate-180" : ""
                    }`}
                  /> */}
                  <Image
                    src={ArrowDownIcon}
                    width={16}
                    height={16}
                    alt="arrow"
                    className={`transition-all transition-transform duration-300 ${
                      isOpen ? "-rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className={`overflow-auto transition-all duration-300 ease-in-out ${
                  isOpen ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="text-md text-gray-500 [&_a]:text-blue-600 [&_a]:hover:text-blue-700"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500">not found</div>
      )}
    </div>
  );
};
