"use client";

import { motion } from "framer-motion";

export default function MoneyBackBanner() {
  return (
    <section className="flex justify-center py-6 md:py-12 w-full px-4 md:px-8">
      <div
        className="max-w-[960px] w-full rounded-3xl px-6 md:px-[120px] py-6 md:py-9 flex flex-col md:flex-row items-center gap-6 md:gap-[60px] border border-white/20 bg-white/10 backdrop-blur-xl"
      >
        {/* Money Back Guarantee Badge */}
        <motion.div
          className="flex-shrink-0 w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
          initial={{ scale: 2.5, rotate: -25, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img
            src="/images/money-back-badge.svg"
            alt="Money Back Guarantee"
            className="w-full h-full"
          />
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left">
          <h3 className="font-semibold text-2xl md:text-[36px] text-white leading-tight md:leading-none tracking-[-0.72px] whitespace-nowrap">
            Money-Back Guarantee
          </h3>
          <p className="font-normal text-sm md:text-base text-white/90 leading-relaxed md:leading-7">
            Unable to continue participating or start the quest? Contact us,
            <br className="hidden md:block" />
            and we&apos;ll issue a refund.
          </p>
        </div>
      </div>
    </section>
  );
}
