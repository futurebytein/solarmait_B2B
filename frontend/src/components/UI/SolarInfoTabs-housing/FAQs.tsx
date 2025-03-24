import { useState } from "react";
import {
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQItem {
  question: string;
  answer: string;
}

const faqsData: Record<
  "General" | "Solar Maintenance" | "Solar Economics",
  FAQItem[]
> = {
  General: [
    {
      question: "What is SolarSquare?",
      answer:
        "SolarSquare is a company providing solar energy solutions for homes and businesses.",
    },
    {
      question: "What is a solar rooftop system?",
      answer:
        "A solar rooftop system consists of solar panels installed on roofs to generate electricity.",
    },
    {
      question: "How does a solar rooftop system work?",
      answer:
        "Solar panels capture sunlight and convert it into electricity through photovoltaic cells.",
    },
    {
      question: "How to apply for a solar rooftop subsidy?",
      answer:
        "You can apply for a solar rooftop subsidy through government-approved programs and schemes.",
    },
    {
      question: "What is the solar panel price in India without a subsidy?",
      answer:
        "The price varies based on capacity and technology, ranging from ₹40,000 to ₹2,00,000.",
    },
    {
      question: "Why should I go solar?",
      answer:
        "Solar energy reduces electricity bills, provides energy independence, and is eco-friendly.",
    },
    {
      question: "Is solar power safe?",
      answer:
        "Yes, solar power systems are safe when installed correctly and maintained properly.",
    },
    {
      question: "What do I need to install a rooftop solar system?",
      answer:
        "You'll need solar panels, an inverter, a battery (optional), and mounting structures.",
    },
    {
      question: "What are the different types of solar systems?",
      answer: "On-grid, off-grid, and hybrid solar power systems.",
    },
    {
      question:
        "Do solar panels generate electricity during monsoon and winter?",
      answer:
        "Yes, but efficiency may be reduced due to lower sunlight availability.",
    },
  ],
  "Solar Maintenance": [
    {
      question: "What is the life of a rooftop solar system?",
      answer: "Typically 25 to 30 years with proper maintenance.",
    },
    {
      question: "Do solar rooftop projects have high maintenance costs?",
      answer: "No, maintenance is low, mainly consisting of periodic cleaning.",
    },
    {
      question: "Can solar projects damage my roof?",
      answer: "No, proper installation prevents any structural damage.",
    },
    {
      question: "Do I need to clean my solar plant?",
      answer: "Yes, periodic cleaning ensures maximum efficiency.",
    },
    {
      question:
        "My roof is not made of concrete; can I still install a solar project?",
      answer:
        "Yes, solar panels can be installed on various types of rooftops with proper mounting.",
    },
  ],
  "Solar Economics": [
    {
      question: "How much does a solar plant cost?",
      answer:
        "Costs depend on capacity, technology, and subsidies but generally range from ₹40,000 to ₹2,00,000.",
    },
    {
      question: "What is the break-even period for solar rooftop projects?",
      answer:
        "The break-even period is typically 2 to 4 years, depending on usage and electricity savings.",
    },
    {
      question:
        "Are there any subsidies provided by the government for solar projects?",
      answer:
        "Yes, government subsidies up to 40% are available for residential and commercial solar projects.",
    },
    {
      question:
        "How do I avail subsidy provided by the Madhya Pradesh government?",
      answer:
        "You can apply through government portals and approved solar vendors.",
    },
    {
      question: "What is the difference between CapEx and OpEx models?",
      answer:
        "CapEx involves upfront investment, whereas OpEx involves a leasing model with monthly payments.",
    },
    {
      question: "Are financing options available for solar rooftop projects?",
      answer:
        "Yes, various banks and financial institutions offer solar financing options.",
    },
  ],
};

const FAQs = () => {
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof faqsData>("General");

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {Object.keys(faqsData).map((tab) => (
            <Tab
              key={tab}
              label={tab}
              value={tab}
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#1e40af",
                  borderRadius: "8px",
                },
                mx: 1,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {faqsData[selectedTab].map((faq, index) => (
        <Accordion
          key={index}
          sx={{
            mb: 1,
            borderRadius: "8px",
            boxShadow: "none",
            border: "1px solid #e0e0e0",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}
          >
            {faq.question}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
