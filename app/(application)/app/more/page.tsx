"use client";

import { ChevronRight } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useState } from "react";
import AccordionContent from "@/app/components/Application/More/AccordionContent/AccordionContent";
import { faqData } from "@/app/data/faqData";
import { useFormik } from "formik";
import { validate } from "@/app/lib/utils/validate/feedbackValidate";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/app/components/Shared/Loader/Loader";
import { useAppSelector } from "@/app/lib/hooks";
import Link from "next/link";
import { Modal } from "@/app/components/ui/modal/Modal";
import { FaqForm } from "@/app/components/Faq/FaqForm/FaqForm";

interface IFormik {
  email: string;
  question: string;
  category: number;
  user_id: number | null;
}

const links = [
  {
    id: 1,
    label: "FAQ",
    title: "",
    content: faqData,
    additional_content: () => (
      <div className="flex flex-col justify-center items-center gap-2 py-[20px]">
        <p className="text-center text-gray-500">Still have questions?</p>
        <Link
          href="/faq"
          className="p-[4px_8px] text-[16px] w-fit bg-primary/20 text-primary rounded-[10px] hover:bg-primary hover:text-white duration-300 font-bold cursor-pointer"
        >
          See more
        </Link>
      </div>
    ),
  },
  {
    id: 2,
    label: "Feedback",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    values,
    isValid,
    errors,
    touched,
    setFieldTouched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik<IFormik>({
    initialValues: {
      user_id: user.id,
      email: "",
      question: "",
      category: 2,
    },
    validate,
    onSubmit: (values) => {
      sendFeedback(values);
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const sendFeedback = async (values: IFormik) => {
    setIsSending(true);
    const payload = {
      email: values.email,
      text: values.question,
      category: values.category,
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
      handleCloseModal();
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
                <div className="flex items-enter justify-center">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="p-[4px_8px] text-[16px] w-fit bg-primary/20 text-primary rounded-[10px] hover:bg-primary hover:text-white duration-300 font-bold cursor-pointer"
                  >
                    Feedback
                  </button>
                </div>
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
                    >
                      <AccordionContent
                        title={link.title || ""}
                        list={link.content}
                        content={handleCallContent}
                        additional_content={link?.additional_content}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            {isSending ? (
              <Loader />
            ) : (
              <FaqForm
                isValid={isValid}
                errors={errors}
                handleBlur={handleBlur}
                touched={touched}
                setFieldTouched={setFieldTouched}
                values={values}
                setValues={setFieldValue}
                setFieldValue={setFieldValue}
                onClick={handleSubmit}
                onClose={handleCloseModal}
              />
            )}
          </Modal>
        )}
      </ul>
    </main>
  );
};

export default Page;
