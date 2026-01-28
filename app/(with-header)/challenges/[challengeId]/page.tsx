"use client";

import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import LumenBackgroundBlock from "@/app/components/Shared/LumenBackgroundBlock/LumenBackgroundBlock";
import ChallengeContent from "@/app/components/ChallengePage/ChallengePage";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useParams } from "next/navigation";
import { Currencies, IProduct } from "@/app/types";
import { useEffect } from "react";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import axios from "axios";

const page = () => {
  const { challengeId } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const product: IProduct = products.find(
    (product) => product.challenge_info.id === Number(challengeId),
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

    paddle_product_id: "",
    challenge_info: {
      completed_at: "",
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
    <>
      <LumenBackgroundBlock className="!p-0 mb-20">
        <ChallengeHero
          title={product.name}
          description={product.description}
          image={product.main_image}
          distance={product.challenge_info.total_distance}
        />
      </LumenBackgroundBlock>
      <section className="section-padding bg-gradient-to-b from-white from-10% via-indigo-300/90 via-70% to-white-50">
        <ChallengeContent content={product.content} />
      </section>

      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white from-10% via-green-300/20 via-30% to-white-50">
        <div className="relative w-full py-10 flex items-center justify-center px-4 md:px-2">
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
