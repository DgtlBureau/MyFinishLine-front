import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { ReactNode, useState } from "react";
import { type LucideIcon } from "lucide-react";

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
  content: () => ReactNode;
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
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: easeInOut,
      },
      opacity: {
        duration: 0.2,
        delay: 0.05,
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: easeInOut,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

const contentTextVariants = {
  expanded: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.2, delay: 0.1 },
      y: { duration: 0.2, delay: 0.1 },
    },
  },
  collapsed: {
    opacity: 0,
    y: -10,
    transition: {
      opacity: { duration: 0.1 },
      y: { duration: 0.1 },
    },
  },
};

const AccordionContent = ({ list, title, content }: IAccordionContentProps) => {
  const [expandedBlockId, setExpandedBlockId] = useState<null | number>(null);

  const handleClickBlock = (id: number) => {
    setExpandedBlockId(expandedBlockId === id ? null : id);
  };

  return (
    <>
      {title && (
        <span className="block mt-7 text-3xl font-semibold leading-9 text-[#09090B]">
          {title}
        </span>
      )}
      <ul className="mt-4">
        {list
          ? [...list[0].variants.slice(0, 5)]?.map((item) => {
              const isExpanded = expandedBlockId === item.id;

              return (
                <li
                  key={item.id}
                  className="border-b border-border overflow-hidden nth-last-[border-b-transparent]"
                >
                  <button
                    onClick={() => handleClickBlock(item.id)}
                    className="flex items-center justify-between text-base py-4 font-medium leading-6 text-[#09090B] w-full cursor-pointer"
                  >
                    {item.question}
                    <motion.div
                      variants={arrowVariants}
                      initial="collapsed"
                      animate={isExpanded ? "expanded" : "collapsed"}
                    >
                      <ChevronRight />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ol
                        variants={contentContainerVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className={`overflow-hidden ${
                          item.answer.length > 1
                            ? "list-decimal list-inside marker:font-semibold"
                            : ""
                        }`}
                      >
                        {item.answer.map((el) => (
                          <motion.li
                            key={el.id}
                            variants={contentTextVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="pb-4 text-sm leading-5 text-[#09090B]"
                          >
                            {el.variant}
                          </motion.li>
                        ))}
                      </motion.ol>
                    )}
                  </AnimatePresence>
                </li>
              );
            })
          : content()}
      </ul>
    </>
  );
};

export default AccordionContent;
