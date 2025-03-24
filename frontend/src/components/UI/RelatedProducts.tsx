import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

// Define Product Interface
interface Product {
  _id: string;
  name: string;
  price: number;
  cover_image?: string; // Optional property
}

// Define Props Interface
interface RelatedProductsProps {
  relatedProducts: Product[]; // Expecting an array of products
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  console.log("Related products:", relatedProducts);

  return (
    <div className="px-7">
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginTop: 5, marginBottom: 2 }}
      >
        Related Products
      </Typography>
      <Grid container spacing={3}>
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card sx={{ padding: 1, boxShadow: 3 }}>
                <Link href={`/products/${product._id}`} passHref>
                  <CardMedia
                    component="img"
                    image={product.cover_image || "/default-product.png"} // ✅ Safe fallback for undefined images
                    alt={product.name}
                    sx={{
                      height: 150,
                      objectFit: "contain",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </Link>

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    ₹{product.price?.toLocaleString()}{" "}
                    {/* ✅ Ensured proper number formatting */}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFCC00",
                      color: "white",
                      width: "100%",
                      marginTop: 2,
                      "&:hover": { backgroundColor: "#FFD700" },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "gray", textAlign: "center", width: "100%" }}
          >
            No related products available.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default RelatedProducts;
