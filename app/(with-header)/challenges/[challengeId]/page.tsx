"use client";

import ChallengeHero from "@/app/components/ChallengePage/ChallengeHero/ChallengeHero";
import PurchaseChallenge from "@/app/components/ChallengePage/PurchaseChallenge/PurchaseChallenge";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import HowItWorks from "@/app/components/Landing/HowItWorks";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/app/components/Shared/Loader/Loader";
interface ChallengeDetail {
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

const page = () => {
  const { challengeId } = useParams();
  const router = useRouter();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/challenges/list")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const found = data.find((c: ChallengeDetail) => c.id === Number(challengeId));
          setChallenge(found || null);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [challengeId]);

  useEffect(() => {
    if (!isLoading && !challenge) {
      router.push("/");
    }
  }, [isLoading, challenge, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!challenge) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]">
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B5CC6]/20 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4DA67A]/15 blur-[120px]" />

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-20 pt-20 px-6 md:px-12 lg:px-16">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-base font-medium">Back</span>
          </button>
        </div>
        <ChallengeHero
          title={challenge.name}
          description={challenge.description || ""}
          image={challenge.image_url || ""}
          distance={String(challenge.total_distance)}
          distanceMile={challenge.total_distance_mile}
        />
      </div>

      <HowItWorks />

      <section className="relative z-10">
        <div className="relative w-full py-16 flex items-center justify-center px-4 md:px-2">
          <PurchaseChallenge
            title={challenge.name}
            price={challenge.price != null && challenge.paddle_price_id ? {
              amount: String(challenge.price * 100),
              currency: (challenge.currency || "USD") as "EUR" | "USD",
              paddle_price_id: challenge.paddle_price_id,
            } : null}
            id={challenge.id}
            imageSrc={challenge.image_url || ""}
            description={challenge.description || ""}
            distance={String(challenge.total_distance)}
            distanceMile={challenge.total_distance_mile}
          />
        </div>
      </section>
      <FAQSection />
    </div>
  );
};

export default page;
