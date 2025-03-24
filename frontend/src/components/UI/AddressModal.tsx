import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";

interface AddressFormData {
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  defaultaddress: boolean;
  landmark: string;
  country: string;
  town: string;
  pinCode: string;
  concernedPersonName: string;
  concernedPersonEmail: string;
  concernedPersonContact: string;
}

// Define Props type for the component
interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: AddressFormData;
  onSubmit: (data: AddressFormData) => void;
}
const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AddressFormData>(
    initialData || {
      state: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      defaultaddress: false,
      landmark: "",
      country: "India",
      town: "",
      pinCode: "",
      concernedPersonName: "",
      concernedPersonEmail: "",
      concernedPersonContact: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          maxWidth: 500,
          margin: "50px auto",
          boxShadow: 3,
          outline: "none",
        }}
      >
        <Typography variant="h6" mb={2}>
          {initialData ? "Edit Address" : "Add New Address"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Concerned Person Name"
              name="concernedPersonName"
              fullWidth
              value={formData.concernedPersonName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Concerned Person Email"
              name="concernedPersonEmail"
              type="email"
              fullWidth
              value={formData.concernedPersonEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Concerned Person Contact"
              name="concernedPersonContact"
              type="tel"
              fullWidth
              value={formData.concernedPersonContact}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address Line 1"
              name="addressLine1"
              fullWidth
              value={formData.addressLine1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address Line 2"
              name="addressLine2"
              fullWidth
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              fullWidth
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              name="state"
              fullWidth
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Pin Code"
              name="pinCode"
              type="number"
              fullWidth
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Landmark"
              name="landmark"
              fullWidth
              value={formData.landmark}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.defaultaddress}
                  onChange={handleChange}
                  name="defaultaddress"
                />
              }
              label="Set as default address"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {initialData ? "Update Address" : "Add Address"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddressModal;
