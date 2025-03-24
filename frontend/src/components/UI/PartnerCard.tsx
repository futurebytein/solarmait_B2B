"use client";
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerCardProps {
  title: string;
  buttonText?: string;
  icon: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  title,
  buttonText,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card
        sx={{
          background:
            "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
          color: "black",
          padding: 2,
          height: 300,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, fontSize: "1.25rem" }}
          >
            {title}
          </Typography>
          <Image src={icon} alt={title} width={60} height={60} />
          {buttonText && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#004AAD",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#00337a",
                },
              }}
            >
              {buttonText}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PartnerCard;
