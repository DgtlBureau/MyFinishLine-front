"use client";

import content from "@/app/lib/content/landing/content";
import { FaqShortComponent } from "../../Faq/FaqIframe/FaqIframe";
import { motion } from "motion/react";

export default function FAQSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl leading-tight tracking-tight lg:text-5xl text-white"
        >
          {content.faq_section.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2"
        >
          <div className="lg:col-span-2">
            <FaqShortComponent />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
