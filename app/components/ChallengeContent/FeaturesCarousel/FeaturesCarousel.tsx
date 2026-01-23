"use client";

import { initializePaddle } from "@paddle/paddle-js";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Noise from "@/app/components/Shared/Noise/noise";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import { cn } from "@/app/lib/utils";
import content from "@/app/lib/content/landing/content";
import Link from "next/link";
import axios from "axios";
import { IProduct } from "@/app/types";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { paddleInstance } from "@/app/lib/utils/instance";

export default function FeaturesCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
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

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    api?.scrollTo(index);
  };

  const handleGetProducts = async () => {
    try {
      const data: { data: IProduct[] } = await axios.get(
        "/api/payment/products",
      );
      if (data.data.length) {
        dispatch(setProducts(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
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
      <div className="container gap-8 lg:grid-cols-3">
        <h2 className="text-4xl tracking-tight text-balance flex flex-col text-center text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Choose Your
          <span className="bg-gradient-to-r from-[#3B559D] to-[#66AF69] bg-clip-text text-transparent">Adventure Quest</span>
        </h2>
        <p className="block mt-4 text-muted-foreground text-lg leading-snug text-center">
          {content.challenges.description}
        </p>
        <motion.div
          className="mt-4 select-none md:mask-r-from-60% md:mask-r-to-100% lg:col-span-2"
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
            <CarouselContent className="h-full">
              {products?.map((product) => {
                return (
                  <CarouselItem
                    key={product.challenge_info.id}
                    className="h-full md:basis-[40%]"
                  >
                    <Link href={`/challenges/${product.challenge_info.id}`}>
                      <Card className="bg-border border-input aspect-284/362 h-full pb-0! transition-all duration-300 hover:shadow-lg lg:aspect-384/562">
                        <CardHeader>
                          <CardTitle className="text-lg leading-tight md:text-2xl lg:text-3xl">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="text-sm md:text-lg">
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative h-full">
                          <div className="bg-card dark:bg-card-foreground border-input relative h-full overflow-hidden rounded-lg border">
                            <Image
                              src={product.main_image}
                              alt="Product image"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className={cn(
                                "object-cover transition-transform duration-300 hover:scale-105 p-0!",
                              )}
                            />
                          </div>
                          <div className="to-chart-4 absolute inset-0 bg-linear-to-b from-transparent from-70%"></div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div className="mt-6 hidden flex-1 items-end justify-center gap-1 lg:flex">
              {products?.map((product, index) => (
                <button
                  key={product.challenge_info.id}
                  onClick={() => handleFeatureClick(index)}
                  className={cn(
                    "size-1.5 cursor-pointer rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-foreground"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          ></motion.div>

          <motion.div
            className="mt-2 w-fit mx-auto flex justify-between gap-2"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {products?.map((product, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={product.challenge_info.id}
                  onClick={() => handleFeatureClick(index)}
                  variants={buttonVariants}
                  className={cn(
                    `border-input hover:bg-border/50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-sm border transition-all duration-300`,
                    isActive && "bg-border",
                  )}
                >
                  {index + 1}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            className="flex flex-1 items-end justify-center gap-1 lg:hidden"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {products?.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleFeatureClick(index)}
                variants={buttonVariants}
                className={cn(
                  "size-1.5 cursor-pointer rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
