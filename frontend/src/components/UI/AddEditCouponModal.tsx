"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

// Shape of a single coupon
interface Coupon {
  _id?: string;
  code: string;
  description: string;
  oneTime: boolean;
  isactive: boolean;
  isshown: boolean;
  discountPercent: number;
  maxDiscount: number;
  minCartValue: number;
  totalUsage: number;
}

interface AddEditCouponModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  coupon?: Coupon | null; // if null => "Add" mode; if set => "Edit" mode
}

const AddEditCouponModal: React.FC<AddEditCouponModalProps> = ({
  open,
  onClose,
  onSuccess,
  coupon,
}) => {
  const [formData, setFormData] = useState<Coupon>({
    code: "",
    description: "",
    oneTime: false,
    isactive: true,
    isshown: true,
    discountPercent: 0,
    maxDiscount: 0,
    minCartValue: 0,
    totalUsage: 0,
  });
  const [error, setError] = useState("");

  // Populate form when coupon is set (Edit mode) or reset when null (Add mode)
  useEffect(() => {
    if (coupon) {
      setFormData({ ...coupon });
    } else {
      setFormData({
        code: "",
        description: "",
        oneTime: false,
        isactive: true,
        isshown: true,
        discountPercent: 0,
        maxDiscount: 0,
        minCartValue: 0,
        totalUsage: 0,
      });
    }
  }, [coupon]);

  // Generic handler for text fields and checkboxes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit logic
  const handleSubmit = async () => {
    setError("");
    try {
      if (coupon && coupon._id) {
        // Edit mode
        await axiosInstance.put(`/coupon/update/${coupon._id}`, formData);
      } else {
        // Add mode
        await axiosInstance.post(`/coupon/create`, formData);
      }
      onSuccess(); // Refresh the list in the parent
      onClose(); // Close modal
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error saving coupon");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{coupon ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.oneTime}
              onChange={handleChange}
              name="oneTime"
            />
          }
          label="One Time"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isactive}
              onChange={handleChange}
              name="isactive"
            />
          }
          label="Is Active"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isshown}
              onChange={handleChange}
              name="isshown"
            />
          }
          label="Is Shown"
        />
        <TextField
          label="Discount Percent"
          name="discountPercent"
          type="number"
          value={formData.discountPercent}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Discount"
          name="maxDiscount"
          type="number"
          value={formData.maxDiscount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Cart Value"
          name="minCartValue"
          type="number"
          value={formData.minCartValue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total Usage"
          name="totalUsage"
          type="number"
          value={formData.totalUsage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {coupon ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCouponModal;
