"use client";

import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation Variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const SolarBasics = () => {
  return (
    <Box sx={{ bgcolor: "white", py: 5 }}>
      <Container maxWidth="lg">
        {/* Section 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h3" fontWeight="bold" textAlign="center" mb={5}>
            Solar <span style={{ color: "#FFCC00" }}>Basics</span>
          </Typography>
        </motion.div>

        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/solar-grid.png"
                alt="Solar Grid"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h5" fontWeight="bold">
                Types of Solar{" "}
                <span style={{ color: "#FFCC00" }}>Rooftop Power Systems</span>
              </Typography>
              <Typography variant="body1" mt={2}>
                A typical rooftop solar power system has electricity-generating
                photovoltaic panels, commonly known as solar panels, on top of a
                house or building. But there is much more to it...
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 2 */}
        <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                On-Grid System or Grid-tied System
              </Typography>
              <Typography variant="body1" mt={2}>
                These systems are designed to work in conjunction with the grid
                or simply put your electricity supply...
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/on-grid.png"
                alt="On-Grid System"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 3 */}
        <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/off-grid.png"
                alt="Off-Grid System"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                Off-Grid System
              </Typography>
              <Typography variant="body1" mt={2}>
                These systems store the electricity produced by conversion in
                batteries and utilize the stored energy...
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 4 */}
        <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                Inverter
              </Typography>
              <Typography variant="body1" mt={2}>
                The most crucial component of a residential solar power plant is
                an inverter. It converts power produced by solar panels into
                electricity...
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/inverter.png"
                alt="Inverter"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 5 */}
        <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/battery.png"
                alt="Battery"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                Batteries
              </Typography>
              <Typography variant="body1" mt={2}>
                Batteries allow you to store the electricity generated by the
                solar plant and use it in case of power outages...
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Section 6 */}
        <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                Installation
              </Typography>
              <Typography variant="body1" mt={2}>
                The installation of the solar power system needs to be done with
                precision in order to generate maximum electricity...
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/assets/installation.png"
                alt="Installation"
                width={500}
                height={300}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolarBasics;
