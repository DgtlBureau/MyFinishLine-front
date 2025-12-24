"use client";

import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import { cn } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useParams } from "next/navigation";
import { Currencies, IProduct } from "@/app/types";
import { useEffect } from "react";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import axios from "axios";

interface IChallengesPageProps {
  params: {
    challengeId: string;
  };
}

const page = ({ params }: IChallengesPageProps) => {
  const { challengeId } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const product: IProduct = products.find(
    (product) => product.challenge_info.id === Number(challengeId)
  ) || {
    name: "",
    description: "",
    images: [],
    main_image: "",
    content: [],
    prices: [
      {
        amount: 0,
        currency: Currencies.EUR,
        stripe_price_id: "",
      },
    ],
    stripe_product_id: "",
    challenge_info: {
      is_completed: false,
      background_images: [
        {
          id: 0,
          image_url: "",
          challenge_id: 0,
        },
      ],
      description: "",
      id: 0,
      name: "",
      status: {
        id: null,
        name: "",
        type: "",
      },
      status_id: 0,
      steps: [],
      total_distance: "",
      activate_date: "",
      user_distance: 0,
    },
  };

  const handleLoadProducts = async () => {
    try {
      const { data }: { data: IProduct[] } = await axios.get(
        "/api/payment/products"
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
    <>
      <LumenBackgroundBlock>
        <ChallengeHero
          id={product?.challenge_info.id}
          title={product.name}
          description={product.description}
          image={product.main_image}
          distance={product.challenge_info.total_distance}
        />
      </LumenBackgroundBlock>
      <section className="mt-40">
        <ChallengeContent content={product.content} />
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute size-full mask-t-from-50% mask-t-to-100% mask-b-from-50% mask-b-to-90%">
          <div
            className={cn(
              "bg-chart-2 absolute size-full rounded-full blur-3xl will-change-transform",
              "top-0 left-0 -translate-y-1/3 md:-translate-x-1/3 md:translate-y-0"
            )}
          />
          <div
            className={cn(
              "bg-chart-3 absolute size-full rounded-full blur-3xl will-change-transform",
              "right-0 bottom-0 translate-y-1/3 md:top-0 md:translate-x-1/3 md:translate-y-0"
            )}
          />
        </div>
        <div className="relative w-full py-10 flex items-center justify-center">
          <PurchaseChallenge
            title={product.name}
            price={product.prices?.[0]}
            id={product.challenge_info.id}
            imageSrc={product.main_image}
          />
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default page;
