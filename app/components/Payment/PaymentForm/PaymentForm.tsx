import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select } from "../../ui/select";
import {
  formatCardNumber,
  formatExpiryDate,
  numberRegex,
} from "@/app/lib/utils/regex";
import { CustomSelect } from "../../ui/customSect/CustomSelect";
import { validate } from "@/app/lib/utils/validate/paymentValidate";

export const PaymentForm = () => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldTouched,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      cardNumber: "",
      expirityCardDate: "",
      cvc: "",
      country: "",
      promocode: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-[30px] w-[60%]"
    >
      <div className="flex flex-col gap-[14px] p-[24px] rounded-3xl border-[1px] border-[#C3B7E2] bg-white">
        <p className="font-bold text-[22px]">Your details</p>
        <div className="flex gap-[20px]">
          <label className="w-[50%]">
            <Input
              name="firstName"
              value={values.firstName}
              placeholder="First Name"
              onChange={(e) => setFieldValue("firstName", e.target.value)}
              className="h-[40px] placeholder-[#71717A] text-primary"
              onBlur={handleBlur}
              error={touched.firstName ? errors.firstName : undefined}
            />
          </label>
          <label className="w-[50%]">
            <Input
              name="lastName"
              value={values.lastName}
              placeholder="Last Name"
              onChange={(e) => setFieldValue("lastName", e.target.value)}
              className="h-[40px] placeholder-[#71717A] text-primary"
              onBlur={handleBlur}
              error={touched.lastName ? errors.lastName : undefined}
            />
          </label>
        </div>
        <div className="flex gap-[20px]">
          <label className="w-[50%]">
            <Input
              name="email"
              value={values.email}
              placeholder="E-mail"
              onChange={(e) => setFieldValue("email", e.target.value)}
              className="h-[40px] placeholder-[#71717A] text-primary"
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
            />
          </label>
          <span className="w-[50%]" />
        </div>
      </div>
      <div className="flex flex-col gap-[14px] p-[24px] rounded-3xl border-[1px] border-[#C3B7E2] bg-white">
        <p className="font-bold text-[22px]">Payment</p>
        <div className="flex gap-[14px]">
          <div className="flex flex-col gap-[14px]">
            <label className="text-sm text-[#71717A] flex flex-col gap-[4px]">
              Credit Card
              <Input
                name="cardNumber"
                value={formatCardNumber(values.cardNumber)}
                placeholder="0000-0000-0000-0000"
                className="h-[40px] placeholder-[#71717A] text-primary"
                onChange={(e) =>
                  setFieldValue("cardNumber", numberRegex(e.target.value, 16))
                }
                onBlur={handleBlur}
                error={touched.cardNumber ? errors.cardNumber : undefined}
              />
            </label>
            <div className="flex gap-[14px]">
              <label className="text-sm text-[#71717A] flex flex-col gap-[4px]">
                Expiry Date
                <Input
                  name="expirityCardDate"
                  value={values.expirityCardDate}
                  placeholder="** / **"
                  onChange={(e) => {
                    setFieldValue(
                      "expirityCardDate",
                      formatExpiryDate(e.target.value)
                    );
                  }}
                  className="h-[40px] placeholder-[#71717A] text-primary"
                  onBlur={handleBlur}
                  error={
                    touched.expirityCardDate
                      ? errors.expirityCardDate
                      : undefined
                  }
                />
              </label>
              <label className="text-sm text-[#71717A] flex flex-col gap-[4px]">
                CVC
                <Input
                  name="cvc"
                  value={values.cvc}
                  placeholder="***"
                  onChange={(e) => {
                    setFieldValue("cvc", numberRegex(e.target.value, 3));
                  }}
                  className="h-[40px] placeholder-[#71717A] text-primary"
                  onBlur={() => setFieldTouched("cvc", true)}
                  error={touched.cvc ? errors.cvc : undefined}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-[14px]">
            <label className="text-sm text-[#71717A] flex flex-col gap-[4px]">
              Country
              <CustomSelect
                value={values.country}
                placeholder="Select countr"
                options={[
                  { id: 1, name: "Russia" },
                  { id: 2, name: "USA" },
                  { id: 3, name: "China" },
                  { id: 4, name: "Japan" },
                  { id: 5, name: "Japan" },
                  { id: 6, name: "Uzbekistan" },
                  { id: 7, name: "Afganistan" },
                  { id: 8, name: "England" },
                  { id: 9, name: "France" },
                  { id: 10, name: "Germany" },
                ]}
                onChange={(value) => setFieldValue("country", value.name)}
                className="h-[40px] placeholder-[#71717A] text-primary"
                onBlur={() => setFieldTouched("country", true)}
              />
              {touched.country && (
                <span className="text-[12px] text-red-400">
                  {errors.country}
                </span>
              )}
            </label>
            <label className="text-sm text-[#71717A] flex flex-col gap-[4px]">
              Promocode
              <Input
                name="promocode"
                value={values.promocode}
                onChange={(e) => {
                  setFieldValue("promocode", e.target.value);
                }}
                className="h-[40px] placeholder-[#71717A] text-primary"
              />
            </label>
            <Button type="submit">Place order now</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
