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
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { IProduct } from "@/app/types";

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
      openCheckout();
    },
  });
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "production",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN!,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const openCheckout = () => {
    if (!paddle) return;

    paddle.Checkout.open({
      items: [{ priceId: product.prices.paddle_price_id, quantity: 1 }],
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-7.5 w-full"
      >
        <Button onClick={openCheckout}>Open checkout</Button>
        <div className="flex flex-col gap-3 p-6 rounded-3xl border border-[#C3B7E2] bg-white">
          <p className="font-bold text-[22px]">Your details</p>
          <div className="flex gap-5">
            <label className="w-[50%]">
              <Input
                name="firstName"
                value={values.firstName}
                placeholder="First Name"
                onChange={(e) => setFieldValue("firstName", e.target.value)}
                className="h-10 placeholder-[#71717A] text-primary"
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
                className="h-10 placeholder-[#71717A] text-primary"
                onBlur={handleBlur}
                error={touched.lastName ? errors.lastName : undefined}
              />
            </label>
          </div>
          <div className="flex gap-5">
            <label className="w-[50%]">
              <Input
                name="email"
                value={values.email}
                placeholder="E-mail"
                onChange={(e) => setFieldValue("email", e.target.value)}
                className="h-10 placeholder-[#71717A] text-primary"
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
              />
            </label>
            <span className="w-[50%]" />
          </div>
        </div>
      </form>
      <div className="relative flex flex-col gap-3 p-6 rounded-3xl border border-[#C3B7E2] bg-white">
        <div id="checkout-container" className="checkout-container"></div>
      </div>
    </>
  );
};

export default PaymentForm;
