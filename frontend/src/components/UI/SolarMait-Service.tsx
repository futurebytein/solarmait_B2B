import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import Image from "next/image";

// Gradient style
const gradientStyle = {
  background: "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
  color: "black",
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center",
};

const HealthCheckup = () => (
  <Box sx={{ textAlign: "center", my: 8 }}>
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d4af37" }}>
      Health Checkup of your Solar System
    </Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      Get complete health checkup of your home solar system to get enhanced
      performance and savings
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper
        sx={{
          p: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          width: "70%",
          maxWidth: "900px",
        }}
      >
        <Image
          src="/health.png"
          alt="Health Checkup"
          width="250"
          height="600"
        />
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Introductory Offer
          </Typography>
          <Typography variant="h6" sx={{ textDecoration: "line-through" }}>
            ₹2999
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#d4af37" }}
          >
            ₹1499 only
          </Typography>
          <Typography>Save 50%</Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              background:
                "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
            }}
          >
            BUY
          </Button>
          <Typography variant="caption">*18% GST EXTRA</Typography>
        </Box>
      </Paper>
    </Box>
  </Box>
);

const WhoCanBuy = () => (
  <Box sx={{ textAlign: "center", my: 8 }}>
    <Typography
      variant="h4"
      sx={{ fontWeight: "bold", color: "#d4af37", mb: 4 }}
    >
      Who can Buy/ Renew
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          elevation={3}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #fbb034, #ffdd00)",
              color: "black",
              p: 1,
              borderRadius: 1,
              mb: 2,
              textAlign: "center",
            }}
          >
            SOLAR-MAIT Existing Customers
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
            <li>Renew if your AMC has expired</li>
            <li>Buy a new package</li>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          elevation={3}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #fbb034, #ffdd00)",
              color: "black",
              p: 1,
              borderRadius: 1,
              mb: 2,
              textAlign: "center",
            }}
          >
            Non-SOLAR-MAIT Customers
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
            <li>If you are not happy with your system's service</li>
            <li>If you want higher savings</li>
            <li>Get a System Health Check-up for ₹1499 all-inclusive</li>
            <li>Or buy any of our AMC packages</li>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const AMCPackages = () => (
  <Box sx={{ textAlign: "center", my: 8 }}>
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d4af37" }}>
      SOLAR-MAIT Care – AMC Packages to Choose From
    </Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      Choose from our AMC packages tailored to provide complete peace of mind
      for the next 25 years.
    </Typography>
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {[
        {
          name: "Silver Package",
          discount: "25% off",
          oldPrice: "₹3999",
          newPrice: "₹2999",
        },
        {
          name: "Gold Package",
          discount: "30% off",
          oldPrice: "₹9999",
          newPrice: "₹6999",
        },
        {
          name: "Platinum Package",
          discount: "25% off",
          oldPrice: "₹15999",
          newPrice: "₹11999",
        },
      ].map((pkg, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              background: gradientStyle.background,
              color: "black",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pkg.name}
            </Typography>
            <Typography>{pkg.discount}</Typography>
            <Typography variant="h5" sx={{ textDecoration: "line-through" }}>
              {pkg.oldPrice}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {pkg.newPrice}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "black", color: "#d4af37" }}
            >
              BUY
            </Button>
            <Typography variant="caption">*18% GST EXTRA</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const SolarMaitAMC = () => (
  <Box>
    <HealthCheckup />
    <WhoCanBuy />
    <AMCPackages />
  </Box>
);

export default SolarMaitAMC;
