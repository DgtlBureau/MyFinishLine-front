"use client";

import PolicyFooter from "@/app/components/Shared/PolicyFooter/PolicyFooter";
import { motion } from "motion/react";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="relative bg-[#2a3a6b]/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 sm:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none rounded-2xl" />
        <div className="relative z-10">
        <div className="border-b border-white/20 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            MyFinishLine — Privacy Policy
          </h1>
          <div className="text-white/60 text-sm">
            <p className="italic">Effective Date: December 11, 2025</p>
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
            MyFinishLine (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an
            entertainment app designed to motivate users to stay active, track
            workouts, and participate in virtual challenges. Main website address
            is{" "}
            <a
              href="http://myfinishline.io"
              className="font-semibold text-blue-600 hover:underline"
            >
              myfinishline.io
            </a>
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            This Privacy Policy explains:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>what data we collect;</li>
            <li>how we process and use it;</li>
            <li>how we share it;</li>
            <li>your rights and choices.</li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            We comply with applicable privacy laws and the Strava API Agreement
            requirements, including the{" "}
            <span className="font-semibold">
              prohibition on exposing private user data to other users
            </span>
            .
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            2. What Personal Data We Collect
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We collect only what is necessary for our services to function.
          </p>

          <div className="ml-4">
            <h3 className="text-lg font-semibold text-white/80 mb-3">
              2.1. Account and Profile Information
            </h3>
            <p className="mb-3 text-white/80 leading-relaxed">
              When you create an account or set up your profile:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
              <li>Name or nickname</li>
              <li>Email address</li>
              <li>Profile photo (optional)</li>
              <li>Time zone and language preferences</li>
              <li>User settings</li>
            </ul>

            <h3 className="text-lg font-semibold text-white/80 mb-3">
              2.2. Activity Data from Connected Providers
            </h3>
            <p className="mb-3 text-white/80 leading-relaxed">
              You can link MyFinishLine with any supported data provider
              available in the app (e.g., Strava, Garmin, Fitbit, Apple Health,
              etc.).
            </p>
            <p className="mb-3 text-white/80 leading-relaxed">
              We receive only data you explicitly authorize the provider to
              share, such as:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
              <li>Distance traveled</li>
              <li>Activity type (running, cycling, walking, etc.)</li>
              <li>Duration</li>
              <li>Number of steps (where available)</li>
              <li>Other non-sensitive metrics</li>
            </ul>
            <p className="mb-4 italic text-white/50 leading-relaxed">
              If location or route data is provided, we use only what is
              necessary for service delivery and do not retain precise private
              locations. We comply with provider terms including Strava API
              requirements.
            </p>

            <h3 className="text-lg font-semibold text-white/80 mb-3">
              2.3. Optional Information
            </h3>
            <p className="mb-3 text-white/80 leading-relaxed">
              Optional information you choose to provide, such as:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
              <li>Comments or photos attached to activities</li>
              <li>Feedback through support</li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            3. How We Use Your Information
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We use your personal data to:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>
              deliver services and features you request (tracking, challenges,
              progress reports);
            </li>
            <li>display your statistics and achievements to you;</li>
            <li>personalize your experience and interface;</li>
            <li>
              communicate with you (support, updates, account changes);
            </li>
            <li>improve performance and fix technical issues;</li>
            <li>comply with legal obligations.</li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            We never use personal data outside the defined purposes without your
            explicit consent. We do not use automated profiling to make
            decisions about you.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            4. Data Sharing and Disclosure
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We do{" "}
            <span className="font-semibold">
              not disclose your personal data to third parties except
            </span>
            :
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>
              Service providers (hosting, analytics, email delivery) acting on
              our behalf under confidentiality;
            </li>
            <li>If required by law or valid legal process.</li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            We{" "}
            <span className="font-semibold">
              do not share your personal or activity data with other MyFinishLine
              users
            </span>{" "}
            in a way that reveals identifiable or private information, including
            private workout details. This includes data from Strava or other
            linked providers — visibility is controlled by your choices, and
            default privacy is preserved.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            5. Data Visibility and Other Users
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            MyFinishLine does{" "}
            <span className="font-semibold">
              not publicly expose private activity details
            </span>{" "}
            of users to other users by default.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            {`If a user optionally chooses to share a limited portion of activity
            details in social contexts within the app, only non-sensitive elements
            (such as achievement badges or challenge position) may be visible, and`}{" "}
            <span className="font-semibold">never sensitive private data</span>.
            {`Provider terms (like Strava's) prohibit any exposure of private
            fitness data to other users without consent.`}
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            6. {`Children's Privacy`}
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We do not knowingly collect or process personal data from children
            under the age of 16.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            If a minor uses MyFinishLine with consent, privacy settings default
            to restrictive and no data is used for marketing.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            {`A parent/guardian may review their child's data or request deletion by
            contacting support.`}
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            7. Location and Storage of Your Data
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We may store and process your data on secure cloud servers. These
            may be located in one or more countries to support global operations.
            We implement technical and organizational safeguards to protect your
            information from unauthorized access or loss.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            8. How Long We Retain Your Data
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We retain your personal information:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>as long as your account is active;</li>
            <li>as needed to provide services;</li>
            <li>
              as required by law or business needs (e.g., tax, legal
              compliance).
            </li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            When data retention is no longer necessary, we delete it securely.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            9. Your Rights
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            You have rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>
              <span className="font-semibold">Access:</span> request a copy of
              your data.
            </li>
            <li>
              <span className="font-semibold">Correction:</span> correct
              inaccurate data.
            </li>
            <li>
              <span className="font-semibold">Deletion:</span> request deletion
              of your account and data.
            </li>
            <li>
              <span className="font-semibold">Portability:</span> receive your
              data in a structured format.
            </li>
            <li>
              <span className="font-semibold">Restriction:</span> restrict
              processing.
            </li>
            <li>
              <span className="font-semibold">Withdraw consent:</span> stop
              consent-based processing.
            </li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            To exercise your rights, contact us at{" "}
            <a
              href="mailto:access@myfinishline.io"
              className="text-blue-600 hover:underline"
            >
              access@myfinishline.io
            </a>
            .
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            10. Security
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We protect your data with industry-standard security measures,
            including encryption and secure access controls. You also must
            safeguard your account credentials and not share them.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            11. Third-Party Services and Links
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We may use third-party services (e.g., analytics). These services
            process data on our behalf under strict terms.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            If you click external links, those sites have their own privacy
            policies.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            12. Marketing Communications
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            {`We may send you newsletters or promotional messages if you've opted
            in. You can unsubscribe at any time.`}
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            13. Changes to This Policy
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            We may update this Privacy Policy to reflect changes in services,
            legal requirements, or industry standards. We will post the updated
            policy here and update the effective date.
          </p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-bold text-white mb-3">
            14. Contact Information
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

        <PolicyFooter title="Privacy Policy" />
      </div>
      </div>
    </div>
  );
};

export default Page;
