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
  IconButton,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddSolarKit from "@/components/UI/AddSolarKit";

interface SolarKit {
  _id: string;
  name: string;
  description: string;
  products: string[];
  technical_docs: string[]; // <-- new field
  category: string;
}

interface SolarKitsResponse {
  success: boolean;
  message: string;
  solar_kits: SolarKit[];
}

const SolarKitsTable = () => {
  const [solarKits, setSolarKits] = useState<SolarKit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // State for Add Kit modal
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // State for View Kit modal
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedKit, setSelectedKit] = useState<SolarKit | null>(null);

  // Fetch solar kits
  const fetchSolarKits = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<SolarKitsResponse>(
        "products/solar-kit/get-all"
      );
      setSolarKits(response.data.solar_kits);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching solar kits:", err);
      setError(err instanceof Error ? err : new Error("Unexpected error"));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolarKits();
  }, []);

  // Open View Kit modal and set selected kit
  const handleViewKit = (kit: SolarKit) => {
    setSelectedKit(kit);
    setOpenViewModal(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Loading & Error States */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" align="center" variant="h6" mt={2}>
          Error: {error.message}
        </Typography>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Add Solar Kit Button */}
          <Button variant="contained" onClick={() => setOpenAddModal(true)}>
            Add Solar Kit
          </Button>

          {/* Solar Kits Table */}
          <Paper sx={{ marginTop: 4 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Number of Products</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Category</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {solarKits.length > 0 ? (
                    solarKits.map((kit) => (
                      <TableRow key={kit._id}>
                        <TableCell>{kit.name}</TableCell>
                        <TableCell>{kit.description}</TableCell>
                        <TableCell>{kit.products?.length || 0}</TableCell>
                        <TableCell>{kit?.category || 0}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleViewKit(kit)}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No solar kits found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      {/* Add Solar Kit Modal */}
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

      {/* View Kit Details Modal */}
      <Dialog
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Kit Details</DialogTitle>
        <DialogContent>
          {selectedKit ? (
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Name: {selectedKit.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Description: {selectedKit.description}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Products:
              </Typography>
              {selectedKit.products.length > 0 ? (
                <ul>
                  {selectedKit.products.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2">
                  No products in this kit.
                </Typography>
              )}

              {/* Technical Docs */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Technical Docs:
              </Typography>
              {selectedKit.technical_docs &&
              selectedKit.technical_docs.length > 0 ? (
                <ul>
                  {selectedKit.technical_docs.map((docUrl, index) => (
                    <li key={index}>
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2" }}
                      >
                        {docUrl}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2">
                  No technical docs available.
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body2">No kit selected.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SolarKitsTable;
