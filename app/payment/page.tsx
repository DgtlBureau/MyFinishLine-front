"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import PaymentForm from "../components/CheckoutForm/CheckoutForm";
import ChallengesPayment from "../components/ChallengesPayment/ChallengesPayment";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  { locale: "en" }
);

export default function PaymentPage() {
  const [total, setTotal] = useState<number>(0);

  const options = {
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
    // appearance: {
    //   theme: "stripe" as const,
    // },
  };

  return (
    <div className="min-h-screen py-12">
      <div className="absolute inset-0 bg-black bg-center bg-no-repeat h-40 lg:h-80">
        <Image
          className="object-cover opacity-15"
          src="/images/payment/top-cover.png"
          fill
          alt="Top cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 max-w-7xl mt-4">
        <h1 className="text-6xl text-white mb-10 text-center uppercase font-stencil">
          MyFinish<span className="text-orange-400">Line</span>
        </h1>
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-12">
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm total={total} />
          </Elements>
          <ChallengesPayment handleUpdateTotal={setTotal} />
        </div>
      </div>
    </div>
  );
}
