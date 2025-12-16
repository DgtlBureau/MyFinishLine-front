"use client";

import Noise from "@/app/components/Shared/Noise/noise";
import content from "@/app/lib/content/landing/content";
import { FaqShortComponent } from "../../Faq/FaqIframe/FaqIframe";

export default function FAQSection() {
  return (
    <section className="section-padding relative">
      <Noise />
      <div className="container">
        <h2 className="text-4xl leading-tight tracking-tight lg:text-5xl">
          {content.faq_section.title}
        </h2>

        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <FaqShortComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
