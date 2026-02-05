"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { Payment } from "@/app/components/Payment/Payment";
import ImageBadge from "@/app/components/ChallengesPayment/ImageBadge/ImageBadge";
import { motion } from "motion/react";
import { fetchChallengesList } from "@/app/lib/utils/challengesCache";
import Loader from "@/app/components/Shared/Loader/Loader";
import NextImage from "next/image";
import { IProduct, CurrencieSymbols } from "@/app/types";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";

interface ChallengeItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  currency: string | null;
  product_id: string | null;
  paddle_price_id: string | null;
  total_distance: number;
  total_distance_mile: number;
  status: { id: number; name: string; type: string };
}

function mapChallengeToProduct(challenge: ChallengeItem): IProduct {
  return {
    name: challenge.name,
    description: challenge.description || "",
    main_image: challenge.image_url || "",
    images: challenge.image_url || "",
    paddle_product_id: challenge.product_id || "",
    prices: {
      amount: challenge.price != null ? String(challenge.price * 100) : "0",
      currency: (challenge.currency || "USD") as "EUR" | "USD",
      paddle_price_id: challenge.paddle_price_id || "",
    },
    challenge_info: {
      id: challenge.id,
      name: challenge.name,
      total_distance: challenge.total_distance,
      total_distance_mile: challenge.total_distance_mile,
    } as any,
    content: [],
  };
}

function OtherChallengeCard({ challenge }: { challenge: ChallengeItem }) {
  const symbol = challenge.currency === "EUR" ? "\u20AC" : "$";

  return (
    <Link
      href={`/payment?challenge_id=${challenge.id}`}
      className="flex flex-col rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all group"
    >
      {challenge.image_url && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <NextImage
            src={challenge.image_url}
            fill
            alt={challenge.name}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      <div className="flex items-center justify-between p-4 gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{challenge.name}</p>
          {challenge.price != null && challenge.price > 0 && (
            <p className="text-white/60 text-xs">
              {symbol}{challenge.price}
            </p>
          )}
        </div>
        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-white/25 transition-colors">
          <ArrowRight size={14} className="text-white" />
        </div>
      </div>
    </Link>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge_id");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [otherChallenges, setOtherChallenges] = useState<ChallengeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!challengeId) return;

    fetchChallengesList()
      .then((data) => {
        const current = data.find(
          (c: ChallengeItem) => c.id === Number(challengeId)
        );
        if (current) {
          setProduct(mapChallengeToProduct(current));
        }
        const others = data.filter(
          (c: ChallengeItem) =>
            c.id !== Number(challengeId) &&
            c.status?.type === "active"
        );
        setOtherChallenges(others);
      })
      .finally(() => setIsLoading(false));
  }, [challengeId]);

  if (!challengeId) {
    redirect("/");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    redirect("/");
  }

  return (
    <div className="min-h-screen pt-24 pb-10 relative overflow-hidden bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]">
      {/* Decorative blurred orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B5CC6]/30 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4DA67A]/25 blur-[120px]" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#5170D5]/20 blur-[100px]" />

      <div className="relative flex flex-col gap-10 z-10 container mx-auto px-6 max-w-7xl mt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span className="text-base font-medium">Back</span>
        </button>

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
          className="flex flex-col pb-5 w-full"
        >
          <Payment product={product} />
        </motion.div>

        {/* Other Challenges */}
        {otherChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                Explore More Challenges
              </h2>
              <p className="text-sm text-white/60">
                Add another adventure to your journey
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherChallenges.map((c) => (
                <OtherChallengeCard key={c.id} challenge={c} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Badges & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-6 pb-5"
        >
          <section className="flex space-x-4 mx-auto w-fit">
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
          <section className="border-t border-white/20 pt-4 w-full">
            <div className="flex flex-col max-w-fit mx-auto gap-4">
              <div className="flex gap-2">
                <NextImage
                  src="/icons/email.svg"
                  width={24}
                  height={24}
                  alt="Email"
                  className="brightness-0 invert opacity-70"
                />
                <div>
                  <p className="text-xs font-bold text-white/80">Email support</p>
                  <a
                    className="block text-xs text-white/60 hover:text-white/80 transition-colors"
                    href="mailto:myfinishline@gmail.com"
                  >
                    myfinishline@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        {/* FAQ */}
        <FAQSection />
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
