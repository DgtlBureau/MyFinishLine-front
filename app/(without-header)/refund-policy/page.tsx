"use client";

import PolicyFooter from "@/app/components/Shared/PolicyFooter/PolicyFooter";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="relative bg-[#2a3a6b]/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 sm:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none rounded-2xl" />
        <div className="relative z-10">
        <div className="border-b border-white/20 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            MyFinishLine — Refund Policy
          </h1>
          <div className="text-white/60 text-sm">
            <p className="italic">Effective Date: December 15, 2025</p>
            <p>
              <span className="font-semibold">Operator:</span> Fortem Group
              Limited
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            1. General
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            This Refund Policy applies to all purchases made on the MyFinishLine
            platform (&quot;Platform&quot;).
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            2. Digital Products
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            All digital products, including but not limited to:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>virtual challenges;</li>
            <li>online journeys;</li>
            <li>digital achievements, badges, and content,</li>
          </ul>
          <p className="mb-4 text-white/80 leading-relaxed">
            are non-refundable once access has been granted or the challenge has
            been activated.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            3. Physical Products
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Physical products such as medals and merchandise may be eligible for
            a replacement or refund only in the following cases: the item
            arrives damaged or defective.
          </p>
          <p className="mb-4 text-white/80 leading-relaxed">
            Requests must be submitted within 14 days of delivery confirmation
            and must include proof of purchase and photographic evidence where
            applicable.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            4. Exclusions
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Refunds will not be issued for:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-white/80">
            <li>delays caused by customs or postal services;</li>
            <li>incorrect shipping information provided by the customer;</li>
            <li>normal wear and tear;</li>
            <li>personal dissatisfaction unrelated to product defects.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            5. Contact Information
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
        </div>

        <PolicyFooter title="Refund Policy" />
      </div>
      </div>
    </div>
  );
};

export default page;
