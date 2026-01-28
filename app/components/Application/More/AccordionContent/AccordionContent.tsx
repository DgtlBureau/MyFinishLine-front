import { ChevronRight } from "lucide-react";
import { motion, easeInOut } from "motion/react";
import { ReactNode, useState } from "react";
import { type LucideIcon } from "lucide-react";
import { RenderBoldText } from "@/app/components/ui/renderBoldText";

interface IAccordionContentProps {
  title: string;
  list?: {
    id: number;
    isVisible: boolean;
    icon: LucideIcon;
    category: string;
    variants: {
      id: number;
      question: string;
      sub_question?: string;
      answer: { id: number; variant: string }[];
    }[];
  }[];
  additional_content?: () => ReactNode;
}

const arrowVariants = {
  expanded: {
    rotate: 90,
    transition: { duration: 0.3, ease: easeInOut },
  },
  collapsed: {
    rotate: 0,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

const contentContainerVariants = {
  expanded: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  collapsed: {
    opacity: 0,
    scale: 0.97,
    transition: {
      opacity: { duration: 0.15 },
      scale: { duration: 0.15 },
    },
  },
};

const AccordionContent = ({
  list,
  title,
  additional_content,
}: IAccordionContentProps) => {
  const [expandedBlockId, setExpandedBlockId] = useState<null | number>(null);

  const handleClickBlock = (id: number) => {
    setExpandedBlockId(expandedBlockId === id ? null : id);
  };

  return (
    <section>
      <div className="px-4 pb-2">
        {title && (
          <span className="block mt-7 text-3xl font-semibold leading-9 text-[#1a1a2e]">
            {title}
          </span>
        )}
        <ul>
          {list
            && [...list[0].variants.slice(0, 5)]?.map((item) => {
              const isExpanded = expandedBlockId === item.id;

              return (
                <li
                  key={item.id}
                  className="overflow-hidden border-b border-white/30 last:border-b-0"
                >
                  <button
                    onClick={() => handleClickBlock(item.id)}
                    className="flex items-center text-left justify-between text-base py-3 font-medium leading-6 text-[#1a1a2e]/80 w-full cursor-pointer"
                  >
                    {item.question}
                    <motion.div
                      variants={arrowVariants}
                      initial="collapsed"
                      animate={isExpanded ? "expanded" : "collapsed"}
                      className="text-[#1a1a2e]/50 shrink-0 ml-2"
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <ol
                        className={`bg-white/30 rounded-xl mb-3 p-3 ${item.answer.length > 1
                          ? "list-decimal list-inside marker:font-semibold"
                          : ""
                          }`}
                      >
                        {item.answer.map((el) => (
                          <li
                            key={el.id}
                            className="pb-2 last:pb-0 text-sm leading-5 text-[#1a1a2e]/70"
                          >
                            <RenderBoldText text={el.variant} />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
        {additional_content && additional_content()}
      </div>
    </section>
  );
};

export default AccordionContent;
