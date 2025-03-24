import React from "react";
import Link from "next/link";

import ProductCard from "@/components/Products/productCard";
const ProductGrid = () => {
  // Dummy data for testing purposes
  const products = [
    {
      _id: "1",
      name: "Solar Panel Model A",
      description: "High-efficiency solar panel for residential use.",
      price: 299.99,
      category: "Solar Equipment",
      productImage: "/products/solar1.png", // Replace with actual image path if available
      addedBy: "Admin1",
      status: true,
      stock: 25,
      tags: ["Eco-friendly", "Energy-saving"],
    },
    {
      _id: "2",
      name: "Solar Battery Pack",
      description: "Reliable battery pack for solar energy storage.",
      price: 499.99,
      category: "Battery Storage",
      productImage: "/products/solar2.png",
      addedBy: "Admin2",
      status: false,
      stock: 0,
      tags: ["Long-lasting", "High capacity"],
    },
    {
      _id: "3",
      name: "Solar Inverter",
      description: "Efficient inverter for converting solar energy.",
      price: 199.99,
      category: "Inverters",
      productImage: "/products/solar3.png",
      addedBy: "Admin1",
      status: true,
      stock: 15,
      tags: ["High efficiency", "Durable"],
    },
    // Add more products as needed for testing
  ];

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/admin/Products/${product._id}`}>
            <ProductCard key={product._id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
