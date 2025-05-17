"use client";
import React from "react";
import Image from "next/image";

const Sponsors = () => {
  const sponsors = [
    "/assets/sponsors/cc1.png",
    "/assets/sponsors/cc2.png",
    "/assets/sponsors/cc3.png",
    "/assets/sponsors/cc4.jpg",
    "/assets/sponsors/cc5.jpg",
    "/assets/sponsors/cc6.jpg",
    "/assets/sponsors/cc7.png",
    "/assets/sponsors/cc8.jpg",
    "/assets/sponsors/cc9.png",
  ];

  return (
    <div className="w-full py-8 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        {/* Title */}
        <div className="text-3xl md:text-4xl font-bold text-center text-blue-700">
          With Great Outcomes.
        </div>
        <div className="text-lg md:text-xl font-bold mb-6 text-yellow-500 text-center">
          Our customers have gotten offers from awesome companies.
        </div>

        {/* Scrolling Images */}
        <div className="flex overflow-hidden w-full max-w-screen-lg mask-image">
          <div className="flex animate-scrollX">
            {sponsors.map((el, index) => (
              <div
                key={index}
                className="flex-shrink-0 grid place-items-center w-[clamp(12rem,2rem+25vmin,20rem)] px-6"
              >
                <Image
                  width={400}
                  height={400}
                  src={el}
                  alt={`Sponsor ${index + 1}`}
                  className="object-contain w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            ))}
          </div>
          <div className="flex animate-scrollX">
            {sponsors.map((el, index) => (
              <div
                key={index}
                className="flex-shrink-0 grid place-items-center w-[clamp(12rem,2rem+25vmin,20rem)] px-6"
              >
                <Image
                  width={400}
                  height={400}
                  src={el}
                  alt={`Sponsor ${index + 1}`}
                  className="object-contain w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
