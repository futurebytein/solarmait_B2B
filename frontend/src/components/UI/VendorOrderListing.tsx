"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Pagination,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

interface VendorOrderListingProps {
  vendorId: string;
  onOrderClick: (orderData: any) => void;
}

const VendorOrderListing: React.FC<VendorOrderListingProps> = ({
  vendorId,
  onOrderClick,
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(2);
  const [count, setCount] = useState<number>(0);

  const fetchOrders = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/order/get-vendor-order/${vendorId}?page=${pageNumber}&limit=${limit}`
      );
      if (response.data.success) {
        setOrders(response.data.vendorOrder);
        setCount(response.data.count);
      } else {
        setError("Failed to fetch orders.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page, vendorId, limit]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      {orders.length === 0 ? (
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          No orders found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {orders.map((orderData) => (
            <Grid item xs={12} key={orderData._id}>
              <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    Order ID: {orderData.order._id}
                  </Typography>
                  <Typography variant="body2">
                    Status: {orderData.order.status}
                  </Typography>
                  <Typography variant="body2">
                    Payment: {orderData.order.payment_status}
                  </Typography>
                  <Typography variant="body2">
                    Amount: ₹{orderData.order.amount}
                  </Typography>
                  <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      onClick={() => onOrderClick(orderData)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {count > limit && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(count / limit)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default VendorOrderListing;
