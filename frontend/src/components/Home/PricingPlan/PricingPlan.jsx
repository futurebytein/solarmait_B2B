const PricingPlans = () => {
  return (
    <div className="py-10 bg-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">
          EASY SOLAR PRICING & PLANS
        </h1>
        <p className="mt-2 text-gray-700">
          We at SOLAR-MAIT are making Rooftop Solar Solutions affordable &
          accessible for everyone in India by having Easy Solar Plans & Pricing
          to Go Solar.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8 w-11/12 mx-auto">
        {/* Solar on Loan */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-bold text-yellow-500">SOLAR ON LOAN</h2>
          <p className="mt-4 text-gray-600">
            SOLAR-MAIT monthly easy EMI loan gives you the benefits of owning
            your rooftop solar system through fixed monthly payments at a
            lucrative rate.
          </p>
          <h3 className="mt-4 font-bold text-blue-700">Benefits</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ Purchase with Easy EMI Loan</li>
            <li>✔️ System gets free in just 3-5 Yrs</li>
            <li>✔️ Up to 10-Year Warranty Included</li>
          </ul>
          <h3 className="mt-4 font-bold text-blue-700">Payments</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>💰 10-30% Downpayment</li>
            <li>💰 Payment to Loan Provider</li>
          </ul>

          {/* Ownership Section */}
          <h3 className="mt-4 font-bold text-blue-700">Ownership</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ You own and maintain the system</li>
          </ul>

          {/* Button */}
          <button className="mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded-md">
            Go Solar on Loan
          </button>
        </div>

        {/* Solar on Purchase */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-bold text-yellow-500">
            SOLAR ON PURCHASE
          </h2>
          <p className="mt-4 text-gray-600">
            SOLAR-MAIT allows customers to purchase the entire rooftop solar
            system outright by paying upfront cost at affordable price.
          </p>
          <h3 className="mt-4 font-bold text-blue-700">Benefits</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ Purchase at Affordable Price</li>
            <li>✔️ System gets free in just 2-4 Yrs</li>
            <li>✔️ Up to 10-Year Warranty Included</li>
          </ul>
          <h3 className="mt-4 font-bold text-blue-700">Payments</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>💰 Pay Upfront for the System</li>
            <li>💰 Get Govt. Subsidy & Tax Benefits</li>
          </ul>

          {/* Ownership Section */}
          <h3 className="mt-4 font-bold text-blue-700">Ownership</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ You own and maintain the system</li>
          </ul>

          {/* Button */}
          <button className="mt-4 bg-yellow-500 font-bold text-white py-2 px-4 rounded-md">
            Go Solar Now
          </button>
        </div>

        {/* Solar on Lease */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-bold text-yellow-500">SOLAR ON LEASE</h2>
          <p className="mt-4 text-gray-600">
            SOLAR-MAIT solar on lease (OPEX) plan offers zero upfront cost of
            the rooftop solar system. You`&apos;`ll only be paying a low monthly
            bill for 10-15 years.
          </p>
          <h3 className="mt-4 font-bold text-blue-700">Benefits</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ Go Solar for 10-15 Yrs at `&ldquo;`0`&ldquo;` cost</li>
            <li>✔️ Low Security Deposit (Refundable)</li>
            <li>✔️ Up to 15-Year Warranty Included</li>
          </ul>
          <h3 className="mt-4 font-bold text-blue-700">Payments</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>💰 Zero Downpayment for Solar</li>
            <li>💰 Payment to SOLAR-MAIT Provider</li>
          </ul>

          {/* Ownership Section */}
          <h3 className="mt-4 font-bold text-blue-700">Ownership</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li>✔️ Our team owns and maintains the system</li>
          </ul>

          {/* Button */}
          <button className="mt-4 bg-yellow-500 font-bold text-white py-2 px-4 rounded-md">
            Submit Your Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
