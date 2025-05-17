"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ProductDetailModal, {
  ProductDetail,
} from "@/components/UI/ProductDetailModal";

interface OrderDetailModalProps {
  open: boolean;
  orderData: any;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  orderData,
  onClose,
}) => {
  if (!orderData) return null;

  const { order, products } = orderData;
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);

  // Determine colors for status chips
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "paid":
        return "success";
      case "cancelled":
      case "unpaid":
        return "error";
      default:
        return "default";
    }
  };

  const handleProductClick = (prod: ProductDetail) => {
    setSelectedProduct(prod);
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setOpenProductModal(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">Order Details</DialogTitle>

        <DialogContent dividers>
          {/* ORDER SUMMARY */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="subtitle1">{order._id}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Payment Status
              </Typography>
              <Chip
                label={order.payment_status}
                color={getStatusColor(order.payment_status)}
                size="small"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Amount
              </Typography>
              <Typography variant="subtitle1">₹{order.amount}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                Shipping Charges
              </Typography>
              <Typography variant="subtitle1">
                ₹{order.shippingCharges}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="text.secondary">
                GST Total
              </Typography>
              <Typography variant="subtitle1">₹{order.gstTotal}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* PRODUCTS IN ORDER */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Products in Order
          </Typography>
          {products.length > 0 ? (
            <List disablePadding>
              {products.map((prod: any) => (
                <ListItem
                  key={prod._id}
                  button
                  onClick={() => handleProductClick(prod)}
                  sx={{
                    borderRadius: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {prod.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">
                          Price: ₹{prod.price}
                        </Typography>
                        <Typography variant="body2">
                          Discount: ₹{prod.discount}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No products found in this order.
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          {/* ORDER CREATION TIMESTAMP */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Order Created At:
          </Typography>
          <Typography variant="subtitle2">
            {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Nested Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          open={openProductModal}
          product={selectedProduct}
          onClose={handleCloseProductModal}
        />
      )}
    </>
  );
};

export default OrderDetailModal;
