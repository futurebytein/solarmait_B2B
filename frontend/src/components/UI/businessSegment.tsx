"use client";
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  Factory,
  Store,
  LocalHospital,
  School,
  LocalGasStation,
} from "@mui/icons-material";

const businessSegments = [
  { label: "Industries", icon: <Factory fontSize="large" /> },
  { label: "Commercial Establishments", icon: <Store fontSize="large" /> },
  { label: "Healthcare Centres", icon: <LocalHospital fontSize="large" /> },
  { label: "Educational Institutions", icon: <School fontSize="large" /> },
  { label: "Petrol Pumps", icon: <LocalGasStation fontSize="large" /> },
];

const BusinessSegments = () => {
  return (
    <Box sx={{ py: 14, px: 12, backgroundColor: "#FFF7E6" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#D4AF37", mb: 6 }}
      >
        Solar Solutions for Diverse Business Segments
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {businessSegments.map((segment, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ height: "150px" }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #D4AF37",
                  borderRadius: "12px",
                  transition: "0.3s",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#FFD700",
                    color: "black",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box sx={{ color: "#D4AF37", mb: 1 }}>{segment.icon}</Box>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {segment.label}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BusinessSegments;
