"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import AddressSelection from "../UI/AddressSelection";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  product_images: string[];
}

interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountPercent: number;
  maxDiscount: number;
  // ...any other fields your coupon might have
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface OrderResponse {
  success: boolean;
  createdOrder: {
    razorpay_order: {
      id: string;
      amount: number;
      currency: string;
    };
  };
}

const Cart = () => {
  const { user, setUserAndSync, defaultAddress } = useAuth();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Price states
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Coupon-related states
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  const router = useRouter();

  // Fetch cart details
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await axiosInstance.get<{ cart: Product[] }>(
          "/products/cart/details"
        );
        setCartItems(response.data.cart);
        calculateTotalPrice(response.data.cart);
      } catch (error) {
        console.error("Failed to fetch cart details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  // Calculate total price from cart items
  const calculateTotalPrice = (cart: Product[]) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Remove product from cart
  const handleRemoveFromCart = async (productId: string) => {
    try {
      await axiosInstance.post(`/products/remove-from-cart/${productId}`);
      const updatedCart = cartItems.filter(
        (product) => product._id !== productId
      );
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);

      // Clear coupon if cart changes significantly (optional)
      setAppliedCoupon(null);
      setDiscount(0);

      setUserAndSync({
        ...user,
        cart:
          updatedCart.length > 0
            ? ([updatedCart[0]._id] as [string])
            : undefined,
        _id: user?._id ?? "",
        name: user?.name ?? "",
        email: user?.email ?? "",
        role: user?.role ?? "",
      });
    } catch (error) {
      console.error("Failed to remove product from cart", error);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Apply coupon code
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const response = await axiosInstance.get<{ coupon: Coupon }>(
        `coupon/coupon-code/${couponCode}`
      );
      const coupon = response.data.coupon;

      if (!coupon) {
        toast.error("Invalid or expired coupon code.");
        setAppliedCoupon(null);
        setDiscount(0);
        return;
      }

      // Calculate discount
      const productTotal = totalPrice;
      // If you have GST, you might do: const gstTotal = productTotal * 0.18;
      // For now, let's skip GST or set gstTotal = 0
      const gstTotal = 0; // Adjust if you do have a GST calculation

      // discount = min(productTotal * discountPercent / 100, coupon.maxDiscount)
      const discountCalculated = Math.min(
        (productTotal * coupon.discountPercent) / 100,
        coupon.maxDiscount
      );

      setDiscount(discountCalculated);
      setAppliedCoupon(coupon);
      toast.success(`Coupon "${coupon.code}" applied!`);
    } catch (error: any) {
      console.error("Failed to apply coupon", error);
      toast.error(
        error?.response?.data?.message || "Failed to apply coupon. Try again."
      );
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      // Final amount after discount (and GST if any)
      const finalAmount = totalPrice - discount;
      // If you have a backend that calculates the final amount again,
      // you may only need to send the coupon ID. The server will do the math.

      const payload: any = {
        address: defaultAddress,
        paymentMode: "online",
      };

      // If a coupon is applied, pass its _id to the backend
      if (appliedCoupon) {
        payload.coupon = appliedCoupon._id;
      }

      // 1. Create order via your backend
      const orderResponse = await axiosInstance.post("/order/create", payload);
      const { success, createdOrder } = orderResponse.data;

      if (!success || !createdOrder) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const { razorpay_order } = createdOrder;

      // 2. Razorpay options
      const options: RazorpayOptions = {
        key: "rzp_test_i5CHDnzV5RiUZp",
        amount: razorpay_order.amount.toString(),
        currency: razorpay_order.currency || "INR",
        name: "SOLAR-MAIT Order",
        description: "Complete your payment",
        order_id: razorpay_order.id,
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            const verifyResponse = await axiosInstance.post("/order/verify", {
              razorpay_orderID: razorpay_order.id,
              razorpay_paymentID: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful and verified!");
              setUserAndSync({
                ...user,
                cart: undefined,
                _id: user?._id ?? "",
                name: user?.name ?? "",
                email: user?.email ?? "",
                role: user?.role ?? "",
              });
              setCartItems([]); // Clear local cart items
              router.push("/orders");
            }
          } catch (verificationError) {
            console.error("Payment verification failed", verificationError);
            alert("An error occurred while verifying the payment.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#FFCC00",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh and try again.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout process failed", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading your cart...</Typography>;
  }

  // finalPrice after discount
  const finalPrice = totalPrice - discount;

  return (
    <Grid container spacing={3} className="p-6">
      {/* Left Section: Cart Items */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" className="font-extrabold" gutterBottom>
          My Cart ({cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"})
        </Typography>
        <AddressSelection />
        {cartItems.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Your cart is empty.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {cartItems.map((product) => (
              <Card key={product._id} sx={{ padding: 2, position: "relative" }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleRemoveFromCart(product._id)}
                >
                  Remove
                </Button>
                <Box display="flex">
                  <Image
                    src={
                      product.product_images[0] ||
                      "/assets/images/default-product.png"
                    }
                    alt={product.name}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, fontWeight: "bold" }}
                    >
                      ₹{product.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Grid>

      {/* Right Section: Order Summary */}
      <Grid item xs={12} md={4}>
        <Card sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Subtotal */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">
              ₹{totalPrice.toLocaleString()}
            </Typography>
          </Box>

          {/* Delivery Charges */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1">Delivery Charges</Typography>
            <Typography variant="body1">₹0 (Free)</Typography>
          </Box>

          {/* Coupon Code Input */}
          <Box display="flex" gap={1} alignItems="center" mb={2}>
            <TextField
              label="Coupon Code"
              variant="outlined"
              size="small"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={handleApplyCoupon}>
              Apply
            </Button>
          </Box>

          {/* Discount Row (only if a coupon is applied) */}
          {appliedCoupon && discount > 0 && (
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1" color="green">
                Discount ({appliedCoupon.code})
              </Typography>
              <Typography variant="body1" color="green">
                -₹{discount.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Final Total */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{finalPrice.toLocaleString()}
            </Typography>
          </Box>

          {/* Checkout Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            sx={{
              backgroundColor: "#FFCC00",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#FFD700" },
            }}
          >
            Proceed to Checkout
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
