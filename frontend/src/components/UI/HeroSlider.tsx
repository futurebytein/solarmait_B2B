"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircle } from "react-icons/fa";

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

interface SolarSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<SolarSliderProps> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (slides.length === 0) return; // Prevent running if no slides

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides]);
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  textAlign: "center",
                  padding: "0 20px",
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ maxWidth: "800px" }}
                >
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: "700px", mt: 1 }}>
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#0A0B47",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#131562" },
                  }}
                >
                  {slide.buttonText}
                </Button>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, index) => (
          <FaCircle
            key={index}
            size={10}
            color={index === currentIndex ? "#007BFF" : "#888"}
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlider;
