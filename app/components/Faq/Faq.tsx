"use client";

import {
  useContext,
  useMemo,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
// import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import { FaqMenu } from "./FaqMenu/FaqMenu";
import { FaqAccordion } from "./FaqAccordion/Accordion";
// import { Modal } from "@/ui/modal/Modal";
// import { Button } from "@/ui/button/button";
import { FaqForm } from "./FaqForm/FaqForm";
// import { useFormik, type FormikState } from "formik";
import { FaqBanner } from "./FaqBanner/FaqBanner";
import { AccordionHeader } from "./FaqAccordion/AccordionHeader";
// import { useMutation } from "@tanstack/react-query";
// import { instance } from "@/utils/api/api";
// import { toast } from "react-toastify";
import { faqData } from "@/app/data/faqData";
import LoggedLayout from "../LoggedLayout/LoggedLayout";
import { MoveDiagonal, HomeIcon } from "lucide-react";
// import { AuthContext } from "@/contexts/AuthContext";
// import { Spinner } from "@/ui/spinner/Spinner";
// import { validate } from "@/utils/validations/validateFaq";
// import { clubConfig } from "@/config/clubConfig";

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
  category: {
    id: number;
    name: string;
  };
}

export const Faq = () => {
  // const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const visibleFaqData = faqData.filter((item) => item.isVisible)
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  // const [selectedCategory, setSelectedCategory] = useState<{
  //   id: number
  //   name: string
  //   icon: ComponentType<SVGProps<SVGSVGElement>> | null
  // }>({
  //   id: visibleFaqData[0].id,
  //   name: visibleFaqData[0].category,
  //   icon: visibleFaqData[0].icon ?? null,
  // })
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

  // const { mutateAsync: sendFeedback, isPending } = useMutation({
  //   mutationFn: async ({
  //     category_id,
  //     text,
  //     user_id,
  //     email,
  //   }: ISendFeedbackProps) => {
  //     const response = await instance.post("feedbacks", {
  //       category_id,
  //       text,
  //       user_id,
  //       email,
  //     });
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     toast.success(t("feedback_sent_successfully"));
  //     setIsSuccess(true);
  //     resetForm();
  //   },
  //   onError: (error) => {
  //     toast.error(
  //       error instanceof Error ? error.message : t("an_error_occurred")
  //     );
  //     setIsError(true);
  //   },
  // });

  // const { user } = useContext(AuthContext);

  // const initialValues = {
  //   user_id: user?.id ?? null,
  //   email: user?.email ?? "",
  //   question: "",
  //   category: {
  //     id: 0,
  //     name: "",
  //   },
  // };

  // const {
  //   values,
  //   setFieldValue,
  //   setFieldTouched,
  //   handleBlur,
  //   handleSubmit,
  //   resetForm,
  //   errors,
  //   isValid,
  //   touched,
  // } = useFormik<IFormikValues>({
  //   enableReinitialize: true,
  //   initialValues,
  //   validate,
  //   onSubmit: (values) => {
  //     const data: ISendFeedbackProps = {
  //       category_id: values.category.id,
  //       text: values.question,
  //       ...(user && values.user_id
  //         ? {
  //             user_id: values.user_id,
  //           }
  //         : {}),
  //       email: values.email,
  //     };
  //     sendFeedback(data);
  //   },
  // });

  // const filteredData = () => {
  //   if (selectedCategory.id) {
  //     const data = faqData.find(
  //       (item) => item.id === selectedCategory.id && item.isVisible
  //     );
  //     return data?.variants;
  //   } else {
  //     const data = visibleFaqData
  //       .map((item) => item.variants)
  //       .flat()
  //       .map((el, index) => {
  //         return {
  //           id: el.id * index,
  //           question: el.question,
  //           answer: el.answer,
  //         };
  //       });
  //     return data;
  //   }
  // };

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

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setIsSuccess(false);
  //   setIsError(false);
  //   resetForm(initialValues as Partial<FormikState<IFormikValues>>);
  // };

  // const Icon = selectedCategory.icon
  // const Logo = clubConfig["my.hcadmiral.pro"].logo;

  return (
    <div className="bg-primary/10 flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-start gap-4 p-[20px_10px] pb-[40px] md:p-[20px_40px] md:pb-[80px]">
        <FaqBanner search={search} setSearch={(e) => handleSearch(e)} />

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-[25%]">
            <FaqMenu
              options={options}
              selectedCategory={selectedCategory}
              onClick={handleChangeCategory}
            />
            <div className="hidden w-fit items-center justify-center md:flex">
              <a href="https://hcadmiral.pro" className="w-[65%]">
                {/* <Logo className="w-full" /> */}
              </a>
            </div>
          </div>
          {filteredData && (
            <div className="flex w-full flex-col gap-4 md:w-[75%]">
              <AccordionHeader selectedCategory={selectedCategory} />
              <FaqAccordion items={filteredData} search={value} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-primary bg-primary/20 rounded-md px-4 py-1 text-center text-sm font-semibold">
            Questions?
          </p>
          <p className="text-center text-2xl font-medium text-gray-600">
            Still have questions
          </p>
          <span className="text-center text-sm text-gray-500">
            If you were not able to find an answer to the question in the FAQ,
            contact us. We will answer you promptly!
          </span>
          <button
            type="button"
            // variant="shadow"
            onClick={() => setIsModalOpen(true)}
          >
            feedback
          </button>
        </div>
        {/* {isModalOpen && (
          <Modal onClose={handleCloseModal}>
          {isPending ? (
            <div className="flex items-center justify-center">
            <Spinner />
            </div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="bg-primary rounded-md px-4 py-8 text-xl font-medium">
              {t("request_received_successfully")}
              </h3>
              </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="rounded-md bg-red-500 px-4 py-8 text-xl font-medium">
                {t("request_received_error")}
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
                )} */}
      </div>
    </div>
  );
};
