import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { validate } from "@/app/lib/utils/validate/paymentValidate";
import { useState } from "react";
import { IProduct } from "@/app/types";
import axios from "axios";

const PaymentForm = ({ product }: { product: IProduct }) => {
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
      handleOrder();
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/payment/order", {
        stripe_price_id: product.prices?.[0].stripe_price_id,
      });
      window.location.href = data.payment_url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const glassInputClassName =
    "w-full py-4 px-5 text-base rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] placeholder:text-[#1a1a2e]/40 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all";

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg">
          <p className="font-bold text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Your details
          </p>
          <div className="flex gap-4">
            <label className="w-[50%]">
              <Input
                name="firstName"
                value={values.firstName}
                placeholder="First Name"
                onChange={(e) => setFieldValue("firstName", e.target.value)}
                className={glassInputClassName}
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
                className={glassInputClassName}
                onBlur={handleBlur}
                error={touched.lastName ? errors.lastName : undefined}
              />
            </label>
          </div>
          <div className="flex gap-4">
            <label className="w-[50%]">
              <Input
                name="email"
                value={values.email}
                placeholder="E-mail"
                onChange={(e) => setFieldValue("email", e.target.value)}
                className={glassInputClassName}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
              />
            </label>
            <span className="w-[50%]" />
          </div>
        </div>
        <Button
          className="group relative w-full py-6 px-6 text-xl font-bold uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white shadow-xl backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
          type="submit"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          {isLoading ? (
            <>
              <div className="relative z-10 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              <span className="relative z-10">Forming order link...</span>
            </>
          ) : (
            <span className="relative z-10">Order</span>
          )}
        </Button>
      </form>
    </>
  );
};

export default PaymentForm;
