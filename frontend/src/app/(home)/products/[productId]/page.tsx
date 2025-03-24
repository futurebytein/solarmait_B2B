"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductDescription from "@/components/UI/ProductDescription";
import DescriptionComponent from "@/components/UI/DescriptionComponent";
import ProductImagesCarousel from "@/components/UI/ProductImagesCarousel";
import RelatedProducts from "@/components/UI/RelatedProducts";
import { axiosInstance } from "@/lib/axiosInstance";
// Interface for Route Params
interface ProductDetailsParams {
  params: {
    productId: string;
  };
}

// Interface for Product
interface Product {
  _id: string;
  name: string;
  brand: string;
  rating: number;

  description: string;
  price: number;
  product_images: string[];
  category: string;
  stock: number;
  ratings: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  // Add any other fields your product may have
}

const ProductDetails = ({ params }: ProductDetailsParams) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(
    null
  );
  const { productId } = params;

  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/products/get-product/${productId}`
      );
      console.log("response: ", response.data);
      if (response.data.success) {
        setProduct(response.data.data);
        setRelatedProducts(response.data.related_products);
      } else {
        setError("Failed to load product details.");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while fetching product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (loading) return <Typography>Loading product details...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side - Product Images */}
        <Grid item xs={12} md={6} sx={{ marginLeft: 0 }}>
          <ProductImagesCarousel images={product?.product_images ?? []} />
          <Box sx={{ marginTop: 8 }}>
            <DescriptionComponent product={product} />
          </Box>
        </Grid>

        {/* Right Side - Product Description and DescriptionComponent */}
        <Grid item xs={12} md={6}>
          {/* Product Description */}
          {product && <ProductDescription product={product} />}

          {/* Description Component - Positioned Directly Below ProductDescription */}
          {/* <Box sx={{ marginTop: 3 }}>
            <DescriptionComponent />
          </Box> */}
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <RelatedProducts relatedProducts={relatedProducts || []} />
    </Box>
  );
};

export default ProductDetails;
