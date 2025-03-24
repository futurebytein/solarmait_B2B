"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axiosInstance } from "@/lib/axiosInstance";
import ServiceCard from "./ServiceCard";

// Define Service Type
interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
}

// Define Props for ServicesModal
interface ServicesModalProps {
  open: boolean;
  onClose: () => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ open, onClose }) => {
  const [services, setServices] = useState<Service[]>([]); // ✅ Ensure services is an array of Service objects
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      const fetchServices = async () => {
        try {
          const response = await axiosInstance.get<{ services: Service[] }>(
            "/services/get-all"
          );
          setServices(response.data.services);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchServices();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80%",
          bgcolor: "white",
          mx: "auto",
          my: 4,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            Our Services
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} mt={2}>
            {services.length > 0 ? (
              services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service._id}>
                  <ServiceCard service={service} />
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center", width: "100%", mt: 2 }}
              >
                No services available.
              </Typography>
            )}
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default ServicesModal;
