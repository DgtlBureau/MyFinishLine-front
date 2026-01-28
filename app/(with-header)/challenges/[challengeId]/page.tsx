"use client";

import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import { cn } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { IProduct } from "@/app/types";
import { useEffect, useState } from "react";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import axios from "axios";
import Loader from "@/app/components/Shared/Loader/Loader";

const page = () => {
  const { challengeId } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const product = products.find(
    (product) =>
      product.paddle_product_id === challengeId ||
      product.challenge_info?.id === Number(challengeId)
  );

  const handleLoadProducts = async () => {
    try {
      const { data }: { data: IProduct[] } = await axios.get(
        "/api/payment/products",
      );
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!products.length) {
      handleLoadProducts();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // If products are loaded and product is not found, redirect to home
    if (!isLoading && !product) {
      router.push("/");
    }
  }, [isLoading, product, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <LumenBackgroundBlock>
        <ChallengeHero
          id={product.challenge_info?.id || 0}
          title={product.name}
          description={product.description}
          image={product.main_image || product.images}
          distance={product.challenge_info?.total_distance || product.name}
        />
      </LumenBackgroundBlock>
      <section className="mt-40">
        <ChallengeContent content={product.content || []} />
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute size-full mask-t-from-50% mask-t-to-100% mask-b-from-50% mask-b-to-90%">
          <div
            className={cn(
              "bg-chart-2 absolute size-full rounded-full blur-3xl will-change-transform",
              "top-0 left-0 -translate-y-1/3 md:-translate-x-1/3 md:translate-y-0",
            )}
          />
          <div
            className={cn(
              "bg-chart-3 absolute size-full rounded-full blur-3xl will-change-transform",
              "right-0 bottom-0 translate-y-1/3 md:top-0 md:translate-x-1/3 md:translate-y-0",
            )}
          />
        </div>
        <div className="relative w-full py-10 flex items-center justify-center">
          <PurchaseChallenge
            title={product.name}
            price={product.prices}
            id={product.paddle_product_id}
            imageSrc={product.main_image || product.images}
          />
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default page;
