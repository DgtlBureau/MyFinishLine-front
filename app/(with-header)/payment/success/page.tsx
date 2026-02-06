"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

const paymentFAQs = [
  {
    question: "When will I receive my activation code?",
    answer: "Your activation code has been sent to your email immediately after payment. Please check your inbox and spam folder. If you don't see it within 5 minutes, contact our support team.",
  },
  {
    question: "How do I activate my challenge?",
    answer: "After signing up, you'll be prompted to enter your activation code. Simply paste the code from your email to unlock your challenge and start your adventure!",
  },
  {
    question: "Can I change my challenge after purchase?",
    answer: "Each activation code is valid for a specific challenge. If you'd like to switch to a different challenge, please contact our support team and we'll help you find the best solution.",
  },
  {
    question: "What if I don't receive my confirmation email?",
    answer: "First, check your spam or junk folder. If you still can't find it, contact us at support@myfinishline.io with your order number and we'll resend your activation code immediately.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team at support@myfinishline.io. We typically respond within 24 hours and are here to help with any questions or concerns.",
  },
];

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id") || searchParams.get("transaction_id") || searchParams.get("id");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Redirect to payment page if no order_id is present
  useEffect(() => {
    if (!orderId) {
      router.replace("/payment");
    }
  }, [orderId, router]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Don't render anything while redirecting
  if (!orderId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center px-4 pb-16">
      {/* Centered Success Card */}
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-4xl"
        >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(77, 166, 122, 0.4) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main card */}
        <div className="relative bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 rounded-3xl p-10 md:p-16 shadow-2xl shadow-black/20 ring-1 ring-inset ring-white/20">

          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(77, 166, 122, 0.4) 0%, transparent 70%)"
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-gradient-to-br from-[#4DA67A] to-[#3B5CC6] p-5 md:p-6 rounded-full">
                <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4 flex items-center justify-center gap-3"
          >
            Payment Successful!
            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1]
              }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-8 h-8 md:w-9 md:h-9 text-[#4DA67A]" fill="currentColor" />
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-white/70 text-center mb-8 text-lg md:text-xl"
          >
            Thank you for your purchase. Your adventure begins now!
          </motion.p>

          {/* Order Number */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mb-8 p-7 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
            >
              <p className="text-white/60 text-base md:text-lg text-center mb-3">Order Number</p>
              <p className="text-white text-3xl md:text-4xl font-bold text-center tracking-wide">
                #{orderId}
              </p>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/signup"
              className="group relative w-full flex justify-center items-center py-5 md:py-6 px-8 text-xl md:text-2xl font-semibold rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white shadow-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Continue to Sign Up</span>
            </Link>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm md:text-base text-white/50">
              Check your email for order confirmation
            </p>
          </motion.div>
        </div>
      </motion.div>
      </div>

      {/* FAQ Section - positioned below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-4xl mt-24"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl p-3 md:p-4">
          <div className="flex flex-col gap-2">
            {paymentFAQs.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <button
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-4 md:py-5 w-full transition-all duration-300 hover:bg-white/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm md:text-base text-white leading-5 md:leading-none pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white/70 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="text-xs md:text-sm text-white/60 leading-relaxed pr-4">
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
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-2xl bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20 ring-1 ring-inset ring-white/20">
          <div className="text-white text-center">Loading...</div>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
