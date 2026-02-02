"use client";

import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { validate } from "@/app/lib/utils/validate/paymentValidate";
import { useState, useEffect } from "react";
import { IProduct } from "@/app/types";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Lock, CreditCard, Shield } from "lucide-react";

import { logger } from "@/app/lib/logger";
const PaymentForm = ({ product, quantity }: { product: IProduct; quantity: number }) => {
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
    onSubmit: () => {
      openCheckout();
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  useEffect(() => {
    initializePaddle({
      environment: "production",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN!,
    })
      .then((paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      })
      .catch((error) => {
        logger.log("Paddle js:error", error);
      });
  }, []);

  const openCheckout = () => {
    if (!paddle) {
      logger.error("Paddle is not initialized");
      return;
    }

    const paddlePriceId = product.prices?.paddle_price_id;

    if (!paddlePriceId) {
      logger.error("Paddle price ID is missing from product");
      alert("Unable to process payment. Please contact support.");
      return;
    }

    setIsLoading(true);

    paddle.Checkout.open({
      items: [
        {
          priceId: paddlePriceId,
          quantity,
        },
      ],
      customer: {
        email: values.email,
      },
      customData: {
        firstName: values.firstName,
        lastName: values.lastName,
        challengeId: product.challenge_info?.id,
      },
      settings: {
        displayMode: "overlay",
        theme: "light",
        locale: "en",
        successUrl: `${window.location.origin}/payment/success`,
      },
    });

    setIsLoading(false);
  };

  const glassInputClassName =
    "w-full py-4 px-5 text-base rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] placeholder:text-[#1a1a2e]/40 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-white/70" />
          <p className="font-bold text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Your details
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-[50%]">
            <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-1.5">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              value={values.firstName}
              placeholder="First Name"
              onChange={(e) => setFieldValue("firstName", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.firstName ? errors.firstName : undefined}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-1.5">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              value={values.lastName}
              placeholder="Last Name"
              onChange={(e) => setFieldValue("lastName", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.lastName ? errors.lastName : undefined}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
          <Input
            id="email"
            name="email"
            value={values.email}
            placeholder="E-mail"
            onChange={(e) => setFieldValue("email", e.target.value)}
            className={glassInputClassName}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />
        </div>
      </div>

      {/* Payment info block */}
      <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-white/70" />
          <p className="font-medium text-sm text-white/80">
            Card details will be entered securely via Paddle
          </p>
        </div>
        <div className="flex items-center gap-4 text-white/50 text-xs">
          <div className="flex items-center gap-1.5">
            <Shield size={14} />
            <span>256-bit SSL encryption</span>
          </div>
          <span>Visa, Mastercard, PayPal & more</span>
        </div>
      </div>

      <Button
        variant="ghost"
        className="group relative w-full py-6 px-6 text-xl font-bold uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl overflow-hidden text-white shadow-xl backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 hover:text-white"
        type="submit"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        {isLoading ? (
          <>
            <div className="relative z-10 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            <span className="relative z-10">Processing...</span>
          </>
        ) : (
          <>
            <CreditCard size={20} className="relative z-10" />
            <span className="relative z-10">Proceed to Payment</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
