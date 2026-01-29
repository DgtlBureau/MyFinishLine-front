"use client";

import Image from "next/image";
import warrantyIcon from '@/public/icons/warranty-seal.svg'

import Noise from "@/app/components/Shared/Noise/noise";
import content from "@/app/lib/content/landing/content";
import { FeedbackCarusel } from "./FeedbackCarusel/FeedbackCarusel";

export default function Testimonials() {

  return (
    <section className="section-padding relative overflow-x-hidden bg-gradient-to-b from-white from-10% via-green-300/20 via-30% to-white-50">
      <Noise />
      <div className="container flex flex-col gap-10">

        <div className="mx-auto max-w-4xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl text-center">
            {content.feedback_block.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance text-center">
            {content.feedback_block.description}
          </p>
        </div>

        <FeedbackCarusel />

        <div className="p-6 sm:p-8 md:p-[36px_95px] mt-8 md:mt-15 m-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-15 rounded-2xl md:rounded-3xl max-w-[960px] bg-gradient-to-b from-[#5170D5] to-[#CEE9D8]">
          <Image src={warrantyIcon} width={150} height={150} alt="warranty" className="w-20 h-20 sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px]" />
          <div className="flex flex-col gap-3 md:gap-5 text-white text-center sm:text-left">
            <p className="text-2xl sm:text-3xl md:text-5xl font-semibold">Money-Back Guarantee</p>
            <span className="text-sm sm:text-base md:text-lg leading-6 md:leading-7">Unable to continue participating or start the quest? Contact us, and we'll issue a refund.</span>
          </div>
        </div>
      </div>
    </section>
  );
}