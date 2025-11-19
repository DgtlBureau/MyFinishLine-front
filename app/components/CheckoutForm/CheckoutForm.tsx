"use client";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import ImageBadge from "../ChallengesPayment/ImageBadge/ImageBadge";
import Image from "next/image";
import Loader from "../Shared/Loader/Loader";

const PaymentForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardNumber = elements.getElement(CardNumberElement);
      const cardExpiry = elements.getElement(CardExpiryElement);
      const cardCvc = elements.getElement(CardCvcElement);

      if (!cardNumber || !cardExpiry || !cardCvc) {
        setError("Card elements not found");
        setLoading(false);
        return;
      }

      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumber,
          billing_details: {
            email: email,
            name: `${firstName} ${lastName}`.trim(),
          },
        });

      if (pmError) {
        setError(pmError.message || "Failed to create payment method");
        setLoading(false);
        return;
      }

      if (!paymentMethod) {
        setError("Failed to create payment method");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: +String(total?.toFixed(2)).replace(".", ""),
          currency: "usd",
        }),
      });

      const intentData = await response.json();

      if (intentData.error) {
        setError(intentData.error);
        setLoading(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(intentData.clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        // Success
        window.location.href = `${window.location.origin}/payment/success`;
      } else {
        // Error
        setError(`Payment status: ${paymentIntent?.status}`);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        backgroundColor: "#ffffff",
        lineHeight: "24px",
        fontWeight: "400",
      },
      invalid: {
        color: "#9e2146",
        backgroundColor: "#ffffff",
      },
    },
    showIcon: true,
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-white font-bold text-3xl">
        Sign up for your challenges
      </h2>
      <fieldset className="rounded-md bg-[#F7F7F7] p-7 mt-6">
        <h3 className="font-bold text-2xl">Your details</h3>
        <input
          className="border p-4 border-neutral-300 rounded w-full bg-white mt-2 transition-colors outline-none focus:border-orange-400 focus:shadow-lg"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="mt-2 flex gap-2">
          <input
            className="border p-4 border-neutral-300 rounded w-full bg-white transition-colors outline-none focus:border-orange-400 focus:shadow-lg"
            placeholder="First name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="border p-4 border-neutral-300 rounded w-full bg-white transition-colors outline-none focus:border-orange-400 focus:shadow-lg"
            placeholder="Last name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </fieldset>

      <fieldset className="mt-8 rounded-md bg-[#F7F7F7] p-7">
        <h3 className="font-bold text-2xl">Payment</h3>
        <p className="mt-2 text-xs text-[#424242]">
          All transactions are secure and encrypted. Credit card information is
          never stored on our servers.
        </p>

        <div className="border border-neutral-300 rounded mt-2 bg-white transition-colors outline-none focus-within:border-orange-400 focus-within:shadow-lg ">
          <div className="p-4">
            <CardNumberElement options={cardElementOptions} className="" />
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="border border-neutral-300 rounded w-full bg-white transition-colors outline-none focus-within:border-orange-400 focus-within:shadow-lg">
            <div className="p-4">
              <CardExpiryElement
                options={cardElementOptions}
                className="font-montserrat"
              />
            </div>
          </div>
          <div className="border border-neutral-300 rounded w-full bg-white transition-colors outline-none focus-within:border-orange-400 focus-within:shadow-lg">
            <div className="p-4">
              <CardCvcElement
                options={cardElementOptions}
                className="font-montserrat"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 mt-4 p-3 bg-red-50 rounded">{error}</div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex justify-center items-center mt-4 w-full h-14 rounded-lg bg-orange-400 px-4 py-3 text-2xl font-bold text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          {loading ? <Loader /> : `Pay $${total?.toFixed(2)}`}
        </button>
      </fieldset>
      <section className="flex mx-auto w-fit mt-10">
        <ImageBadge
          imageSrc="/images/payment/badge1.png"
          text="We protect & respect your privacy"
        />
        <ImageBadge
          imageSrc="/images/payment/badge2.png"
          text="Your information is secure"
        />
        <ImageBadge
          imageSrc="/images/payment/badge3.png"
          text="Award winning service"
        />
      </section>
      <section className="mt-4 border-t border-neutral-200 pt-4 flex justify-between">
        <div className="flex gap-2">
          <Image src="/icons/email.svg" width={24} height={24} alt="Email" />
          <div>
            <p className="text-xs font-bold">Email support</p>
            <a className="block text-xs" href="mailto:myfinishline@gmail.com">
              myfinishline@gmail.com
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <Image src="/icons/chat.svg" width={24} height={24} alt="Email" />
          <div>
            <p className="text-xs font-bold">Chat with us</p>
            <p className="block text-xs">
              Click the chat widget at the bottom right
            </p>
          </div>
        </div>
      </section>
    </form>
  );
};

export default PaymentForm;
