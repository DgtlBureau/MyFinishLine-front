"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import { useDebounce } from "use-debounce";
import { FaqAccordion } from "./FaqAccordion/Accordion";
import { FaqForm } from "./FaqForm/FaqForm";
import { FaqBanner } from "./FaqBanner/FaqBanner";
import { faqData } from "@/app/data/faqData";
import { Modal } from "../ui/modal/Modal";
import { FormikState, useFormik } from "formik";
import { XIcon } from "lucide-react";
import axios from "axios";

interface ISendFeedbackProps {
  category_id: number;
  text: string;
  user_id?: number;
  email?: string;
}

interface IFormikValues {
  user_id: number | null;
  email: string;
  question: string;
  category: number;
}

export const Faq = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  }>({
    id: 0,
    name: "",
    icon: null,
  });

  const visibleFaqData = faqData.filter((item) => item.isVisible);

  const handleSendFeedback = async (data: ISendFeedbackProps) => {
    try {
      const res = await axios.post("/api/faq/send-feedback", data);

      // setSendingdData(data);
      setIsSuccess(true);
      return res.data;
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      throw error;
    }
  };

  const initialValues = {
    user_id: null,
    email: "",
    question: "",
    category: 1,
  };

  const {
    values,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    resetForm,
    errors,
    isValid,
    touched,
  } = useFormik<IFormikValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      const data: ISendFeedbackProps = {
        category_id: values.category,
        text: values.question,

        user_id: values.user_id ?? undefined,

        email: values.email,
      };
      await handleSendFeedback(data);
    },
  });

  const filteredData = useMemo(() => {
    if (selectedCategory.id) {
      const data = faqData.find(
        (item) => item.id === selectedCategory.id && item.isVisible
      );
      return data?.variants ?? [];
    }

    return visibleFaqData
      .flatMap((item) => item.variants)
      .map((el, index) => ({
        id: el.id * index,
        question: el.question,
        answer: el.answer,
        sub_answer: el.sub_answer,
      }));
  }, [selectedCategory, faqData, visibleFaqData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory({
      id: 0,
      name: "",
      icon: null,
    });
    setSearch(e.target.value);
  };

  const handleChangeCategory = (category: {
    id: number;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  }) => {
    setSearch("");
    setSelectedCategory(category);
  };

  const options = visibleFaqData.map((item) => ({
    id: item.id,
    name: item.category,
    icon: item.icon,
  }));

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setIsError(false);
    resetForm(initialValues as Partial<FormikState<IFormikValues>>);
  };

  return (
    <div className="bg-primary/10 flex min-h-screen items-start justify-center">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-start gap-4 p-[20px_10px] pb-[40px] md:p-[20px_40px] md:pb-[80px]">
        <FaqBanner search={search} setSearch={(e) => handleSearch(e)} />

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          {filteredData && (
            <div className="flex w-full flex-col gap-4 md:w-[75%]">
              <FaqAccordion items={filteredData} search={value} />
            </div>
          )}
        </div>
        <div className="mt-[10px] flex flex-col items-center justify-center gap-2">
          <p className="text-primary bg-primary/20 rounded-md px-4 py-1 text-center text-sm font-semibold">
            Questions?
          </p>
          <p className="text-center text-2xl font-medium text-gray-600">
            Still have questions
          </p>
          <span className="text-center text-sm text-muted-foreground">
            If you were not able to find an answer to the question in the FAQ,
            contact us. We will answer you promptly!
          </span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="p-[8px_16px] bg-primary/20 text-primary rounded-[10px] hover:bg-primary hover:text-white duration-300 font-bold cursor-pointer"
          >
            Feedback
          </button>
        </div>
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            {!true ? (
              <div className="flex items-center justify-center">Loading...</div>
            ) : isSuccess ? (
              <div className="relative flex flex-col items-center justify-center gap-2">
                <button
                  className="absolute right-0 -top-[30px] -translateY-[50%] cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <XIcon />
                </button>
                <h3 className="flex flex-col bg-primary text-white rounded-md px-4 py-8 text-xl font-medium">
                  The question has been successfully sent.
                </h3>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="rounded-md bg-red-500 px-4 py-8 text-xl font-medium">
                  Error sending data
                </h3>
              </div>
            ) : (
              <FaqForm
                isValid={isValid}
                errors={errors}
                handleBlur={handleBlur}
                touched={touched}
                setFieldTouched={setFieldTouched}
                options={options}
                values={values}
                setValues={setFieldValue}
                setFieldValue={setFieldValue}
                onClick={handleSubmit}
                onClose={handleCloseModal}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};
