"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Divider,
  Container,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { axiosInstance } from "@/lib/axiosInstance";
import VendorProductListing from "@/components/UI/VendorProductListing";
import VendorOrderListing from "@/components/UI/VendorOrderListing";
import ProductDetailModal, {
  ProductDetail,
} from "@/components/UI/ProductDetailModal";
import OrderDetailModal from "@/components/UI/OrderDetailModal";

interface Vendor {
  _id: string;
  name: string;
  email: string;
  role: string;
  state: string;
  city: string;
  is_verified: boolean;
  gst_number: string;
  gst_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VendorDetailsParams {
  params: {
    vendorId: string;
  };
}

const VendorDetails: React.FC<VendorDetailsParams> = ({ params }) => {
  const { vendorId } = params;
  const router = useRouter();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<number>(0);

  // State to control product detail modal
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);

  // State to control order detail modal
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);

  // Fetch vendor details
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/vendors/get-by-id/${vendorId}`
        );
        if (response.data.success) {
          setVendor(response.data.vendor);
        } else {
          setError("Failed to fetch vendor details.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching vendor details.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendorDetails();
  }, [vendorId]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Open product detail modal when a product is clicked
  const handleProductClick = (product: ProductDetail) => {
    setSelectedProduct(product);
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setSelectedProduct(null);
  };

  // Open order detail modal when an order is clicked
  const handleOrderClick = (orderData: any) => {
    setSelectedOrder(orderData);
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !vendor) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error || "Vendor not found."}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      {/* Back Button & Header */}
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Vendor Details
        </Typography>
      </Box>

      {/* Vendor Info Card */}
      <Card
        sx={{ mb: 3, maxWidth: 800, mx: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {vendor.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Vendor ID: {vendor._id}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>Email:</Typography>
              <Typography variant="body2">{vendor.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>Role:</Typography>
              <Typography variant="body2">{vendor.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>Location:</Typography>
              <Typography variant="body2">
                {vendor.city}, {vendor.state}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>GST Number:</Typography>
              <Typography variant="body2">{vendor.gst_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>GST Verified:</Typography>
              <Typography variant="body2">
                {vendor.gst_verified ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500}>Account Verified:</Typography>
              <Typography variant="body2">
                {vendor.is_verified ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Paper
        elevation={1}
        sx={{ p: 2, borderRadius: 2, maxWidth: 800, mx: "auto", mb: 3 }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Products" />
          <Tab label="Orders" />
          <Tab label="Payouts" />
        </Tabs>
        <Divider sx={{ my: 2 }} />
        {tabValue === 0 && (
          <VendorProductListing
            vendorId={vendor._id}
            onProductClick={handleProductClick}
          />
        )}
        {tabValue === 1 && (
          <VendorOrderListing
            vendorId={vendor._id}
            onOrderClick={handleOrderClick}
          />
        )}
        {tabValue === 2 && (
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Vendor payouts information will be shown here.
          </Typography>
        )}
      </Paper>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          open={openProductModal}
          product={selectedProduct}
          onClose={handleCloseProductModal}
        />
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          open={openOrderModal}
          orderData={selectedOrder}
          onClose={handleCloseOrderModal}
        />
      )}
    </Container>
  );
};

export default VendorDetails;
