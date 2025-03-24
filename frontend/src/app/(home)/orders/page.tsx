"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
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
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);

  /** ✅ Fetch orders from API with filters */
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (selectedStatus.length) {
          queryParams.append("status", selectedStatus.join(","));
        }
        if (selectedTime.length) {
          queryParams.append("orderTime", selectedTime.join(","));
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedStatus((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value)
    );
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedTime((prev) =>
      checked ? [...prev, value] : prev.filter((time) => time !== value)
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Orders
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <Divider sx={{ my: 1 }} />

          {/* Order Status Filters */}
          <Typography variant="subtitle1" fontWeight="bold">
            Order Status
          </Typography>
          {orderStatuses.map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  value={status}
                  checked={selectedStatus.includes(status)}
                  onChange={handleStatusChange}
                />
              }
              label={status.charAt(0).toUpperCase() + status.slice(1)}
            />
          ))}

          <Divider sx={{ my: 1 }} />

          {/* Order Time Filters */}
          <Typography variant="subtitle1" fontWeight="bold">
            Order Time
          </Typography>
          {orderTimes.map((time) => (
            <FormControlLabel
              key={time}
              control={
                <Checkbox
                  value={time}
                  checked={selectedTime.includes(time)}
                  onChange={handleTimeChange}
                />
              }
              label={time.charAt(0).toUpperCase() + time.slice(1)}
            />
          ))}
        </Grid>

        {/* Order List */}
        <Grid item xs={12} md={9}>
          {orders.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              No orders found.
            </Typography>
          ) : (
            orders.map((order) => (
              <Card key={order._id} sx={{ mb: 2, position: "relative" }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <Image
                        src={
                          order.orderItems[0]?.cover_image ||
                          "/assets/images/default-product.png"
                        }
                        alt="Product"
                        width={60}
                        height={60}
                        style={{ objectFit: "cover" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" fontWeight="bold">
                        {order.orderItems[0]?.name || "Product Name"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ₹{order.amount}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Payment Status:{" "}
                        <strong>
                          {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                        </strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status:{" "}
                        <strong>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
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
                        <Button variant="text" color="primary">
                          Rate & Review Product
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Orders;
