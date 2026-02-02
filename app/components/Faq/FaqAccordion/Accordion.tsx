"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { AnswerComponent } from "./AnswerComponent";

interface FaqAccordionProps {
  items: {
    id: number;
    question: string;
    sub_answer?: string;
    answer: {
      id: number;
      variant: string;
    }[];
  }[];
  search: string;
}

export const FaqAccordion = ({ items, search }: FaqAccordionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

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
        filteredItems.map((item, index) => {
          const isOpen = openItems.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="overflow-hidden rounded-md bg-white/15 backdrop-blur-xl border border-white/30 p-4 transition-all duration-300"
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between"
                onClick={() => handleClick(item.id)}
              >
                <h2 className="text-md text-left font-medium text-white">
                  {item.question}
                </h2>
                <div>
                  <ChevronDown
                    width={16}
                    height={16}
                    className={`text-white transition-all transition-transform duration-300 ${
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
                <div className="text-md text-white/70 [&_a]:text-blue-300 [&_a]:hover:text-blue-200">
                  <AnswerComponent
                    answer={item.answer}
                    sub_answer={item.sub_answer}
                  />
                </div>
              </div>
            </motion.div>
          );
        })
      ) : (
        <div className="text-center text-white/60">Not found</div>
      )}
    </div>
  );
};
