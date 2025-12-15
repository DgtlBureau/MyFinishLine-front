"use client";

import { ChevronRightIcon, MessageSquare } from "lucide-react";
import Link from "next/link";

import Noise from "@/app/components/Shared/Noise/noise";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import content from "@/app/lib/content/landing/content";
import { FaqAccordion } from "../../Faq/FaqAccordion/Accordion";
import { faqData } from "@/app/data/faqData";

// const faqData = content.faq_section.questions;

const filteredData = faqData.find((item) => item.category === "authorization");

export default function FAQSection() {
  return (
    <section className="section-padding relative">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <h2 className="text-4xl leading-tight tracking-tight lg:text-5xl">
          {content.faq_section.title}
        </h2>

        {/* FAQ Content */}
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2">
          {/* FAQ Accordion - Left Side */}
          <div className="lg:col-span-2">
            {/* <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-input hover:shadow-primary/5 rounded-lg !border px-6 py-2 transition-all duration-300 hover:shadow-md"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline md:text-lg lg:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
            {filteredData && (
              <FaqAccordion items={filteredData?.variants} search="" />
            )}
          </div>

          {/* <Card className="hover:shadow-primary/5 h-full gap-6 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="gap-6 md:gap-8 lg:gap-11">
              <MessageSquare className="text-secondary size-18 stroke-1 md:size-20" />

              <h3 className="text-2xl">
                {content.faq_section.contact_block.title}
              </h3>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground">
                {content.faq_section.contact_block.description}
              </p>
            </CardContent>
            <CardFooter className="mt-auto justify-self-end">
              <Button
                size="lg"
                variant="light"
                className="group h-12 w-full gap-4"
                asChild
              >
                <Link href="/contact">
                  {content.faq_section.contact_block.button_label}
                  <div className="bg-border border-input grid size-5.5 place-items-center rounded-full border">
                    <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.25" />
                  </div>
                </Link>
              </Button>
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
