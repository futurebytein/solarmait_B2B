"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import KitDescription from "@/components/UI/KitDescription";
import DescriptionComponent from "@/components/UI/DescriptionComponent";
import ProductImagesCarousel from "@/components/UI/ProductImagesCarousel";
import RelatedProducts from "@/components/UI/RelatedProducts";
import { axiosInstance } from "@/lib/axiosInstance";

// Interface for Route Params
interface SolarKitDetailsParams {
  params: {
    kit_id: string;
  };
}

// Interfaces for kit and product data
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  cover_image?: string;
  product_images: string[];
  technical_docs?: string[];
  category?: string;
}

interface SolarKit {
  _id: string;
  name: string;
  description: string;
  technical_docs: string[];
  kit_image?: string; // Optional kit image
  products: Product[];
}

// Define the structure for optional PDF groups (for DescriptionComponent)
interface PDFDocsGroup {
  label: string;
  docs: string[];
}

const SolarKitDetails = ({ params }: SolarKitDetailsParams) => {
  const { kit_id } = params;
  const [kit, setKit] = useState<SolarKit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch kit details using the provided kit_id
  const fetchSolarKitDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/products/solar-kit/get-by-id/${kit_id}`
      );
      if (response.data && response.data.kit) {
        setKit(response.data.kit);
        setRelatedProducts(response.data.kit.products || []);
      } else {
        setError("Failed to load solar kit details.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching solar kit details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolarKitDetails();
  }, [kit_id]);

  if (loading) return <Typography>Loading solar kit details...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  // Compute images array:
  const kitImages: string[] = [];
  if (kit?.kit_image) {
    kitImages.push(kit.kit_image);
  }
  if (kit?.products) {
    kit.products.forEach((product) => {
      if (product.product_images && product.product_images.length > 0) {
        kitImages.push(...product.product_images);
      }
    });
  }
  const imagesToShow =
    kitImages.length > 0 ? kitImages : ["/default-image.png"];

  // Compute PDF documents groups from products that have technical_docs
  const pdfDocsGroups: PDFDocsGroup[] | undefined = kit?.products
    .filter(
      (product) => product.technical_docs && product.technical_docs.length > 0
    )
    .map((product) => ({
      label: product.category || "Document",
      docs: product.technical_docs as string[],
    }));

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side – Images Carousel and Description Component */}
        <Grid item xs={12} md={6}>
          <ProductImagesCarousel images={imagesToShow} />
          <Box sx={{ marginTop: 8 }}>
            <DescriptionComponent
              product={{
                description: kit.description,
                technical_docs: kit.technical_docs,
                parts: [],
              }}
              pdfDocsGroups={
                pdfDocsGroups && pdfDocsGroups.length > 0
                  ? pdfDocsGroups
                  : undefined
              }
            />
          </Box>
        </Grid>

        {/* Right Side – Kit Description */}
        <Grid item xs={12} md={6}>
          {kit && <KitDescription kit={kit} />}
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <RelatedProducts relatedProducts={relatedProducts} />
    </Box>
  );
};

export default SolarKitDetails;
