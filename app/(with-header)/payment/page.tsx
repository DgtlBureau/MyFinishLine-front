"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Image from "next/image";
import PaymentForm from "@/app/components/CheckoutForm/CheckoutForm";
import ChallengesPayment from "@/app/components/ChallengesPayment/ChallengesPayment";
import Logo from "@/app/components/Shared/Logo/Logo";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  { locale: "en" }
);

export default function PaymentPage() {
  const [total, setTotal] = useState<number>(0);

  const options = {
    appearance: {
      theme: "stripe" as const,
    },
  };

  return (
    <div className="min-h-screen">
      <div className="relative inset-0 bg-black bg-center bg-no-repeat h-40 lg:h-80">
        <Image
          className="object-cover opacity-15"
          src="/images/payment/top-cover.png"
          fill
          alt="Top cover"
        />
        <div className="absolute flex justify-center items-center w-full h-full">
          <Logo className="mb-10" />
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4 max-w-7xl mt-4">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-12 pb-100">
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm total={total} />
          </Elements>
          <ChallengesPayment handleUpdateTotal={setTotal} />
        </div>
      </div>
    </div>
  );
}
