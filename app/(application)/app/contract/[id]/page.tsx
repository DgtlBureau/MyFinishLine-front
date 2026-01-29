"use client";

import { IContract } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/app/lib/hooks";
import Image from "next/image";
import { ChevronLeft, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";

const ContractPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challenge = useAppSelector((state) => state.challenge);
  const [imageError, setImageError] = useState(false);
  const [rewardImageError, setRewardImageError] = useState(false);

  const contract: IContract | null = useMemo(() => {
    const data = searchParams.get("data");
    if (!data) return null;
    try {
      return JSON.parse(decodeURIComponent(data));
    } catch {
      return null;
    }
  }, [searchParams]);

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#5170D5] via-[#8BA3E0] via-25% to-[#CEE9D8]">
        <p className="text-white/70">Contract not found</p>
      </div>
    );
  }

  const rewards = [
    ...contract.badges,
    ...contract.banners,
    ...contract.frames,
    ...contract.skins,
  ];
  const firstReward = rewards[0];
  const rewardImageUrl = firstReward?.image_url;
  const contractImageUrl = contract.image_url;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5170D5] via-[#8BA3E0] via-25% to-[#CEE9D8]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/40 to-white/30 backdrop-blur-3xl backdrop-saturate-200 border-b border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex flex-1 gap-1 font-medium py-4 cursor-pointer text-gray-800"
          >
            <ChevronLeft />
          </button>
          <Image
            className="max-h-5 w-fit"
            src="/images/logo-line.png"
            width={957}
            height={489}
            alt="Logo"
          />
          <button
            className="flex flex-1 items-center justify-end gap-2"
            onClick={() => router.push("/app/profile/settings")}
          >
            <Settings color="#374151" />
          </button>
        </div>
      </header>

      <div className="pt-20 px-5 pb-10">
        {/* Challenge info */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="font-bold text-3xl leading-9 text-white drop-shadow-sm">
            {challenge?.name || "Challenge"}
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Here you can see your next goals to achieve
          </p>
        </motion.div>

        {/* Contract card */}
        <motion.div
          className="bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-3xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] p-5 mx-auto max-w-md"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {/* Contract image - full width */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
          >
            {contractImageUrl && !imageError ? (
              <Image
                src={contractImageUrl}
                alt={contract.name}
                width={400}
                height={200}
                className="w-full h-auto object-cover rounded-2xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full aspect-[2/1] flex items-center justify-center bg-white/40 rounded-2xl">
                <Image
                  src="/icons/myfinishline-placeholder.png"
                  alt="MyFinishLine"
                  width={120}
                  height={36}
                  className="opacity-40 object-contain"
                />
              </div>
            )}
          </motion.div>

          {/* Contract name */}
          <motion.h2
            className="font-semibold text-xl text-[#09090B] mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          >
            {contract.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-sm text-[#71717A] leading-5 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
          >
            {contract.description}
          </motion.p>

          {/* Reward thumbnail below description */}
          {rewardImageUrl && !rewardImageError && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              <div className="w-20 h-20 rounded-xl bg-white/60 backdrop-blur-md border border-white/50 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src={rewardImageUrl}
                  alt={firstReward?.title || "Reward"}
                  width={72}
                  height={72}
                  className="object-contain"
                  onError={() => setRewardImageError(true)}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractPage;
