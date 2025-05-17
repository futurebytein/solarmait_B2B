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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddSolarKit from "@/components/UI/AddSolarKit";

interface SolarKit {
  _id: string;
  name: string;
  description: string;
  products: string[];
  technical_docs: string[];
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

  // Filter states for solar kits
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [vendors, setVendors] = useState<{ _id: string; name: string }[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>("");

  // State for Add Kit modal
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // State for View Kit modal
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedKit, setSelectedKit] = useState<SolarKit | null>(null);

  // Fetch solar kits with filters
  const fetchSolarKits = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<SolarKitsResponse>(
        "products/solar-kit/get-all",
        {
          params: {
            subCategory: selectedSubCategory,
            vendor: selectedVendor,
          },
        }
      );
      setSolarKits(response.data.solar_kits);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching solar kits:", err);
      setError(err instanceof Error ? err : new Error("Unexpected error"));
      setLoading(false);
    }
  };

  // Fetch filters for solar kits
  const fetchFilters = async () => {
    try {
      const subCatRes = await axiosInstance.get(
        `/products/all-subCategories?category=solar-kit`
      );
      if (subCatRes.data?.success) {
        setSubCategories(subCatRes.data.subCategories || []);
      } else {
        setSubCategories([]);
      }
      const vendorsRes = await axiosInstance.get(
        `/products/all-vendors?category=solar-kit`
      );
      if (vendorsRes.data?.success) {
        setVendors(vendorsRes.data.vendors || []);
      } else {
        setVendors([]);
      }
      setSelectedSubCategory("");
      setSelectedVendor("");
    } catch (error) {
      console.error("Failed to fetch filters for solar kits:", error);
      setSubCategories([]);
      setVendors([]);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchSolarKits();
  }, [selectedSubCategory, selectedVendor]);

  // Open View Kit modal and set selected kit
  const handleViewKit = (kit: SolarKit) => {
    setSelectedKit(kit);
    setOpenViewModal(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
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
      {!loading && !error && (
        <>
          {/* Filter Section */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sub-Category</InputLabel>
              <Select
                label="Sub-Category"
                value={selectedSubCategory}
                onChange={(e) =>
                  setSelectedSubCategory(e.target.value as string)
                }
              >
                <MenuItem value="">
                  <em>All Sub-Categories</em>
                </MenuItem>
                {subCategories.map((subCat, idx) => (
                  <MenuItem key={idx} value={subCat}>
                    {subCat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Vendors</InputLabel>
              <Select
                label="Vendors"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>All Vendors</em>
                </MenuItem>
                {vendors.map((vendor) => (
                  <MenuItem key={vendor._id} value={vendor._id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

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
                        <TableCell>{kit.category}</TableCell>
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
                      <TableCell colSpan={5} align="center">
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
                        Document {index + 1}
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
