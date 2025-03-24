"use client";
import React from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// Import the required slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// Dummy Product Data
const products = [
  {
    name: "Polycrystalline Solar Modules (Half-Cut Cell)",
    description:
      "Polycrystalline Solar Panels are the most cost-effective panels to install on your rooftop for homes/businesses.",
    image: "/products/solar1.png", // Replace with actual path
    callText: "Add to Cart",
  },
  {
    name: "MONO-PERC Halfcut Cell Solar Modules",
    description:
      "Mono-PERC Solar Panels are the most efficient panels as they require less area for more capacity while you go solar.",
    image: "/products/solar2.png", // Replace with actual path
    callText: "Add to Cart",
  },
  {
    name: "Bifacial Solar Modules (MONO-PERC)",
    description:
      "Bifacial Mono Solar Panels are the most advanced & efficient solar panels which generate extra energy.",
    image: "/products/solar3.png", // Replace with actual path
    callText: "Add to Cart",
  },
  // Adding 4 more dummy products
  {
    name: "Solar Panel A",
    description:
      "Highly efficient solar panels with maximum energy output for residential and commercial setups.",
    image: "/products/solar4.png",
    callText: "Add to Cart",
  },
  {
    name: "Solar Panel B",
    description:
      "An innovative solution for affordable and sustainable solar energy generation.",
    image: "/products/solar5.png",
    callText: "Add to Cart",
  },
  {
    name: "Solar Panel C",
    description:
      "Best performance solar panels to enhance energy production in any weather.",
    image: "/products/solar6.png",
    callText: "Add to Cart",
  },
  {
    name: "Solar Panel D",
    description:
      "Advanced solar panels offering optimal efficiency at a competitive price.",
    image: "/products/solar4.png",
    callText: "Add to Cart",
  },
];

// Custom Next Arrow component
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 text-white cursor-pointer bg-yellow-500 p-3 rounded-full"
      style={{ zIndex: 1, top: "50%" }}
      onClick={onClick}
    >
      <FaArrowRight size={20} />
    </div>
  );
};

// Custom Previous Arrow component
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 text-white cursor-pointer bg-yellow-500 p-3 rounded-full"
      style={{ zIndex: 1, top: "50%" }}
      onClick={onClick}
    >
      <FaArrowLeft size={20} />
    </div>
  );
};

const ProductSlider = () => {
  // Slick carousel settings with custom arrows
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 2000, // Speed between each slide in milliseconds (4 seconds)
    speed: 500, // Transition speed between slides
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
        },
      },
    ],
  };

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-700">
        A+ Grade Solar Panels Range
      </h2>

      <Slider {...settings} className="mt-8 relative">
        {products.map((product, index) => (
          <div key={index} className="p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={264}
                height={264}
                className="w-full h-64 object-cover mb-4"
              />

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-800">
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="mt-2 text-gray-600">{product.description}</p>

              {/* Call Button */}
              <button className="mt-4 bg-yellow-500 text-white py-2 px-6 rounded-md">
                {product.callText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
