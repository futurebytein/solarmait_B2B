"use client";
import React from "react";
import { Box, Card, Typography } from "@mui/material";

// Interface for SolarKit data
interface SolarKit {
  _id: string;
  name: string;
  description: string;
  // Add more fields as required (e.g., vendor, tags, etc.)
}

interface KitDescriptionProps {
  kit: SolarKit;
}

const KitDescription: React.FC<KitDescriptionProps> = ({ kit }) => {
  return (
    <Card
      sx={{
        padding: 4,
        backgroundColor: "#FFF7E6",
        boxShadow: 4,
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        maxWidth: "75%",
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        {kit.name}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" sx={{ color: "gray" }}>
          {kit.description}
        </Typography>
      </Box>
    </Card>
  );
};

export default KitDescription;
