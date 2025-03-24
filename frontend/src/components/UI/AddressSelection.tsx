"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAuth } from "@/contexts/AuthContext";

// Define the Address type
interface Address {
  _id: string;
  concernedPersonName: string;
  concernedPersonContact: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

const AddressSelection: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { defaultAddress, setDefaultAddressAndSync } = useAuth(); // Access auth context

  // Fetch default address from the API
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const response = await axiosInstance.get<{
          success: boolean;
          address: Address[];
        }>("/order/address/default-address/");

        if (response.data.success && response.data.address.length > 0) {
          const fetchedAddress = response.data.address[0]; // API returns an array

          setSelectedAddress(fetchedAddress);

          // Update default address in the context if it's different
          if (defaultAddress !== fetchedAddress._id) {
            setDefaultAddressAndSync(fetchedAddress._id);
          }
        } else {
          setSelectedAddress(null); // Handle case where no default address exists
        }
      } catch (error) {
        console.error("Failed to fetch default address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultAddress();
  }, [defaultAddress, setDefaultAddressAndSync]); // Dependencies ensure correct updates

  const handleChangeAddress = () => {
    router.push("/profile/addresses");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ padding: 2, mb: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Delivering to
      </Typography>
      <Divider sx={{ my: 2 }} />
      <CardContent>
        {selectedAddress ? (
          <>
            <Typography variant="body1" fontWeight="bold">
              {selectedAddress.concernedPersonName}
            </Typography>
            <Typography variant="body2">
              {selectedAddress.addressLine1}, {selectedAddress.addressLine2},{" "}
              {selectedAddress.city}, {selectedAddress.state},{" "}
              {selectedAddress.pinCode}, {selectedAddress.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact: {selectedAddress.concernedPersonContact}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="error">
            No default address found. Please add one.
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="text" onClick={handleChangeAddress}>
            Change Address
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddressSelection;
