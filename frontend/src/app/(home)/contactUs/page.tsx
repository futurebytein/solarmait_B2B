"use client";
import React from "react";

const ContactSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-16 px-4">
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

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

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Overlay Box + Stronger Text Shadows */}
        <div className="flex flex-col justify-center space-y-6 md:pr-10 p-6 bg-black/30 rounded-md backdrop-blur-sm">
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
          >
            Contact <span className="text-yellow-300">SOLAR-MAIT</span>
          </h1>
          <h2
            className="text-xl md:text-2xl font-semibold text-white"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
          >
            India&apos;s Largest B2B Solar Equipment Procurement Platform
          </h2>
          <p
            className="text-lg text-white max-w-prose"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
          >
            Whether you&apos;re looking for support, have a question about our
            services, or need more details—our team is here to help. Reach out
            to us and we&apos;ll respond as soon as we can.
          </p>
        </div>

        {/* Right Side: Contact Form */}
        <div
          className="bg-white border border-gray-100 rounded-lg shadow-2xl p-6 md:p-8 
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
                             focus:outline-none focus:border-yellow-500 placeholder-gray-400"
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
                             focus:outline-none focus:border-yellow-500 placeholder-gray-400"
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
                             focus:outline-none focus:border-yellow-500 placeholder-gray-400"
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
                             focus:outline-none focus:border-yellow-500 placeholder-gray-400"
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
                           focus:outline-none focus:border-yellow-500 placeholder-gray-400"
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
    </section>
  );
};

export default ContactSection;
