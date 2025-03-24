"use client";

import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddEditCouponModal from "@/components/UI/AddEditCouponModal"; // Adjust the import path as needed

// Shape of a single coupon in the list
interface Coupon {
  _id: string;
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

const CouponsList: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Modal control for Add/Edit
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteCouponId, setDeleteCouponId] = useState<string>("");

  // Fetch all coupons
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      // Expecting { coupons: Coupon[] } from the server
      const response = await axiosInstance.get("/coupon/all");
      setCoupons(response.data.coupons);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching coupons:", err);
      setError(err.message || "An error occurred while fetching coupons.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handlers for Add, Edit, Delete
  const handleAddCoupon = () => {
    setSelectedCoupon(null); // null => Add mode
    setModalOpen(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon); // => Edit mode
    setModalOpen(true);
  };

  const handleDeleteCoupon = (couponId: string) => {
    setDeleteCouponId(couponId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCoupon = async () => {
    try {
      await axiosInstance.delete(`/coupons/delete/${deleteCouponId}`);
      setDeleteCouponId("");
      setDeleteDialogOpen(false);
      fetchCoupons(); // refresh the list
    } catch (err: any) {
      console.error("Error deleting coupon:", err);
      // Optionally display an error message or toast
    }
  };

  // Close the Add/Edit modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCoupon(null);
  };

  // Callback after successful add/edit
  const handleModalSuccess = () => {
    fetchCoupons();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6" mt={2}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" gutterBottom>
          Coupons
        </Typography>
        <Button variant="contained" onClick={handleAddCoupon}>
          Add Coupon
        </Button>
      </Box>

      {/* Coupons Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Code</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Discount (%)</strong>
                </TableCell>
                <TableCell>
                  <strong>Max Discount</strong>
                </TableCell>
                <TableCell>
                  <strong>Min Cart Value</strong>
                </TableCell>
                <TableCell>
                  <strong>One-Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Active</strong>
                </TableCell>
                <TableCell>
                  <strong>Shown</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Usage</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <TableRow key={coupon._id}>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{coupon.description}</TableCell>
                    <TableCell>{coupon.discountPercent}</TableCell>
                    <TableCell>{coupon.maxDiscount}</TableCell>
                    <TableCell>{coupon.minCartValue}</TableCell>
                    <TableCell>{coupon.oneTime ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.isactive ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.isshown ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.totalUsage}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditCoupon(coupon)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteCoupon(coupon._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No coupons found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Coupon Modal */}
      <AddEditCouponModal
        open={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        coupon={selectedCoupon}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this coupon?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteCoupon}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CouponsList;
