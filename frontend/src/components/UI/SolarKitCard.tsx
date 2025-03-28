import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";

// Define the SolarKit interface based on your schema
interface SolarKit {
  _id: string;
  name: string;
  description?: string;
  category?: string; // e.g., "OnGrid", "OffGrid", "Hybrid"
  technical_docs?: string[];
  products?: string[]; // references to product IDs
}

interface SolarKitCardProps {
  kit: SolarKit;
}

const SolarKitCard: React.FC<SolarKitCardProps> = ({ kit }) => {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        padding: 1,
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Link to a details page for solar kits (adjust URL as needed) */}
      <Link href={`/solar-kits/${kit._id}`} passHref>
        <CardMedia
          component="img"
          image="/placeholder-solar-kit.png" // or a real image if available
          alt={kit.name}
          sx={{
            height: 180,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            padding: 1,
          }}
        />
      </Link>

      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          {kit.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {kit.description
            ? `${kit.description.substring(0, 60)}...`
            : "No description available"}
        </Typography>

        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
          {/* View Details Button */}
          <Link href={`/solar-kits/${kit._id}`} passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFCC00",
                color: "white",
                "&:hover": { backgroundColor: "#FFD700" },
              }}
            >
              View Details
            </Button>
          </Link>

          {/* If you need "Add to Cart" or other actions, replicate them here */}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SolarKitCard;
