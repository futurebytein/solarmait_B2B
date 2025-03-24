"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const WhySolarMait = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: isSmallScreen ? 2 : 4,
        background:
          "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1, textAlign: "center", mb: isSmallScreen ? 3 : 0 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            background: "#002147",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body1"
            fontSize={isSmallScreen ? "0.9rem" : "1rem"}
          >
            Making Rooftop Solar Affordable & Accessible
          </Typography>
        </Box>
        <Image
          src="/solarmaitTeam.png"
          alt="Solar Mait Team"
          width={isSmallScreen ? 300 : 400}
          height={isSmallScreen ? 225 : 300}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: isSmallScreen ? "center" : "left",
          px: isSmallScreen ? 0 : 4,
          color: "black",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          sx={{ fontWeight: "bold", mb: 3, color: "#002147" }}
        >
          SOLAR-MAIT Partner Program
        </Typography>

        <Link href="https://solarmait-admin-1.vercel.app/registration" passHref>
          <Button
            variant="contained"
            sx={{
              background: "#002147",
              color: "white",
              fontSize: isSmallScreen ? "16px" : "18px",
              fontWeight: "bold",
              padding: isSmallScreen ? "10px 20px" : "12px 24px",
              width: isSmallScreen ? "80%" : "100%",
              mb: 3,
              mx: isSmallScreen ? "auto" : 0,
            }}
          >
            Become a Solar Partner
          </Button>
        </Link>

        <Typography
          sx={{ color: "#555", fontSize: isSmallScreen ? "13px" : "14px" }}
        >
          Join our growing network of solar professionals and businesses. As a
          SOLAR-MAIT partner, you get access to industry-leading support,
          training, and commission rates. Whether you're an advisor, retailer,
          or technician, we have a partnership opportunity for you.
        </Typography>
      </Box>
    </Box>
  );
};

export default WhySolarMait;
