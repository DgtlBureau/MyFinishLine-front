"use client";

import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
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
    return null;
  }

  return (
    <>
      <LumenBackgroundBlock className="!p-0 mb-20">
        <ChallengeHero
          title={product.name}
          description={product.description}
          image={product?.images}
          distance={product?.challenge_info?.total_distance}
        />
      </LumenBackgroundBlock>
      {product?.content && <section className="section-padding bg-gradient-to-b from-white from-10% via-indigo-300/90 via-70% to-white-50">
        <ChallengeContent content={product?.content} />
      </section>}

      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white from-10% via-green-300/20 via-30% to-white-50">
        <div className="relative w-full py-10 flex items-center justify-center px-4 md:px-2">
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
