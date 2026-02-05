"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Noise from "@/app/components/Shared/Noise/noise";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import content from "@/app/lib/content/landing/content";
import axios from "axios";
import { Button } from "../../ui/button";
import questImage from '@/public/images/landing/quest.webp'
import { ArrowRight, Route } from 'lucide-react'
import { useRouter } from "next/navigation";

interface ChallengeItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  currency: string | null;
  total_distance: number;
  total_distance_mile: number;
  status: { id: number; name: string; type: string };
}

function useIsImperial() {
  if (typeof navigator === "undefined") return false;
  const lang = navigator.language || "";
  return ["en-US", "en-GB", "en-MM", "en-LR"].some((l) => lang.startsWith(l));
}

export default function FeaturesCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const router = useRouter();

  const headerVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 25,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 60,
      scale: 0.95,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const handleChooseQuest = (questId: string | number) => {
    router.push(`/challenges/${questId}`);
  };

  useEffect(() => {
    axios
      .get("/api/challenges/list")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setChallenges(data.filter((c: ChallengeItem) => c.status?.type === "active"));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="challenges"
      className="section-padding relative overflow-x-hidden"
    >
      <Noise />

      <div className="gap-8 lg:grid-cols-3">
        <h2 className="px-[22px] text-balance flex flex-col text-center text-2xl leading-tight tracking-tight sm:text-3xl md:text-5xl lg:text-6xl text-white font-bold">
          Choose Your
          <span className="bg-gradient-to-r from-[#6B8BFF] to-[#7FD4A0] bg-clip-text text-transparent">Adventure Quest</span>
        </h2>
        <p className="px-[22px] block mt-3 md:mt-4 text-white/70 text-base md:text-lg leading-snug text-center">
          {content.challenges.description}
        </p>
        <div>
          <motion.div
            className="mt-4 container select-none lg:col-span-2"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                skipSnaps: false,
              }}
              className="cursor-grab"
            >
              <CarouselContent className="h-full mt-10">
                {challenges.map((challenge) => (
                    <CarouselItem
                      key={challenge.id}
                      className="h-full basis-full"
                    >
                      <div className="relative flex flex-col rounded-2xl md:rounded-3xl p-5 sm:p-7 lg:p-9 w-full overflow-hidden aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/9]">
                        <p className="flex items-center gap-1.5 z-10 text-xs sm:text-[14px] font-regular leading-6 text-white/80"><Route width={20} height={20} /> {useIsImperial() ? `${challenge.total_distance_mile >= 100 ? challenge.total_distance_mile.toLocaleString('en-US', { maximumFractionDigits: 0 }) : challenge.total_distance_mile.toFixed(2)} mi` : `${(challenge.total_distance / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} km`}</p>
                        <div className="mt-auto z-10">
                          <h3 className="text-lg sm:text-xl lg:text-[24px] font-semibold leading-7 lg:leading-8 text-white">{challenge.name}</h3>
                          {challenge.description && <p className="text-xs sm:text-[14px] leading-5 sm:leading-6 text-white/70">{challenge.description}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-4 lg:mt-[35px] z-10">
                          <Button
                            onClick={() => handleChooseQuest(challenge.id)}
                            className="py-2 px-4 sm:py-[10px] sm:px-5 rounded-full text-xs sm:text-sm leading-5"
                          >
                            Choose a Quest
                            <ArrowRight width={16} height={16} />
                          </Button>
                          {challenge.price != null && challenge.price > 0 && (
                            <p className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-white">
                              {challenge.currency === "EUR" ? "\u20AC" : "$"}{challenge.price}
                            </p>
                          )}
                        </div>
                        <Image src={questImage} fill alt={challenge.name} className="object-cover object-center -z-10" />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[60%] backdrop-blur-md z-0"
                          style={{
                            WebkitMaskImage:
                              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
                            maskImage:
                              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <motion.div
              className="space-y-4"
              initial={prefersReducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headerVariants}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
