"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddSolarKit from "@/components/UI/AddSolarKit";
interface Response {
  message: string;
  solar_kits: SolarKit[];
}

interface SolarKit {
  _id: string;
  products: string[];
  description: string;
}

const SolarKitsTable = () => {
  const [solarKits, setSolarKits] = useState<SolarKit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const fetchSolarKits = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Response>(
        "products/solar-kit/get-all"
      );
      setSolarKits(response.data.solar_kits);
      console.log("solar kits:", response.data.solar_kits);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching solar kits:", err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unexpected error occurred."));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolarKits();
  }, []);

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
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Button to open the modal for adding a new solar kit */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add Solar Kit
      </Button>

      {/* Solar Kits Table */}
      <Paper sx={{ marginTop: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Number of Products</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solarKits?.length > 0 ? (
                solarKits.map((kit) => (
                  <TableRow key={kit._id}>
                    <TableCell>{kit.description}</TableCell>
                    <TableCell>{kit.products?.length || 0}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No solar kits found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal for Adding a Solar Kit */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Solar Kit</DialogTitle>
        <DialogContent>
          <AddSolarKit
            onSolarKitAdded={() => {
              fetchSolarKits();
              setOpenAddModal(false);
            }}
            onClose={() => setOpenAddModal(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SolarKitsTable;
