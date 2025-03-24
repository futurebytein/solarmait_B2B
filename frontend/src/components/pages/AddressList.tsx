"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
  Switch,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddressModal from "@/components/UI/AddressModal";

interface Address {
  _id: string;
  concernedPersonName: string;
  concernedPersonEmail: string; // Added missing field
  concernedPersonContact: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  landmark: string;
  town: string; // Added missing field
  defaultaddress: boolean;
}

const AddressList: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // Fetch all addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get<{ addresses: Address[] }>(
        "order/address/get-all"
      );
      console.log("response: address : ", response.data);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleToggleActive = async (addressId: string) => {
    try {
      await axiosInstance.put(`/order/address/mark-as-default/${addressId}`);
      await fetchAddresses(); // Fetch updated addresses after toggling default
    } catch (error) {
      console.error("Failed to mark address as default:", error);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await axiosInstance.delete(`/order/address/${addressId}`);
      setAddresses((prev) =>
        prev.filter((address) => address._id !== addressId)
      );
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleOpenModal = (address: Address | null = null) => {
    setCurrentAddress(address);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentAddress(null);
  };

  const handleAddressSubmit = async (formData: Partial<Address>) => {
    try {
      if (currentAddress) {
        // Edit existing address
        await axiosInstance.put(
          `order/address/edit/${currentAddress._id}`,
          formData
        );
        setAddresses((prev) =>
          prev.map((address) =>
            address._id === currentAddress._id
              ? { ...address, ...formData }
              : address
          )
        );
      } else {
        // Create a new address
        const response = await axiosInstance.post<{ address: Address }>(
          "order/address/create",
          formData
        );
        setAddresses((prev) => [...prev, response.data.address]);
      }
    } catch (error) {
      console.error("Failed to submit address:", error);
    } finally {
      handleCloseModal();
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading addresses...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Addresses
      </Typography>
      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item xs={12} md={6} key={address._id}>
            <Card sx={{ padding: 2, position: "relative" }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {address.concernedPersonName}
                </Typography>
                <Switch
                  checked={address.defaultaddress}
                  onChange={() => handleToggleActive(address._id)}
                  color="primary"
                />
              </Box>
              <Divider sx={{ my: 1 }} />
              <CardContent>
                <Typography variant="body2">
                  {address.addressLine1}, {address.addressLine2}, {address.city}
                  ,{address.state}, {address.pinCode}, {address.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Landmark: {address.landmark}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {address.concernedPersonContact}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="text" onClick={() => handleOpenModal(address)}>
                  Edit
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Add New Address
          </Button>
        </Grid>
      </Grid>

      {/* Address Modal */}
      <AddressModal
        open={modalOpen}
        onClose={handleCloseModal}
        initialData={currentAddress || undefined} // ✅ Pass `undefined` instead of `[]`
        onSubmit={handleAddressSubmit}
      />
    </Box>
  );
};

export default AddressList;
