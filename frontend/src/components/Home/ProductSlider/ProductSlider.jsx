"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import apiHelper from "@/helpers/apiHelper";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow
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

// Custom Previous Arrow
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

// Helper to format category names for display
const formatCategoryName = (category) => {
  switch (category) {
    case "solar-kit":
      return "Solar Kits";
    case "pannel":
      return "Solar Panels"; // spelled "pannel" in the API, but display as "Solar Panels"
    case "inverter":
      return "Inverters";
    case "battery":
      return "Batteries";
    case "solar_components":
      return "Solar Components";
    case "services":
      return "Services";
    default:
      return category;
  }
};

const ProductSlider = ({ category }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the correct endpoint on mount or when category changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (category === "solar-kit") {
          // Fetch from /products/solar-kit/get-all
          response = await apiHelper.get("/products/solar-kit/get-all");
          // The response should contain { solar_kits: [...] }
          setItems(response.data.solar_kits.slice(0, 6));
        } else {
          // Fetch from /products/all-products?category=...
          response = await apiHelper.get(
            `/products/all-products?category=${category}`
          );
          // The response should contain { data: [...] }
          setItems(response.data.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  // react-slick settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000, // 4 seconds
    speed: 600, // transition speed
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Small screens
        },
      },
    ],
  };

  // Determine how to display items
  const getItemName = (item) => item.name;
  const getItemDescription = (item) => item.description;
  const getItemImage = (item) => {
    if (category === "solar-kit") {
      // If solar kits don't have direct images, use placeholder or derive from item.products
      return "/placeholder-solar-kit.png";
    }
    // For standard products, use the first product image or a placeholder
    return item.product_images && item.product_images.length > 0
      ? item.product_images[0]
      : "/placeholder-product.png";
  };

  return (
    <div className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row: Title + "View More" Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-blue-700">
            {formatCategoryName(category)} Range
          </h2>
          <Link href={`/products?category=${category}`}>
            <button
              className="bg-yellow-500 text-white py-2 px-6 rounded-md
                         hover:bg-yellow-600 transition-colors"
            >
              View More
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center mt-8">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center mt-8">No products found.</div>
        ) : (
          <Slider {...settings} className="mt-8 relative">
            {items.map((item, index) => {
              const name = getItemName(item);
              const description = getItemDescription(item);
              const imageSrc = getItemImage(item);

              return (
                <div key={index} className="p-4">
                  <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={264}
                      height={264}
                      className="w-full h-64 object-cover mb-4"
                    />

                    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                    <p className="mt-2 text-gray-600">{description}</p>

                    <button className="mt-4 bg-yellow-500 text-white py-2 px-6 rounded-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
