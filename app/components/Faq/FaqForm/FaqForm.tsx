import type { FormikErrors, FormikTouched } from "formik";
import { ErrorInfo } from "../../ui/errorInfo/ErrorInfo";
import { XIcon, SendIcon, MessageCircleIcon } from "lucide-react";

interface IFormikValues {
  user_id: number | null;
  email: string;
  question: string;
  category: number;
}

interface IFaqFormProps {
  values: {
    user_id: number | null;
    email: string;
    question: string;
    category: number;
  };
  errors: FormikErrors<IFormikValues>;
  touched: FormikTouched<IFormikValues>;
  handleBlur: (field: string) => void;
  setFieldTouched: (field: string, value: boolean) => void;
  setFieldValue: (
    field: string,
    value: string | { id: number; name: string } | number | null,
  ) => void;
  isValid: boolean;
  setValues: (
    field: string,
    value: string | { id: number; name: string } | number | null,
  ) => void;
  onClick: () => void;
  onClose: () => void;
  hasCloseIcon?: boolean;
  hasCancelBtn?: boolean;
}

export const FaqForm = ({
  values,
  errors,
  touched,
  setValues,
  onClose,
  onClick,
  isValid,
  setFieldTouched,
  hasCloseIcon = true,
  hasCancelBtn = true,
}: IFaqFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-2xl p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
      {hasCloseIcon && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[10px] right-[10px] cursor-pointer md:top-[20px] md:right-[20px]"
        >
          <XIcon className="h-4 w-4 text-white/50" />
        </button>
      )}
      <div
        className="flex w-full flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <MessageCircleIcon className="h-5 w-5 md:h-7 md:w-7 text-white" />
            <p className="text-xl font-semibold md:text-2xl text-white">Send feedback</p>
          </div>
          <span className="text-white/60 text-sm">
            Help us improve MyFinishLine by sharing your thoughts, suggestions,
            or reporting issues
          </span>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          name="faq-form"
        >
          <div className="flex w-full flex-col gap-1.5">
            <span className="text-sm font-medium text-white">
              Contact info {`(Email)`}
            </span>
            <input
              type="email"
              name="email"
              disabled={false}
              id="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues("email", e.target.value)}
              placeholder={"email"}
              className={`rounded-xl border bg-white/50 backdrop-blur-xl border-white/60 p-3 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all placeholder:text-white/60 text-white ${
                touched.email && errors.email ? "border-red-400" : ""
              } ${values.user_id ? "text-white/60" : ""}`}
              onBlur={() => setFieldTouched("email", true)}
            />

            {errors.email && touched.email && (
              <ErrorInfo error={errors.email as string} />
            )}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <span className="text-sm font-medium text-white">{"Message"}</span>
            <textarea
              name="question"
              id="question"
              autoComplete="off"
              value={values.question}
              rows={4}
              onChange={(e) => setValues("question", e.target.value)}
              placeholder={`Write your question...`}
              className={`resize-none rounded-xl border bg-white/50 backdrop-blur-xl border-white/60 p-3 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all placeholder:text-white/60 text-white ${
                touched.question && errors.question ? "border-red-400" : ""
              }`}
              onBlur={() => setFieldTouched("question", true)}
            />
            {errors.question && touched.question && (
              <ErrorInfo error={errors.question} />
            )}
          </div>

          <div className="flex w-full flex-col-reverse items-center justify-center gap-3 md:flex-row">
            {hasCancelBtn && (
              <button
                type="button"
                onClick={onClose}
                className="w-full cursor-pointer rounded-xl border border-white/60 bg-white/40 backdrop-blur-xl px-4 py-3 font-medium text-white hover:bg-white/50 transition-all"
              >
                {"Cancel"}
              </button>
            )}
            <button
              disabled={!isValid}
              type="submit"
              className={`group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all duration-300 overflow-hidden ${
                isValid
                  ? "bg-gradient-to-r from-[#5170D5] to-[#66af69] hover:opacity-90 shadow-lg backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]"
                  : "bg-gradient-to-r from-[#5170D5]/40 to-[#66af69]/40 cursor-not-allowed border border-white/20"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <SendIcon className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Send feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
