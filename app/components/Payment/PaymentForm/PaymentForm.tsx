import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
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
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      openCheckout();
    },
  });
  const [paddle, setPaddle] = useState<Paddle>();
  const [isLoading, setIsLoading] = useState(false);

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

  console.log(product)

  const openCheckout = () => {
    if (!paddle) {
      console.error("Paddle is not initialized");
      return;
    }

    const paddlePriceId = product.prices?.paddle_price_id;

    if (!paddlePriceId) {
      console.error("Paddle price ID is missing from product");
      alert("Unable to process payment. Please contact support.");
      return;
    }

    setIsLoading(true);

    paddle.Checkout.open({
      items: [
        {
          priceId: paddlePriceId,
          quantity: 1,
        },
      ],
      // customer: {
      //   email: values.email,
      //   address: {
      //     countryCode: "US",
      //   },
      // },
      // customData: {
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   challengeId: product.challenge_info?.id,
      // },
      // settings: {
      //   displayMode: "overlay",
      //   theme: "light",
      //   locale: "en",
      //   successUrl: `${window.location.origin}/payment/success`,
      // },
    });

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7.5 w-full">
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
        <Button
          className="w-full mt-4 uppercase text-2xl py-6"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
              Opening checkout...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </>
  );
};

export default PaymentForm;
