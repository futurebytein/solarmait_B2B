import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Box,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { axiosInstance } from "@/lib/axiosInstance"; // Adjust as needed

// Define Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  product_images: string[];
  category: string;
  stock: number;
  ratings: number;
  rating: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  // Add any other fields your product may have
}

// Define Coupon type
interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountPercent: number;
  maxDiscount: number;
  minCartValue: number;
  oneTime: boolean;
  isactive: boolean;
  isshown: boolean;
  totalUsage: number;
}

interface ProductDescriptionProps {
  product: Product | null;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState<boolean>(false);
  const [couponsError, setCouponsError] = useState<string>("");

  // Modal state
  const [offersModalOpen, setOffersModalOpen] = useState<boolean>(false);

  if (!product) {
    return <Typography variant="h6">No product details available.</Typography>;
  }

  // Fetch coupons on mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoadingCoupons(true);
        const response = await axiosInstance.get("/coupon/all");
        // Adjust if your API returns a different shape
        setCoupons(response.data.coupons || []);
        setLoadingCoupons(false);
      } catch (error: any) {
        console.error("Error fetching coupons:", error);
        setCouponsError(
          error?.response?.data?.message || "Failed to fetch coupons."
        );
        setLoadingCoupons(false);
      }
    };

    fetchCoupons();
  }, []);

  // Handlers for opening/closing the modal
  const handleOpenOffersModal = () => {
    setOffersModalOpen(true);
  };
  const handleCloseOffersModal = () => {
    setOffersModalOpen(false);
  };

  return (
    <Card
      sx={{
        padding: 4,
        backgroundColor: "#FFF7E6",
        boxShadow: 4,
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        maxWidth: "75%",
        margin: "auto",
      }}
    >
      {/* Premium Tag & Wishlist */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          label="Premium"
          sx={{
            backgroundColor: "#D4AF37",
            color: "black",
            fontWeight: "bold",
          }}
        />
        <FavoriteBorderIcon sx={{ cursor: "pointer", color: "#D4AF37" }} />
      </Box>

      {/* Product Title */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#D4AF37" }}>
          {product.brand} - ⭐ {product.rating}
        </Typography>
      </Box>

      {/* Pricing Section */}
      <Box
        sx={{
          backgroundColor: "#FFE4B5",
          padding: 3,
          borderRadius: 3,
          marginTop: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
          ₹{product.price}{" "}
          <span style={{ fontSize: "16px" }}>(Inclusive of GST)</span>
        </Typography>
        <Typography variant="h6" sx={{ color: "#1D7A02", fontWeight: "bold" }}>
          ₹{"product.subsidy"} Available Subsidy
        </Typography>
      </Box>

      {/* EMI Section */}
      <Box display="flex" alignItems="center" gap={1} sx={{ marginTop: 3 }}>
        <img src="/emi-icon.png" alt="EMI" width={24} height={24} />
        <Typography variant="h6" sx={{ color: "black" }}>
          EMI from{" "}
          <span style={{ color: "#1D7A02", fontWeight: "bold" }}>₹{""}</span>{" "}
          onwards
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#D4AF37",
              color: "black",
              fontWeight: "bold",
              borderRadius: 3,
              "&:hover": { backgroundColor: "#BFA133" },
            }}
          >
            BOOK NOW AT ₹{product.price}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#D4AF37",
              color: "#D4AF37",
              fontWeight: "bold",
              borderRadius: 3,
              "&:hover": { backgroundColor: "#FFF7E6" },
            }}
          >
            BOOK CONSULTATION
          </Button>
        </Grid>
      </Grid>

      {/* Loan Section */}
      <Box
        sx={{
          marginTop: 3,
          padding: 2,
          border: "1px solid #E0E0E0",
          borderRadius: 3,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "black" }}>
          🌿 Solar loan starting at 7.5% interest p.a.{" "}
          <span
            style={{
              color: "#1D7A02",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Check eligibility
          </span>
        </Typography>
      </Box>

      {/* Offers & Delivery */}
      <Box sx={{ marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleOpenOffersModal}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            All Offers & Coupons
          </Typography>
          <ArrowForwardIosIcon
            sx={{ fontSize: "16px", color: "#D4AF37", marginLeft: 1 }}
          />
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Delivery Section */}
        <Box display="flex" alignItems="center" gap={1}>
          <LocalShippingIcon sx={{ color: "#1D7A02" }} />
          <Typography variant="h6" sx={{ color: "black" }}>
            <span style={{ fontWeight: "bold", color: "#1D7A02" }}>Fast</span>{" "}
            Delivery in 4 Weeks
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#1D7A02",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          See complete installation process and timelines
        </Typography>
      </Box>

      {/* Modal showing all coupons */}
      <Dialog
        open={offersModalOpen}
        onClose={handleCloseOffersModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Discount Coupons</DialogTitle>
        <DialogContent dividers>
          {loadingCoupons ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={24} />
              <Typography variant="body1">Loading coupons...</Typography>
            </Box>
          ) : couponsError ? (
            <Typography variant="body2" color="error">
              {couponsError}
            </Typography>
          ) : coupons.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No coupons available at the moment.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {coupons.map((coupon) => (
                <Box
                  key={coupon._id}
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: 2,
                    padding: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {coupon.code}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {coupon.description}
                  </Typography>
                  {coupon.discountPercent > 0 && (
                    <Typography variant="body2">
                      Discount: {coupon.discountPercent}%{" "}
                      {coupon.maxDiscount ? `(Max ₹${coupon.maxDiscount})` : ""}
                    </Typography>
                  )}
                  {coupon.minCartValue > 0 && (
                    <Typography variant="body2">
                      Minimum cart value: ₹{coupon.minCartValue}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    {coupon.oneTime
                      ? "One-time use only"
                      : "Can be used multiple times"}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOffersModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductDescription;
