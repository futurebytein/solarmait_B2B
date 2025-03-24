"use client";

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Import tab components
import SolarBasics from "./SolarBasics";
import SolarComponents from "./SolarComponents";
import SolarBenefits from "./SolarBenefits";
import Faqs from "./FAQs";
import SuccessStories from "./SuccessStories";
import SolarMaitNews from "./SolarMaitNews";

const tabData = [
  { label: "SOLAR BASICS", component: <SolarBasics /> },
  { label: "SOLAR COMPONENTS", component: <SolarComponents /> },
  { label: "SOLAR BENEFITS", component: <SolarBenefits /> },
  { label: "FAQS", component: <Faqs /> },
  { label: "SUCCESS STORIES", component: <SuccessStories /> },
  { label: "SOLARMAIT IN NEWS", component: <SolarMaitNews /> },
];

const LearnSolar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700) 50%, white 50%",
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isSmallScreen ? "20px 10px" : "40px 0",
      }}
    >
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        fontWeight="bold"
        textAlign="center"
        mb={3}
      >
        Learn About Solar Energy
      </Typography>

      {/* Centered Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons={isSmallScreen ? "auto" : false}
        centered={!isSmallScreen} // This helps center tabs on larger screens
        TabIndicatorProps={{
          style: {
            backgroundColor: "#fbb034", // Custom indicator color if needed
          },
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 2,
          padding: isSmallScreen ? "5px 10px" : "5px 20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          overflowX: isSmallScreen ? "auto" : "visible",
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "0.75rem" : "1rem",
              minWidth: isSmallScreen ? "100px" : "auto",
            }}
          />
        ))}
      </Tabs>

      {/* Content Container */}
      <Container
        sx={{
          mt: 3,
          minHeight: "auto",
          width: isSmallScreen ? "100%" : "80%",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          padding: isSmallScreen ? "15px" : "20px",
        }}
      >
        {tabData[selectedTab].component}
      </Container>
    </Box>
  );
};

export default LearnSolar;
