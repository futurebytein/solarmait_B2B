"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Fade,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the router

const HeroSection = () => {
  const router = useRouter(); // Initialize router

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: "80vh",
        // Darker gold gradient for better text contrast
        background: "linear-gradient(135deg, #FFC107 10%, #FFA000 100%)",
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 10 },
      }}
    >
      {/* Semi-transparent overlay to improve text visibility */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.2)", // Adjust the 0.2 value to darken/lighten
          zIndex: 1,
        }}
      />

      {/* Decorative wave at the bottom (above overlay) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          lineHeight: 0,
          transform: "translateY(1px)",
          zIndex: 2,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="#fff"
        >
          <path
            fillOpacity="1"
            d="M0,288L48,266.7C96,245,192,203,288,170.7C384,139,480,117,576,138.7
            C672,160,768,224,864,256C960,288,1056,288,1152,250.7C1248,213,1344,139,1392,101.3
            L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320
            C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </Box>

      {/* Fade-in animation for hero content */}
      <Fade in timeout={1000}>
        <Container sx={{ position: "relative", zIndex: 3 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side: text and CTA */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#fff",
                  fontSize: { xs: "2rem", md: "3rem" },
                  textShadow: "0 2px 4px rgba(0,0,0,0.4)", // Improves contrast
                }}
              >
                Welcome to SOLAR-MAIT
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  opacity: 0.95,
                  mb: 3,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                India’s Largest B2B Solar Equipment Procurement Platform
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: "90%",
                  textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                Explore the most extensive B2B procurement platform for solar
                equipment in India, providing unmatched variety and quality to
                power your solar projects of all sizes.
              </Typography>

              {/* Search Bar */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 4,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="What are you looking for?"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    flexGrow: 1,
                    maxWidth: { xs: "100%", sm: "300px", md: "400px" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#333",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#555",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>

              {/* Sign Up CTA */}
              <Button
                variant="contained"
                onClick={() => router.push("/register")} // Use router.push
                size="large"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Sign Up Now
              </Button>
            </Grid>

            {/* Right side: illustrative image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, md: 400 },
                }}
              >
                {/* Replace with your own solar-related image in /public */}
                <Image
                  src="/solarmaitTeam.png"
                  alt="Solar Panels"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
};

export default HeroSection;
