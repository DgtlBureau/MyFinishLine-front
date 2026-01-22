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
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import Link from "next/link";
import { FaqForm } from "@/app/components/Faq/FaqForm/FaqForm";
import { clearUser } from "@/app/lib/features/user/userSlice";
import { useRouter } from "next/navigation";

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

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(clearUser());
      localStorage.removeItem("persist:root");
      router.replace("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="pt-14 flex flex-col gap-4 justify-between max-w-4xl mx-auto min-h-[80vh]">
      <ul className="h-full">
        {links.map((link) => {
          const isExpanded = expandedBlockId === link.id;
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
                        additional_content={link?.additional_content}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <div className="p-[16px_16px]">
        <div className="flex flex-col gap-2">
          <p>Contact info</p>
          <ul className="text-sm text-muted-foreground">
            <li className="border-b border-border px-6 py-6">
              <p className="text-sm text-base leading-6 text-foreground text-muted-foreground">
                Email:
                <a
                  href="mailto:access@myfinishline.io"
                  className="ml-1 font-medium text-primary hover:underline text-black"
                >
                  access@myfinishline.io
                </a>
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                MyFinishLine <span className="text-black">v1.0.0</span>
              </p>
            </li>

            <li className="px-6 py-6">
              <p className="font-medium text-foreground">
                © Fortem Group Limited
              </p>

              <p className="mt-4 text-xl uppercase tracking-wide text-muted-foreground">
                Virtual Sports Quests
              </p>

              <address className="mt-4 not-italic space-y-1 text-sm text-muted-foreground">
                <p>Unit E01, 10/F, Wong King Ind Building</p>
                <p>2–4 Tai Yau Street</p>
                <p>San Po Kong</p>
                <p>Hong Kong</p>
              </address>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-[5px_16px] flex items-center justify-center">
        {isSent ? (
          <div className="flex items-enter justify-center p-[20px_40px] rounded-[4px] bg-black">
            <p className="text-white">
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
      <div className="px-4">
        <button
          type="button"
          onClick={handleLogout}
          className="p-[4px_8px] w-full rounded-[8px] bg-black text-white font-semibold cursor-pointer hover:scale-[101%] duration-300"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Page;
