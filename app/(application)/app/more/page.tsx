"use client";

import { ChevronRight, MessageCircleIcon } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useState } from "react";
import AccordionContent from "@/app/components/Application/More/AccordionContent/AccordionContent";
import { faqData } from "@/app/data/faqData";
import { useFormik } from "formik";
import { validate } from "@/app/lib/utils/validate/feedbackValidate";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/app/components/Shared/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import Link from "next/link";
import { FaqForm } from "@/app/components/Faq/FaqForm/FaqForm";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";
import SheetContainer from "@/app/components/SheetContainer/SheetContainer";

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
        <p className="text-center text-white/70 font-medium">Still have questions?</p>
        <Link
          href="/faq"
          className="px-4 py-2 text-[16px] w-fit bg-white/80 backdrop-blur-xl text-[#09090B] rounded-[12px] hover:bg-white/90 duration-300 font-medium cursor-pointer border border-white/50 shadow-sm"
        >
          See more
        </Link>
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
  const [isSent, setIsSent] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isContactMeOpen, setIsContactMeOpen] = useState(false);

  const handleOpenContactMenu = () => {
    setIsContactMeOpen(true);
  };

  const handleCloseContactMenu = () => {
    setTimeout(() => {
      setIsSent(false);
    }, 100);
    setIsContactMeOpen(false);
  };

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
      setIsSent(true);
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
    <PageContainer
      title="More"
      description="Additional information that might be useful"
    >
      {/* FAQ Section */}
      <div className="px-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg overflow-hidden"
        >
          <ul className="h-full">
            {links.map((link) => {
              const isExpanded = expandedBlockId === link.id;
              return (
                <li
                  key={link.id}
                  className="border-b border-white/20 last:border-b-0 overflow-hidden"
                >
                  <button
                    onClick={() => handleClickBlock(link.id)}
                    className="flex items-center justify-between text-base py-4 px-4 leading-6 w-full cursor-pointer text-white font-medium"
                  >
                    {link.label}
                    <motion.div
                      variants={arrowVariants}
                      initial="collapsed"
                      animate={isExpanded ? "expanded" : "collapsed"}
                      className="text-white/50"
                    >
                      <ChevronRight />
                    </motion.div>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <AccordionContent
                        title={link.title || ""}
                        list={link.content}
                        additional_content={link?.additional_content}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Contact Info Section */}
      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg p-4"
        >
          <p className="text-white font-semibold mb-3">Contact info</p>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-sm leading-6 text-white/70">
                Email:
                <a
                  href="mailto:access@myfinishline.io"
                  className="ml-1 font-medium text-white hover:underline"
                >
                  access@myfinishline.io
                </a>
              </p>
              <p className="mt-2 text-xs text-white/50">
                MyFinishLine <span className="text-white/70 font-medium">v1.0.0</span>
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-medium text-white/80">
                © Fortem Group Limited
              </p>
              <p className="mt-3 text-lg uppercase tracking-wide text-white/50">
                Virtual Sports Quests
              </p>
              <address className="mt-3 not-italic space-y-0.5 text-sm text-white/50">
                <p>Unit E01, 10/F, Wong King Ind Building</p>
                <p>2–4 Tai Yau Street</p>
                <p>San Po Kong</p>
                <p>Hong Kong</p>
              </address>
            </div>
          </div>
          <button
            className="relative w-full mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90 shadow-lg"
            onClick={handleOpenContactMenu}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A]" />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <MessageCircleIcon className="relative z-10 h-5 w-5" />
            <span className="relative z-10">Send feedback</span>
          </button>
        </motion.div>
      </div>
      <SheetContainer isOpen={isContactMeOpen} onClose={handleCloseContactMenu}>
        <div className="max-w-4xl mx-auto px-4 pb-20 flex items-center justify-center">
          {isSent ? (
            <div className="flex items-center justify-center p-[20px_40px] rounded-[4px]">
              <p className="text-white/90">
                Thank you for sending your information!
              </p>
            </div>
          ) : isSending ? (
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
              hasCloseIcon={false}
              hasCancelBtn={false}
            />
          )}
        </div>
      </SheetContainer>
    </PageContainer>
  );
};

export default Page;
