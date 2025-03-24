import React, { useState } from "react";
import { Box, CardMedia, Grid } from "@mui/material";

// Define Props Interface
interface ProductImagesCarouselProps {
  images: string[]; // ✅ Ensure images is an array of strings
}

const ProductImagesCarousel: React.FC<ProductImagesCarouselProps> = ({
  images,
}) => {
  // Ensure we handle cases where images array might be empty
  const [selectedImage, setSelectedImage] = useState<string>(
    images.length > 0 ? images[0] : "/default-image.png" // ✅ Provide a default fallback
  );

  return (
    <Box>
      <CardMedia
        component="img"
        image={selectedImage}
        alt="Product Image"
        sx={{
          width: "100%",
          height: 400,
          objectFit: "contain",
          border: "1px solid #e0e0e0",
          backgroundColor: "#f5f5f5",
        }}
      />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {images.map((img, index) => (
          <Grid item xs={3} key={index}>
            <CardMedia
              component="img"
              image={img}
              alt="Thumbnail"
              sx={{
                width: "100%",
                height: 80,
                objectFit: "contain",
                border:
                  selectedImage === img
                    ? "2px solid #FFCC00"
                    : "1px solid #e0e0e0",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductImagesCarousel;
