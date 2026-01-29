"use client";

import { Suspense, useEffect, useState } from "react";
import ChallengesPayment from "@/app/components/ChallengesPayment/ChallengesPayment";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IProduct } from "@/app/types";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { motion } from "motion/react";

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
    if (!products.length) {
      handleLoadProducts();
    }
  }, []);

  return (
    <Suspense>
      <div className="min-h-screen pt-24 pb-10">
        <div className="relative flex flex-col gap-10 z-10 container mx-auto px-6 max-w-7xl mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-3"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-tight">
              Sign Up for your Challenge
            </h1>
            <p className="text-lg text-white/70 font-medium">
              All transactions are secure and encrypted
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex pb-5 w-full"
          >
            {!!products.length && (
              <ChallengesPayment
                products={products}
                handleUpdateTotal={setTotal}
              />
            )}
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
