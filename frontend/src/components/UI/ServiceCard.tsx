"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Modal,
  Box,
  Divider,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddressSelection from "@/components/UI/AddressSelection";
import { useAuth } from "@/contexts/AuthContext";

// Define Service Type
interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
}
interface Order {
  _id: string;
  service: string;
  address: string;
  status: string;
  razorpay_order: {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    created_at: number;
  };
}

interface ServiceCardProps {
  service: Service;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_signature: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { defaultAddress } = useAuth(); // Get default address from context
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** ✅ **Step 1: Create Order via Backend** */
  const handlePayment = async () => {
    try {
      if (!defaultAddress) {
        alert("Please select an address first.");
        return;
      }

      const payload = {
        service: service._id,
        address: defaultAddress,
      };

      const orderResponse = await axiosInstance.post(
        "/services/booking/create",
        payload
      );
      const { success, booking } = orderResponse.data;

      if (!success || !booking) {
        alert("Failed to create order. Please try again.");
        return;
      }

      setCreatedOrder(booking); // Store order details for later verification

      // ✅ **Step 2: Extract Razorpay Order Details**
      const { razorpay_order } = booking;

      // ✅ **Step 3: Initialize Razorpay**
      const options = {
        key: "rzp_test_i5CHDnzV5RiUZp", // Replace with actual Razorpay Key
        amount: razorpay_order.amount_due.toString(),
        currency: "INR",
        name: "SolarMait Service",
        description: service.name,
        order_id: razorpay_order.id, // Use order_id from backend
        handler: async function (response: RazorpayPaymentResponse) {
          await verifyPayment(response, razorpay_order.id);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
        },
        theme: { color: "#FFCC00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to initiate payment.");
    }
  };

  /** ✅ **Step 4: Verify Payment with Backend** */
  const verifyPayment = async (
    response: RazorpayPaymentResponse,
    razorpay_orderID: string
  ) => {
    try {
      const verifyResponse = await axiosInstance.put(
        "/services/booking/verify",
        {
          razorpay_orderID,
          razorpay_paymentID: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      );

      if (verifyResponse.data.success) {
        alert("Payment successful! Your service is booked.");
        handleClose();
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error("Payment verification failed", error);
      alert("An error occurred while verifying payment.");
    }
  };

  return (
    <>
      {/* Service Card */}
      <Card
        sx={{
          height: "100%",
          boxShadow: 3,
          padding: 2,
          border: "1px solid #e0e0e0",
          cursor: "pointer",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {service.category.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {service.description.substring(0, 60)}...
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#333", marginTop: 1 }}
          >
            ₹{service.price.toLocaleString()}
          </Typography>

          <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFCC00",
                color: "white",
                "&:hover": { backgroundColor: "#FFD700" },
              }}
              onClick={handleOpen}
            >
              Book Now
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Modal for Address & Payment */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            mx: "auto",
            mt: "10%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Confirm Booking
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Address Selection */}
          <AddressSelection />

          {/* Service Details */}
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
            Service: {service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {service.category.toUpperCase()}
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
            Price: ₹{service.price.toLocaleString()}
          </Typography>

          {/* Continue to Payment */}
          <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFCC00",
                color: "white",
                "&:hover": { backgroundColor: "#FFD700" },
              }}
              onClick={handlePayment}
            >
              Continue to Payment
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ServiceCard;
