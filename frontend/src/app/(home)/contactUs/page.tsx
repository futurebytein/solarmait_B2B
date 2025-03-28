"use client";
import React from "react";

const ContactSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-10 px-4">
      {/* Wave at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-white">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="1"
            d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,138.7C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: SOLAR-MAIT Details */}
        <div className="text-black space-y-5 md:pr-10">
          <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
            SOLAR-MAIT Private Limited
          </h2>
          <p className="text-lg">
            <span className="font-semibold">CIN:</span> U66999A2G202PTC123456
          </p>
          <p className="text-lg">
            <span className="font-semibold">Address:</span> 88th Floor, Lex
            Marks, Christopher (W), Mumbai 400066
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:contact@solarmait.co"
              className="underline hover:text-gray-100"
            >
              contact@solarmait.co
            </a>
          </p>

          <div className="pt-4">
            <h3 className="text-2xl font-semibold drop-shadow-md">
              Grievance Redressal Officer
            </h3>
            <p className="text-lg mt-2">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:grievance@solarmait.com"
                className="underline hover:text-gray-100"
              >
                grievance@solarmait.com
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div
          className="bg-white rounded-lg shadow-2xl p-6 md:p-8 
                     transform transition-all duration-500 hover:scale-[1.02]"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            We&apos;re here to help
          </h3>
          <p className="text-gray-600 mb-6">
            Fill out the form or contact us directly.
          </p>

          <form className="space-y-5">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2
                             focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2
                             focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone & Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2
                             focus:outline-none focus:border-yellow-500"
                  placeholder="e.g., +91 98765 43210"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-medium"
                >
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2
                             focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your company"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium"
              >
                How can we help you?
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2
                           focus:outline-none focus:border-yellow-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold
                         hover:bg-yellow-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
