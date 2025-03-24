"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { MonetizationOn, AccessTime, CheckCircle } from "@mui/icons-material";

const loanFeatures = [
  {
    title: "Zero Cost EMI",
    description:
      "Enjoy the benefit of paying for your solar system with no extra charges under our Zero Cost EMI scheme.",
    icon: <MonetizationOn fontSize="large" />,
  },
  {
    title: "Up to 60 Months Tenure",
    description:
      "Flexibility in payment with loan tenures extending up to 60 months, catering to your financial convenience.",
    icon: <AccessTime fontSize="large" />,
  },
  {
    title: "Loan Approval Within 3 Minutes",
    description:
      "Rapid and efficient loan evaluation, with decisions made in just 3 minutes, streamlining your path to solar energy.",
    icon: <CheckCircle fontSize="large" />,
  },
];

const QuickEasySolarLoans = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Box sx={{ py: 14, px: 12, backgroundColor: "#FFF7E6" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#D4AF37", mb: 6 }}
      >
        Quick & Easy Solar Loans
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {loanFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ height: "250px" }}
            >
              <Paper
                elevation={hoveredIndex === index ? 6 : 3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: hoveredIndex === index ? "#FFD700" : "white",
                  color: hoveredIndex === index ? "black" : "black",
                  borderRadius: "12px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickEasySolarLoans;
