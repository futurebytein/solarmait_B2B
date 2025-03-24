import React from "react";
import Image from "next/image";

export default function productCard({ product }) {
  return (
    <div className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:shadow-xl">
      <Image
        width="264"
        height="264"
        src={product.productImage}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm mb-1">Category: {product.category}</p>
        <p className="text-sm mb-1">Description: {product.description}</p>
        <p className="text-sm mb-1">Stock: {product.stock}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <span
            className={`px-3 py-1 rounded text-white ${
              product.status
                ? "bg-green-500 dark:bg-green-600"
                : "bg-red-500 dark:bg-red-600"
            }`}
          >
            {product.status ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="flex flex-wrap mt-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-800 rounded-full px-2 py-1 mr-1 mt-1 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
