"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
  {
    id: "1",
    question: "How do I start tracking my runs?",
    answer:
      "Simply open the app and tap the 'Start Run' button on the home screen. The app will automatically track your distance, pace, and route using GPS.",
  },
  {
    id: "2",
    question: "How are awards calculated?",
    answer:
      "Awards are earned based on your running milestones. This includes total distance, consistency streaks, personal records, and participation in challenges.",
  },
  {
    id: "3",
    question: "Can I sync with other fitness apps?",
    answer:
      "Yes! We support integration with Apple Health, Google Fit, Strava, and Garmin. Go to Settings > Integrations to connect your accounts.",
  },
  {
    id: "4",
    question: "How do I claim my medals?",
    answer:
      "Once you've earned a medal, navigate to Profile > Awards tab. You'll see all available medals with a 'Claim' button next to unclaimed ones.",
  },
  {
    id: "5",
    question: "What are store credits and how do I earn them?",
    answer:
      "Store credits are earned by completing runs, achieving goals, and participating in community challenges. You can redeem them for gear and premium features.",
  },
  {
    id: "6",
    question: "Is my data private?",
    answer:
      "Absolutely. Your running data is encrypted and stored securely. You have full control over what you share publicly on your profile.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pb-8"
      >
        <h1 className="text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find answers to common questions
        </p>
      </motion.div>

      <div className="px-6">
        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem
                value={faq.id}
                className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30 transition-colors"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
