import { Box, Typography, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";

const SolarBenefits = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" color="#222">
          Advantages of Solar Energy:{" "}
          <span style={{ color: "#FFCC00" }}>Solar Benefits</span>
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={2}>
          As the consciousness around environmental degradation grows, India is
          targeting 450GW of installed renewable power capacity by 2030. More
          than 60% (280GW) is expected to be from solar energy.
        </Typography>
      </motion.div>

      {/* Benefit Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          {
            title: "Heal the Planet with Solar Energy",
            content:
              "Solar power systems derive clean and pure energy from the sun. They do not emit any harmful gases or emissions while generating electricity. Installing solar panels on your rooftop minimizes dependence on fossil fuels, combats greenhouse gas emissions, and drastically reduces the carbon footprint.",
          },
          {
            title: "Generate Your Own Power with Solar",
            content:
              "One of the most significant advantages of solar energy is energy independence. You can generate your own electricity and store it for later use. Solar panels provide backup even during power outages.",
          },
          {
            title: "Reap the Returns",
            content:
              "Solar power systems have a lifespan of up to 25 years with proper maintenance. Investing in solar panels ensures a strong return, especially since most parts of India receive over 300 days of sunshine yearly.",
          },
          {
            title: "Versatile Usage of Solar Energy",
            content:
              "Solar panels can be used in remote locations, including rural areas and even on ships and open fields. Their ability to be installed horizontally or vertically makes them a flexible solution for power generation.",
          },
          {
            title: "Increased Employment & Jobs with Solar Power",
            content:
              "The solar industry creates job opportunities for engineers, laborers, and local technicians due to its installation and maintenance processes, benefiting the local economy.",
          },
          {
            title: "No Energy Production Costs with Solar Energy",
            content:
              "Solar energy only requires sunlight to function, making it one of the most cost-effective renewable sources. The only expenses are the panels and installation, which are quickly recovered.",
          },
          {
            title: "Low Maintenance",
            content:
              "Contrary to misconceptions, solar panels require minimal maintenance. A simple cleaning routine once a week ensures high efficiency, and they have a long 25-year service life.",
          },
          {
            title: "Increase Property Value with Solar",
            content:
              "Homes and businesses with installed solar panels have a higher resale value. Investing in solar ensures your property sells at a better rate.",
          },
          {
            title: "Government Rebates & Subsidies with Solar",
            content:
              "The Indian government offers up to 40% subsidies on residential and on-grid solar systems. Different states may have additional benefits for solar installations.",
          },
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {benefit.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" mt={1}>
                {benefit.content}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default SolarBenefits;
