"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I join a challenge?",
    answer: "Simply create an account, browse our available quests, and click 'Choose a Quest' on any adventure that interests you. You'll be guided through the setup process to start your journey.",
  },
  {
    question: "Can I participate from any country?",
    answer: "Yes! MyFinishLine is available worldwide. You can join quests and track your progress from anywhere in the world with an internet connection.",
  },
  {
    question: "Do I need to be a professional athlete?",
    answer: "Not at all! Our quests are designed for all fitness levels. Whether you're just starting your fitness journey or you're an experienced athlete, there's a quest for you.",
  },
  {
    question: "How do I track my distance?",
    answer: "You can connect popular fitness apps like Strava, Garmin, or Apple Health, or manually enter your activity data. We support walking, running, cycling, and many other activities.",
  },
  {
    question: "What types of exercise count?",
    answer: "Walking, running, cycling, swimming, hiking, and many other cardio activities count toward your quest progress. Any movement that covers distance can be tracked!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="flex flex-col items-center py-12 md:py-24 w-full">
      <div className="max-w-[1280px] px-4 md:px-8 w-full">
        <div className="flex flex-col gap-8 md:gap-14 items-center justify-center w-full">
          {/* Title */}
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-[48px] text-center tracking-[-1px] md:tracking-[-1.92px] text-white leading-tight md:leading-none w-full">
            Frequently asked questions:
          </h2>

          {/* FAQ Items */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-[35px] px-3 md:px-[17px] py-3 md:py-[18px] w-full max-w-[1216px]">
            <div className="flex flex-col gap-2 md:gap-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl px-3 md:px-5 py-4 md:py-[22px] w-full transition-all duration-300 hover:bg-white/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-sm md:text-base text-white leading-5 md:leading-none">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-white/70 transition-transform duration-200 flex-shrink-0 ml-2 md:ml-4 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-in-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-3 md:mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="text-xs md:text-sm text-white/60 leading-relaxed pr-4 md:pr-8">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
