const page = () => {
  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          MyFinishLine — Terms of Service
        </h1>
        <div>
          <p className="italic">Effective Date: December 15, 2025</p>
          <p>
            <span className="font-bold">Operator:</span> Fortem Group Limited
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to MyFinishLine ("Platform", "we", "our", "us"). MyFinishLine
          provides online fitness challenges, virtual journeys, digital content
          and optional physical souvenir products such as medals. By accessing
          or using the Platform, you agree to these Terms of Service.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">2. Eligibility</h2>
        <p className="mb-4">
          You must be at least 16 years old to use the Platform. If you are
          under 18, you confirm that you have parental or legal guardian
          consent.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          3. Account Registration
        </h2>
        <p className="mb-4">
          You agree to provide accurate, complete, and up-to-date information
          when creating an account. You are responsible for maintaining the
          confidentiality of your account credentials.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          4. Services Provided
        </h2>
        <p className="mb-4">MyFinishLine offers:</p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>Virtual fitness challenges and progress tracking;</li>
          <li>Story-driven journeys and achievements;</li>
          <li>Digital badges and rewards;</li>
          <li>Optional physical products (medals, merchandise).</li>
        </ul>
        <p className="mb-4">
          All challenges are virtual and completed at your own pace unless
          otherwise stated.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">5. Payments</h2>
        <p className="mb-4">
          Payments are processed securely through Stripe. MyFinishLine does not
          store credit or debit card information. Prices are displayed in the
          applicable currency and may include taxes where required.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">6. Refund Policy</h2>
        <p className="mb-4">
          Digital content and access to challenges are non-refundable once
          activated.
        </p>
        <p className="mb-4">
          Physical products may be replaced or refunded only in cases of
          manufacturing defects, subject to our Refund Policy.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          7. Physical Products and Delivery
        </h2>
        <p className="mb-4">
          Delivery times may vary depending on location and logistics providers.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          8. Health Disclaimer
        </h2>
        <p className="mb-4">
          MyFinishLine does not provide medical advice. You confirm that you are
          physically fit to participate in physical activities. Participation is
          voluntary and at your own risk.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">9. User Conduct</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>Misrepresent your activity data;</li>
          <li>Abuse or exploit the Platform;</li>
          <li>Use the Platform for unlawful purposes;</li>
          <li>Infringe intellectual property rights.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          10. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, designs, trademarks, and materials on MyFinishLine are
          owned by or licensed to us and may not be used without permission.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">11. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts that violate
          these Terms.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          12. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the maximum extent permitted by law, MyFinishLine shall not be
          liable for indirect, incidental, or consequential damages arising from
          use of the Platform.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          13. Changes to Terms
        </h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the
          Platform constitutes acceptance of the updated Terms.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          14. Governing Law
        </h2>
        <p className="mb-4">
          These Terms shall be governed by the laws of the jurisdiction in which
          MyFinishLine is registered.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          15. Contact Information
        </h2>
        <p className="mb-4">If you have questions, concerns, or requests:</p>
        <div className="ml-4">
          <p className="font-semibold mb-2">
            Email:{" "}
            <a href="mailto:access@myfinishline.io">access@myfinishline.io</a>
          </p>
          <p className="font-semibold">Operator: Fortem Group Limited</p>
        </div>
      </div>

      <div className="border-t-2 border-gray-300 pt-6 mt-8 text-center text-gray-500 text-sm">
        <p>MyFinishLine Terms of Service</p>
      </div>
    </div>
  );
};

export default page;
