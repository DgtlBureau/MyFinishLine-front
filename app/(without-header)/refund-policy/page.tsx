const page = () => {
  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          MyFinishLine — Refund Policy
        </h1>
        <div>
          <p className="italic">Effective Date: December 15, 2025</p>
          <p>
            <span className="font-bold">Operator:</span> Fortem Group Limited
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">1. General</h2>
        <p className="mb-4">
          This Refund Policy applies to all purchases made on the MyFinishLine
          platform ("Platform").
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          2. Digital Products
        </h2>
        <p className="mb-4">
          All digital products, including but not limited to:
        </p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>virtual challenges;</li>
          <li>online journeys;</li>
          <li>digital achievements, badges, and content,</li>
        </ul>
        <p className="mb-4">
          are non-refundable once access has been granted or the challenge has
          been activated.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          3. Physical Products
        </h2>
        <p className="mb-4">
          Physical products such as medals and merchandise may be eligible for a
          replacement or refund only in the following cases: the item arrives
          damaged or defective.
        </p>
        <p className="mb-4">
          Requests must be submitted within 14 days of delivery confirmation and
          must include proof of purchase and photographic evidence where
          applicable.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">4. Exclusions</h2>
        <p className="mb-4">Refunds will not be issued for:</p>
        <ul className="list-disc pl-8 mb-4 space-y-2">
          <li>delays caused by customs or postal services;</li>
          <li>incorrect shipping information provided by the customer;</li>
          <li>normal wear and tear;</li>
          <li>personal dissatisfaction unrelated to product defects.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          5. Contact Information
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
        <p>MyFinishLine Refund Policy</p>
      </div>
    </div>
  );
};

export default page;
