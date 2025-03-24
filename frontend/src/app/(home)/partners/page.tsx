import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import PartnerCard from "@/components/UI/PartnerCard";
import WhySolarmait from "@/components/UI/WhySolarMait";
import PartnerForm from "@/components/UI/partnerForm";
import SolarSlider from "@/components/UI/HeroSlider";

interface PartnerCardProps {
  title: string;
  buttonText?: string;
  icon: string;
}
const dummySlides = [
  {
    image: "assets/banner/image1.jpg", // Replace with your image paths
    title: "Innovative Solar Solutions",
    description:
      "Harness the power of the sun with our state-of-the-art solar panels.",
    buttonText: "Learn More",
  },
  {
    image: "assets/banner/image2.jpg",
    title: "Eco-Friendly Energy",
    description:
      "Join the green revolution and reduce your carbon footprint today.",
    buttonText: "Join Now",
  },
  {
    image: "assets/banner/image3.jpg",
    title: "Affordable Solar Plans",
    description: "Customizable solar plans that fit every budget.",
    buttonText: "Get Started",
  },
];

const partnerPrograms = [
  {
    title: "BECOME SOLAR ADVISOR PARTNER",
    buttonText: "SOLAR ADVISOR PARTNER",
    icon: "/icons/advisor.svg",
  },
  {
    title: "BECOME IN-STORE BUSINESS PARTNER",
    buttonText: "SOLAR IN-STORE PARTNER",
    icon: "/icons/store.svg",
  },
  {
    title: "BECOME SOLAR BUDDY PARTNER",
    buttonText: "SOLAR BUDDY PARTNER",
    icon: "/icons/buddy.svg",
  },
];
const solarBusiness = [
  {
    title: "GROWTH POTENTIAL",
    icon: "/icons/advisor.svg",
  },
  {
    title: "FINANCIAL INCENTIVES",
    icon: "/icons/store.svg",
  },
  {
    title: "ENVIRONMENT IMPACTS",
    icon: "/icons/buddy.svg",
  },
];
const whySolarmait = [
  {
    title: "UNMATCHED COMMISSION RATES",
    icon: "/icons/advisor.svg",
  },
  {
    title: "TRAINING & SUPPORT",
    icon: "/icons/store.svg",
  },
  {
    title: "NAIONAL ACESS TO SOLAR PRODUCTS & BOM",
    icon: "/icons/buddy.svg",
  },
];

const SolarPartnerCards: React.FC = () => {
  return (
    <>
      <SolarSlider slides={dummySlides} />

      <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#f4f4f4" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: "#000" }}
        >
          Solar Business Partnership Opportunity for Everyone
        </Typography>
        <Typography sx={{ mb: 4, color: "#555" }}>
          Now start your own solar business or career by partnering with
          SOLAR-MAIT in this booming market
        </Typography>
        <Grid container spacing={3} justifyContent="center" px={8}>
          {partnerPrograms.map((program, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PartnerCard {...program} />
            </Grid>
          ))}
        </Grid>

        {/*   WHY SOLAR BUSINESS */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, mt: 10, color: "#000" }}
        >
          WHY SOLAR BUSINESS
        </Typography>

        <Grid container spacing={3} justifyContent="center" px={8}>
          {solarBusiness.map((program, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PartnerCard {...program} />
            </Grid>
          ))}
        </Grid>

        {/*    WHY SOLAR-MAIT */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, mt: 10, color: "#000" }}
        >
          WHY SOLAR-MAIT
        </Typography>

        <Grid container spacing={3} justifyContent="center" px={8} mb={10}>
          {whySolarmait.map((program, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PartnerCard {...program} />
            </Grid>
          ))}
        </Grid>

        <WhySolarmait />
        <PartnerForm />
      </Box>
    </>
  );
};

export default SolarPartnerCards;
