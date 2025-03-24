"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const ConsultationForm = () => {
  const [designation, setDesignation] = useState("Management committee member");
  const [agmStatus, setAgmStatus] = useState("We already have AGM approval");
  const [checked, setChecked] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "white",
        px: { xs: 2, md: 10 },
        py: 6,
      }}
    >
      {/* Left Section - Heading & Text */}
      <Box
        sx={{
          flex: 1,
          color: "#222",
          textAlign: { xs: "center", md: "left" },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#002147",
          }}
        >
          Schedule a{" "}
          <span
            style={{
              background:
                "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FREE consultation{" "}
          </span>
          with us today!
        </Typography>
        <Typography sx={{ fontSize: "16px", opacity: 0.9 }}>
          Get genuine advice from our solar experts. No pressure, book only if
          you are satisfied!
        </Typography>
      </Box>

      {/* Right Section - Form */}
      <Card
        sx={{
          flex: 1,
          maxWidth: 550,
          background: "white",
          p: 4,
          borderRadius: "12px",
          boxShadow: 3,
          ml: { md: 4 },
          mt: { xs: 4, md: 0 },
        }}
      >
        <Grid container spacing={2}>
          {/* Name of Housing Society */}
          <Grid item xs={12}>
            <TextField label="Name of Housing Society *" fullWidth required />
          </Grid>

          {/* Name */}
          <Grid item xs={12}>
            <TextField label="Name" fullWidth required />
          </Grid>

          {/* Pin Code & City */}
          <Grid item xs={6}>
            <TextField label="Pin Code *" fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="City" fullWidth />
          </Grid>

          {/* WhatsApp Number & Electricity Bill */}
          <Grid item xs={6}>
            <TextField label="WhatsApp Number *" fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Monthly Electricity Bill *</InputLabel>
              <Select value="0 - 50000" fullWidth>
                <MenuItem value="0 - 50000">0 - 50000</MenuItem>
                <MenuItem value="50000 - 100000">50000 - 100000</MenuItem>
                <MenuItem value="100000+">100000+</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Designation - Toggle Buttons */}
          {/* <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              Designation *
            </Typography>
            <ToggleButtonGroup
              value={designation}
              exclusive
              onChange={(e, value) => setDesignation(value)}
              fullWidth
              sx={{
                "& .MuiToggleButton-root": {
                  borderRadius: "6px !important",
                  px: 2,
                  py: 1.2,
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#222",
                  backgroundColor: "#F0F0F0",
                },
                "& .MuiToggleButton-root.Mui-selected": {
                  backgroundColor: "#001A5D",
                  color: "white",
                },
              }}
            >
              <ToggleButton value="Management committee member">
                Management committee member
              </ToggleButton>
              <ToggleButton value="Resident">Resident</ToggleButton>
              <ToggleButton value="Builder">Builder</ToggleButton>
              <ToggleButton value="Facility Manager">
                Facility Manager
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid> */}

          {/* AGM Approval Status */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>AGM approval status *</InputLabel>
              <Select
                value={agmStatus}
                onChange={(e) => setAgmStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="We already have AGM approval">
                  We already have AGM approval
                </MenuItem>
                <MenuItem value="We are in process of getting approval">
                  We are in process of getting approval
                </MenuItem>
                <MenuItem value="We have not started the process yet">
                  We have not started the process yet
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Terms Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to SolarSquare's{" "}
                  <span
                    style={{
                      color: "#001A5D",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    terms of service
                  </span>{" "}
                  &{" "}
                  <span
                    style={{
                      color: "#001A5D",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    privacy policy
                  </span>
                </Typography>
              }
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background:
                  "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700) 50%, white 50%",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                py: 1.2,
                "&:hover": { backgroundColor: "#008FCC" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ConsultationForm;
