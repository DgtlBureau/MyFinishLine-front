"use client";

import { Suspense, useEffect, useState } from "react";
import ChallengesPayment from "@/app/components/ChallengesPayment/ChallengesPayment";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IProduct } from "@/app/types";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { sendGTMEvent } from "@next/third-parties/google";

export default function PaymentPage() {
  const [total, setTotal] = useState<number>(0);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleLoadProducts = async () => {
    try {
      const { data }: { data: IProduct[] } = await axios.get(
        "/api/payment/products",
      );
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendGTMEvent({
      event: "page_view",
      page_location: "/payment",
      page_path: "/payment",
      page_title: "Payment",
    });
    if (!products.length) {
      handleLoadProducts();
    }
  }, []);

  return (
    <Suspense>
      <div className="min-h-screen mt-24 bg-linear-to-b from-indigo-white via-[#C3B7E2] to-pink-white">
        <div className="relative flex flex-col gap-10 z-10 container mx-auto px-6 max-w-7xl mt-4">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl">Sign Up for your Challenge</h1>
            <p className="text-lg">All transactions are secure and encrypted</p>
          </div>
          <div className="flex pb-5 w-full">
            {/* <Element stripe={stripePromise} options={options}>
            <PaymentForm total={total} />
            </Element> */}
            {!!products.length && (
              <ChallengesPayment
                products={products}
                handleUpdateTotal={setTotal}
              />
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
