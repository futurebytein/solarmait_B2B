import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAuth } from "@/contexts/AuthContext";
import RequestProductModal from "@/components/UI/RequestProductModal";

// Define Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  product_images?: string[]; // Optional array of image URLs
  stock: number; // New property to determine availability
}

// Define User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  cart?: string[]; // Optional, for future cart updates
}

// Define Props type
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, setUserAndSync } = useAuth(); // To update user's cart locally
  const [openRequestModal, setOpenRequestModal] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post<{
        success: boolean;
        cart: Product[];
      }>(`/products/add-to-cart/${product._id}`);

      if (response.data.success) {
        // Extract product IDs only
        const updatedCartIds = response.data.cart.map((p) => p._id);
        console.log("Updated Cart IDs:", updatedCartIds);

        // Update the user object with the cart containing only product IDs
        const updatedUser: User = {
          ...user,
          _id: user?._id ?? "",
          name: user?.name ?? "",
          email: user?.email ?? "",
          role: user?.role ?? "",
          cart: updatedCartIds,
        };

        // Update the user in context and sync with localStorage
        setUserAndSync(updatedUser);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await axiosInstance.post<{
        success: boolean;
        cart: Product[];
      }>(`/products/remove-from-cart/${product._id}`);

      if (response.data.success) {
        // Extract only product IDs from the response
        const updatedCartIds = response.data.cart.map((p) => p._id);
        console.log("Updated Cart IDs after removal:", updatedCartIds);

        // Update the user object with the updated cart containing only product IDs
        const updatedUser: User = {
          ...user,
          _id: user?._id ?? "",
          name: user?.name ?? "",
          email: user?.email ?? "",
          role: user?.role ?? "",
          cart: updatedCartIds,
        };
        // Update the user in context and sync with localStorage
        setUserAndSync(updatedUser);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%", // ensures the card takes full height
        boxShadow: 3,
        padding: 1,
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Image Link at the top */}
      <Link href={`/products/${product._id}`} passHref>
        <CardMedia
          component="img"
          image={product.product_images?.[0] || "/default-product.png"}
          alt={product.name}
          sx={{
            height: 180,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            padding: 1,
          }}
        />
      </Link>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1, // so the content area can stretch
        }}
      >
        {/* Title, Description, Price */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {product.description
            ? `${product.description.substring(0, 60)}...`
            : ""}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
          ₹{product.price.toLocaleString()}
        </Typography>

        {/* Buttons row at the bottom */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginTop: "auto", // pushes buttons to bottom of CardContent
            alignItems: "center", // vertically center the row
          }}
        >
          {/* View Details Button */}
          <Link href={`/products/${product._id}`} passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFCC00",
                color: "white",
                "&:hover": { backgroundColor: "#FFD700" },
              }}
            >
              View Details
            </Button>
          </Link>

          {/* Add or Remove from Cart Button */}
          {user?.cart?.includes(product._id) ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
