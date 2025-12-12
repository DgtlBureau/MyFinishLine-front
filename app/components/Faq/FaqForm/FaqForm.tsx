import { CustomSelect } from '@/ui/customSect/CustomSelect'
import { t } from 'i18next'
import type { FormikErrors, FormikTouched } from 'formik'
import { ErrorInfo } from '@/ui/errorInfo/ErrorInfo'
import MessageCircleIcon from '@/assets/images/svg/message-circle.svg?react'
import CloseIcon from '@/assets/images/svg/close.svg?react'
import { getCurrentClub } from '@/config/clubConfig'
import SendIcon from '@/assets/images/svg/telegram.svg?react'

interface IFormikValues {
  user_id: number | null
  email: string
  question: string
  category: {
    id: number
    name: string
  }
}

interface IFaqFormProps {
  options: { id: number; name: string }[]
  values: {
    user_id: number | null
    email: string
    question: string
    category: {
      id: number
      name: string
    }
  }
  errors: FormikErrors<IFormikValues>
  touched: FormikTouched<IFormikValues>
  handleBlur: (field: string) => void
  setFieldTouched: (field: string, value: boolean) => void
  setFieldValue: (
    field: string,
    value: string | { id: number; name: string } | number | null
  ) => void
  isValid: boolean
  setValues: (
    field: string,
    value: string | { id: number; name: string } | number | null
  ) => void
  onClick: () => void
  onClose: () => void
}

export const FaqForm = ({
  values,
  errors,
  touched,
  setValues,
  options,
  onClose,
  onClick,
  isValid,
  setFieldTouched,
}: IFaqFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
  }

  return (
    <div className="relative flex w-full max-w-[600px] flex-col gap-4 rounded-md bg-white p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[10px] right-[10px] cursor-pointer md:top-[20px] md:right-[20px]"
      >
        <CloseIcon className="h-4 w-3 fill-gray-700 md:h-4 md:w-4" />
      </button>
      <div
        className="flex w-full flex-col gap-4 rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <MessageCircleIcon className="fill-primary h-5 w-5 md:h-8 md:w-8" />
            <p className="text-xl font-semibold md:text-2xl">
              {t('send_feedback')}
            </p>
          </div>
          <span className="text-text-secondary text-sm">
            {t('form_info', { club_name: getCurrentClub().name })}
          </span>
        </div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          name="faq-form"
        >
          <div className="flex w-full flex-col gap-1">
            <span className="text-sm md:text-base">{t('feedback_type')}</span>
            <CustomSelect
              value={values.category.name}
              options={options}
              onChange={(value) => {
                setValues('category', value)
              }}
              onBlur={() => setFieldTouched('category', true)}
              placeholder={t('select_category')}
              className={`${touched.category && errors.category ? 'border-red-500' : ''}`}
            />
            {errors.category && touched.category && (
              <ErrorInfo error={errors.category.name as string} />
            )}
          </div>

          <div className="flex w-full flex-col gap-1">
            <span className="text-sm md:text-base">{t('message')}</span>
            <textarea
              name="question"
              id="question"
              autoComplete="off"
              value={values.question}
              rows={4}
              onChange={(e) => setValues('question', e.target.value)}
              placeholder={`${t('feedback_placeholder')}...`}
              className={`resize-none rounded-md border border-gray-300 p-2 outline-none ${touched.question && errors.question ? 'border-red-500' : ''}`}
              onBlur={() => setFieldTouched('question', true)}
            />
            {errors.question && touched.question && (
              <ErrorInfo error={errors.question} />
            )}
          </div>

          <div className="flex w-full flex-col gap-1">
            <span className="text-sm md:text-base">
              {t('contact_info')} ({t('email')})
            </span>
            <input
              type="email"
              name="email"
              disabled={!!values.user_id}
              id="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues('email', e.target.value)}
              placeholder={t('email')}
              className={`rounded-md border border-gray-300 p-2 outline-none ${touched.email && errors.email ? 'border-red-500' : ''} ${values.user_id ? 'text-gray-500' : ''}`}
              onBlur={() => setFieldTouched('email', true)}
            />

            {errors.email && touched.email && (
              <ErrorInfo error={errors.email as string} />
            )}
          </div>

          <div className="flex w-full flex-col-reverse items-center justify-center gap-4 md:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="text-text-foreground border-text-muted hover:bg-primary hover:text-text-inverse w-full cursor-pointer rounded-md border px-4 py-2 font-medium"
            >
              {t('cancel')}
            </button>
            <button
              disabled={!isValid}
              type="submit"
              className={`bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-white transition-all duration-300 ${isValid ? 'hover:bg-primary-hover cursor-not-allowed' : 'opacity-50'}`}
            >
              <SendIcon className="h-5 w-5 fill-white" />
              {t('send_feedback')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
