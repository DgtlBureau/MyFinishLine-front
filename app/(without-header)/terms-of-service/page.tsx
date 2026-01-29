"use client";

import PolicyFooter from "@/app/components/Shared/PolicyFooter/PolicyFooter";
import { motion } from "motion/react";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="relative bg-[#2a3a6b]/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 sm:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none rounded-2xl" />
        <div className="relative z-10">
        <div className="border-b border-white/20 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            MyFinishLine — Terms of Service
          </h1>
          <div className="text-white/60 text-sm">
            <p className="italic">Effective Date: December 15, 2025</p>
            <p>
              <span className="font-semibold">Operator:</span> Fortem Group
              Limited
            </p>
          </div>
        </div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            1. Introduction
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Welcome to MyFinishLine (&quot;Platform&quot;, &quot;we&quot;,
            &quot;our&quot;, &quot;us&quot;). MyFinishLine provides online
            fitness challenges, virtual journeys, digital content and optional
            physical souvenir products such as medals. By accessing or using the
            Platform, you agree to these Terms of Service.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            2. Eligibility
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            You must be at least 16 years old to use the Platform. If you are
            under 18, you confirm that you have parental or legal guardian
            consent.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            3. Account Registration
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            You agree to provide accurate, complete, and up-to-date information
            when creating an account. You are responsible for maintaining the
            confidentiality of your account credentials.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            4. Services Provided
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            MyFinishLine offers:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>Virtual fitness challenges and progress tracking;</li>
            <li>Story-driven journeys and achievements;</li>
            <li>Digital badges and rewards;</li>
            <li>Optional physical products (medals, merchandise).</li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            All challenges are virtual and completed at your own pace unless
            otherwise stated.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            5. Payments
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Payments are processed securely through Stripe. MyFinishLine does
            not store credit or debit card information. Prices are displayed in
            the applicable currency and may include taxes where required.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            6. Refund Policy
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Digital content and access to challenges are non-refundable once
            activated.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            Physical products may be replaced or refunded only in cases of
            manufacturing defects, subject to our Refund Policy.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            7. Physical Products and Delivery
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Delivery times may vary depending on location and logistics
            providers.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            8. Health Disclaimer
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            MyFinishLine does not provide medical advice. You confirm that you
            are physically fit to participate in physical activities.
            Participation is voluntary and at your own risk.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            9. User Conduct
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            You agree not to:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>Misrepresent your activity data;</li>
            <li>Abuse or exploit the Platform;</li>
            <li>Use the Platform for unlawful purposes;</li>
            <li>Infringe intellectual property rights.</li>
          </ul>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            10. Intellectual Property
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            All content, designs, trademarks, and materials on MyFinishLine are
            owned by or licensed to us and may not be used without permission.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            11. Termination
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            12. Limitation of Liability
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            To the maximum extent permitted by law, MyFinishLine shall not be
            liable for indirect, incidental, or consequential damages arising
            from use of the Platform.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            13. Changes to Terms
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We may update these Terms from time to time. Continued use of the
            Platform constitutes acceptance of the updated Terms.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            14. Governing Law
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            These Terms shall be governed by the laws of the jurisdiction in
            which MyFinishLine is registered.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            15. Contact Information
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            If you have questions, concerns, or requests:
          </p>
          <div className="ml-4 text-white/80">
            <p className="font-semibold mb-2">
              Email:{" "}
              <a
                href="mailto:access@myfinishline.io"
                className="text-blue-600 hover:underline"
              >
                access@myfinishline.io
              </a>
            </p>
            <p className="font-semibold">Operator: Fortem Group Limited</p>
          </div>
        </motion.div>

        <PolicyFooter title="Terms of Service" />
      </div>
      </div>
    </div>
  );
};

export default page;
