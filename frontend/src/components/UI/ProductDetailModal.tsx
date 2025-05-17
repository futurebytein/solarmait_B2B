"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface ProductDetail {
  is_verified: boolean;
  _id: string;
  name: string;
  description: string;
  price: number;
  gstPerc: number;
  discount: number;
  category: string;
  cover_image: string;
  product_images: string[];
  brand?: string;
  vendor: string;
  is_active: boolean;
  stock: number;
  tags: string[];
  product_code: string;
  is_assured: boolean;
  technical_docs: string[];
  shippingChargesPerKm: number;
  wareHousePincode: number;
  specifications: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProductDetailModalProps {
  open: boolean;
  product: ProductDetail;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  product,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {product.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Product Cover Image */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={product.cover_image}
              alt={product.name}
              sx={{ width: "100%", borderRadius: 1, boxShadow: 2 }}
            />
          </Grid>
          {/* Product Details */}
          <Grid item xs={12} md={7}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body2" gutterBottom>
              {product.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Price:
                </Typography>
                <Typography variant="body2">
                  ₹{product.price.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  GST %:
                </Typography>
                <Typography variant="body2">{product.gstPerc}%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Discount:
                </Typography>
                <Typography variant="body2">{product.discount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Category:
                </Typography>
                <Typography variant="body2">{product.category}</Typography>
              </Grid>
              {product.brand && (
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Brand:
                  </Typography>
                  <Typography variant="body2">{product.brand}</Typography>
                </Grid>
              )}
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Stock:
                </Typography>
                <Typography variant="body2">{product.stock}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Product Code:
                </Typography>
                <Typography variant="body2">{product.product_code}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Is Assured:
                </Typography>
                <Typography variant="body2">
                  {product.is_assured ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Active:
                </Typography>
                <Typography variant="body2">
                  {product.is_active ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Tags:
                </Typography>
                <Typography variant="body2">
                  {product.tags.join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Shipping Charges/Km:
                </Typography>
                <Typography variant="body2">
                  {product.shippingChargesPerKm}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Warehouse Pincode:
                </Typography>
                <Typography variant="body2">
                  {product.wareHousePincode}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Specifications:
                </Typography>
                <Typography variant="body2">
                  {product.specifications}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Created At:
                </Typography>
                <Typography variant="body2">
                  {new Date(product.createdAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Updated At:
                </Typography>
                <Typography variant="body2">
                  {new Date(product.updatedAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Technical Documents:
                </Typography>
                {product.technical_docs.length > 0 ? (
                  product.technical_docs.map((doc, index) => (
                    <Typography key={index} variant="body2">
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2" }}
                      >
                        Document {index + 1}
                      </a>
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">None</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {product.product_images.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Additional Images:
            </Typography>
            <Grid container spacing={2}>
              {product.product_images.map((img, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Product Image ${index + 1}`}
                      sx={{ height: 140, objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
