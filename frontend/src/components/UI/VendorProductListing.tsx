"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Pagination,
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  cover_image: string;
  product_images: string[];
  category: string;
  stock: number;
  subCategory?: string;
  // additional fields as needed
}

interface VendorProductListingProps {
  vendorId: string;
  onProductClick: (product: Product) => void;
}

const VendorProductListing: React.FC<VendorProductListingProps> = ({
  vendorId,
  onProductClick,
}) => {
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchVendorProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/products/get-vendor-products/${vendorId}?page=${page}&limit=${limit}`
      );
      if (response.data.success) {
        setVendorProducts(response.data.products);
        const total = response.data.count;
        setTotalPages(Math.ceil(total / limit));
      } else {
        setError("Failed to fetch vendor products.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching vendor products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorProducts();
  }, [vendorId, page, limit]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLimit = event.target.value as number;
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (vendorProducts.length === 0) {
    return <Typography>No products found for this vendor.</Typography>;
  }

  return (
    <Box>
      <Fade in timeout={600}>
        <List>
          {vendorProducts.map((product) => (
            <ListItem
              key={product._id}
              sx={{
                mb: 1,
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer",
              }}
              onClick={() => onProductClick(product)}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={product.cover_image}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{product.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.category}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Fade>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="limit-select-label">Items per page</InputLabel>
          <Select
            labelId="limit-select-label"
            value={limit}
            label="Items per page"
            onChange={handleLimitChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default VendorProductListing;
