// components/StickyButton.js
"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function StickyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location_state: "",
    location_city: "",
    pincode: "",
    address: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleThankYouModal = () => {
    setIsThankYouModalOpen(!isThankYouModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
    };

    try {
      const response = await axios.post(
        "https://solarmait.futurebyte.in/api/leads/campaign?ref=website",
        dataToSubmit
      );
      console.log("Form submitted successfully:", response.data);

      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location_state: "",
        location_city: "",
        pincode: "",
        address: "",
      });

      // Close the form modal and open the Thank You modal
      toggleModal();
      toggleThankYouModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "50px",
          padding: "10px 20px",
        }}
        onClick={toggleModal}
      >
        Join Us
      </Button>

      {/* Contact Us Modal */}
      <Dialog open={isModalOpen} onClose={toggleModal} fullWidth maxWidth="sm">
        <DialogTitle>Contact Us</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  helperText="Please enter a valid 10-digit phone number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  name="location_state"
                  value={formData.location_state}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="location_city"
                  value={formData.location_city}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="warning">
              Submit
            </Button>
            <Button onClick={toggleModal} variant="outlined" color="secondary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Thank You Modal */}
      <Dialog
        open={isThankYouModalOpen}
        onClose={toggleThankYouModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <p>
            Your form has been submitted successfully. We will get back to you
            soon!
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleThankYouModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
