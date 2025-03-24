"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

// Define the structure of a Vendor
interface Vendor {
  _id: string;
  name: string;
  email: string;
  role: string;
  state: string;
  city: string;
  is_verified: boolean;
  gst_number?: string;
  gst_verified?: boolean;
  // ... any other fields from the schema
}

// Shape of the API response
interface VendorsResponse {
  vendors: Vendor[];
  page: number;
  limit: number;
  count: number;
}

const VendorsList: React.FC = () => {
  // Pagination states
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // Data and loading states
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch vendors from the API
  const fetchVendors = async (currentPage: number, currentLimit: number) => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get<VendorsResponse>(
        "/users/vendors",
        {
          params: {
            page: currentPage + 1, // because MUI TablePagination is 0-based
            limit: currentLimit,
          },
        }
      );
      setVendors(response.data.vendors);
      setCount(response.data.count);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching vendors:", err);
      setError(err.message || "An error occurred while fetching vendors.");
      setLoading(false);
    }
  };

  // On mount and whenever page or limit changes, refetch vendors
  useEffect(() => {
    fetchVendors(page, limit);
  }, [page, limit]);

  // Handlers for TablePagination
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Typography color="error" align="center" variant="h6" mt={2}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Vendors
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>State</strong>
                </TableCell>
                <TableCell>
                  <strong>City</strong>
                </TableCell>
                <TableCell>
                  <strong>Verified</strong>
                </TableCell>
                <TableCell>
                  <strong>GST Number</strong>
                </TableCell>
                <TableCell>
                  <strong>GST Verified</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <TableRow key={vendor._id}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.state}</TableCell>
                    <TableCell>{vendor.city}</TableCell>
                    <TableCell>{vendor.is_verified ? "Yes" : "No"}</TableCell>
                    <TableCell>{vendor.gst_number || "N/A"}</TableCell>
                    <TableCell>{vendor.gst_verified ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No vendors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default VendorsList;
