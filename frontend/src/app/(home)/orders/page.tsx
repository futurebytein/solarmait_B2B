"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grow,
} from "@mui/material";
import Image from "next/image";
import { axiosInstance } from "@/lib/axiosInstance";

interface OrderItem {
  name: string;
  cover_image?: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  amount: number;
  payment_status: string;
  status: string;
  razorpay_order: {
    created_at: number;
  };
}

const orderStatuses = [
  "ordered",
  "confirmed",
  "transit",
  "delivered",
  "cancelled",
];
const orderTimes = ["last30days", "2023", "2022", "2021", "older"];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Single-select dropdown values
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Fetch orders with filters
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (selectedStatus) {
          queryParams.append("status", selectedStatus);
        }
        if (selectedTime) {
          queryParams.append("orderTime", selectedTime);
        }

        const response = await axiosInstance.get(
          `/order/get-customer-orders?${queryParams}`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus, selectedTime]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Orders
      </Typography>

      {/* Filter Section with Animation */}
      <Grow in timeout={500}>
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Order Status Dropdown */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                  labelId="order-status-label"
                  label="Order Status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {orderStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Order Time Dropdown */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="order-time-label">Order Time</InputLabel>
                <Select
                  labelId="order-time-label"
                  label="Order Time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <MenuItem value="">All Times</MenuItem>
                  {orderTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Add more filters or actions here if needed */}
          </Grid>
        </Paper>
      </Grow>

      {/* Order List */}
      {orders.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No orders found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={6} key={order._id}>
              <Grow in timeout={(index + 1) * 300}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <Image
                          src={
                            order.orderItems[0]?.cover_image ||
                            "/assets/images/default-product.png"
                          }
                          alt="Product"
                          width={80}
                          height={80}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6" fontWeight="bold">
                          {order.orderItems[0]?.name || "Product Name"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ₹{order.amount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Payment Status:{" "}
                          <strong>
                            {order.payment_status === "paid"
                              ? "Paid"
                              : "Unpaid"}
                          </strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Status:{" "}
                          <strong>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </strong>
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography
                          variant="body2"
                          color={
                            order.status === "delivered" ? "green" : "orange"
                          }
                        >
                          {order.status === "delivered"
                            ? `Delivered on ${new Date(
                                order.razorpay_order.created_at * 1000
                              ).toLocaleDateString()}`
                            : "Processing"}
                        </Typography>
                        {order.status === "delivered" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 1 }}
                          >
                            Rate &amp; Review
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Orders;
