"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

// Simplified vendor interface (extend as needed)
interface Vendor {
  _id: string;
  name: string;
}

// Wallet record interface based on your schema
interface VendorWalletRecord {
  _id: string;
  vendor: Vendor;
  productId: string;
  orderId: string;
  amount: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response structure interface
interface WalletResponse {
  wallet: VendorWalletRecord[];
  page: number;
  limit: number;
  count: number;
}

const VendorWalletModule: React.FC = () => {
  const [walletRecords, setWalletRecords] = useState<VendorWalletRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Fetch vendor wallet data from the API
  const fetchWallet = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get<WalletResponse>(
        "payouts/vendor/wallet",
        {
          params: { page, limit },
        }
      );
      setWalletRecords(response.data.wallet);
      setTotalCount(response.data.count);
    } catch (err) {
      console.error("Error fetching vendor wallet:", err);
      setError("Error fetching vendor wallet");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWallet();
  }, [page, limit]);

  // Handle page change event from Pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Vendor Wallet
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Wallet ID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record._id}</TableCell>
                  <TableCell>{record.vendor.name}</TableCell>
                  <TableCell>{record.productId}</TableCell>
                  <TableCell>{record.orderId}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.isPaid ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {new Date(record.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination Control */}
      {totalCount > limit && !loading && (
        <Pagination
          count={Math.ceil(totalCount / limit)}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
};

export default VendorWalletModule;
