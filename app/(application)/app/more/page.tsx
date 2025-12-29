"use client";

import { ChevronRight } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useState } from "react";
import AccordionContent from "@/app/components/Application/More/AccordionContent/AccordionContent";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { faqData } from "@/app/data/faqData";
import { Textarea } from "@/app/components/ui/textarea";
import { useFormik } from "formik";
import { validate } from "@/app/lib/utils/validate/feedbackValidate";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/app/components/Shared/Loader/Loader";
import { getCurrentUser } from "@/app/lib/utils/userService";
import { useAppSelector } from "@/app/lib/hooks";

interface IFormik {
  email: string;
  question: string;
  type_id: number;
  user_id: number | null;
}

const links = [
  {
    id: 1,
    label: "FAQ",
    title: "Frequently Asked Questions",
    content: faqData,
  },
  {
    id: 2,
    label: "Contact us",
    block: (form: any) => (
      <div>
        <ul>
          <li className="border-b border-border pb-6 px-6">
            <span className="text-2xl leading-8 text-[#71717A]">Email Us</span>
            <span className="block mt-6 text-base leading-6 text-[#09090B]">
              help@example.com
            </span>
            <span className="block text-base leading-6 text-[#09090B]">
              support@example.com
            </span>
          </li>
          <li className="p-6">
            <span className="text-2xl leading-8 text-[#71717A]">Offices</span>
            <span className="block mt-6 text-xl leading-8 text-[#71717A]">
              New York
            </span>
            <span className="mt-2 block text-base leading-6 text-[#71717A]">
              123 6th St. Melbourne, FL 32904, USA
            </span>
            <span className="block mt-8 text-xl leading-8 text-[#71717A]">
              London
            </span>
            <span className="block mt-2 text-base leading-6 text-[#71717A]">
              123 3rd St. London, TL 32904, UK
            </span>
          </li>
        </ul>
        {form}
      </div>
    ),
  },
];

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

const contentInnerVariants = {
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

const Page = () => {
  const [expandedBlockId, setExpandedBlockId] = useState<null | number>(null);
  const [isSending, setIsSending] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik<IFormik>({
    initialValues: {
      email: "",
      question: "",
      type_id: 2,
      user_id: user.id,
    },
    validate,
    onSubmit: (values) => {
      sendFeedback(values);
    },
  });

  const sendFeedback = async (values: IFormik) => {
    setIsSending(true);
    const payload = {
      email: values.email,
      text: values.question,
      category: values.type_id,
      ...(values.user_id !== null ? { user_id: values.user_id } : {}),
    };
    try {
      const { data } = await axios.post("/api/faq/send-feedback", payload);
      toast.success("Feedback sent successfully");
      return data;
    } catch (error: any) {
      toast.error("Error feedback sending: ", error.response.data.message);
    } finally {
      setIsSending(false);
      resetForm();
    }
  };

  const handleClickBlock = (id: number) => {
    setExpandedBlockId(expandedBlockId === id ? null : id);
  };

  return (
    <main className="max-w-4xl mx-auto">
      <ul>
        {links.map((link) => {
          const isExpanded = expandedBlockId === link.id;

          const handleCallContent = () => {
            if (link.block) {
              return link.block(
                <form
                  onSubmit={handleSubmit}
                  className="py-8 px-4 bg-[#F4F4F5]"
                >
                  <div className="border border-[#E4E4E7] rounded-lg p-4 space-y-2 bg-white">
                    <span className="font-semibold text-sm text-[#09090B]">
                      Subscribe to our newsletter
                    </span>
                    <p className="text-sm leading-5 text-[#71717A]">
                      Opt-in to receive updates and news about the sidebar.
                    </p>
                    <div className="flex flex-col gap-[2px]">
                      <Input
                        required
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        type="email"
                        className=""
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className="text-[12px] text-destructive">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <Textarea
                        name="question"
                        required
                        placeholder="Question"
                        value={values.question}
                        onChange={(e) =>
                          setFieldValue("question", e.target.value)
                        }
                        onBlur={handleBlur}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      {errors.question && touched.question && (
                        <span className="text-[12px] text-destructive">
                          {errors.question}
                        </span>
                      )}
                    </div>
                    <Button className="w-full" type="submit">
                      {isSending ? <Loader /> : "Subscribe"}
                    </Button>
                  </div>
                </form>
              );
            } else {
              return <></>;
            }
          };

          return (
            <li
              key={link.id}
              className="border-b border-border overflow-hidden"
            >
              <button
                onClick={() => handleClickBlock(link.id)}
                className="flex items-center justify-between text-base py-8 px-4 leading-6 w-full cursor-pointer"
              >
                {link.label}
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
                  <motion.div
                    variants={contentContainerVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={contentInnerVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="px-4 pb-6"
                    >
                      <AccordionContent
                        title={link.title || ""}
                        list={link.content}
                        content={handleCallContent}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Page;
