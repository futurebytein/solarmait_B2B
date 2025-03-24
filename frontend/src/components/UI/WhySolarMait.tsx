import React from "react";
import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import Image from "next/image";
import { MonetizationOn, Business, Build } from "@mui/icons-material";

const WhySolarMait = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 2, md: 6 },
        backgroundColor: "#F9FAFB",
        borderRadius: 2,
        boxShadow: 2,
        gap: 0,
        px: 8,
      }}
    >
      {/* Left Section - Image & Tagline */}
      <Box sx={{ flex: 1, textAlign: "center", position: "relative" }}>
        {/* <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            background: "#002147",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 1,
            fontSize: "14px",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Making Rooftop Solar Affordable & Accessible
        </Box> */}
        <Image
          src="/solarmaitTeam.png"
          alt="Solar Mait Team"
          width={450}
          height={350}
          style={{
            borderRadius: "12px",
            marginLeft: "30px",
            boxShadow: "2px 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      {/* Right Section - Features & Details */}
      <Box sx={{ flex: 1, textAlign: "left", px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#002147",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Why Customers Go Solar with{" "}
          <span style={{ color: "orange" }}>SOLAR-MAIT</span>
        </Typography>

        {/* Feature List */}
        {[
          {
            icon: <MonetizationOn sx={{ fontSize: 40, color: "#FFD700" }} />,
            title: "Affordable & Easy Solar Plans",
            description:
              "We offer affordable cash pricing, easy EMI plans, and short-term leasing options for everyone.",
          },
          {
            icon: <Business sx={{ fontSize: 40, color: "#FFD700" }} />,
            title: "Access to All Reputed Brands",
            description:
              "We collaborate with leading solar brands to provide you with the best options available.",
          },
          {
            icon: <Build sx={{ fontSize: 40, color: "#FFD700" }} />,
            title: "2000+ Technicians for Fast Service",
            description:
              "With 2000+ certified technicians, we ensure quick service and lifetime support.",
          },
        ].map((feature, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
          >
            {feature.icon}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#002147" }}
              >
                {feature.title}
              </Typography>
              <Typography sx={{ color: "#555", fontSize: "14px" }}>
                {feature.description}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Action Button */}
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#002147",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#004080" },
            display: "block",
            mx: { xs: "auto", md: "0" }, // Center button on mobile, left on desktop
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default WhySolarMait;
