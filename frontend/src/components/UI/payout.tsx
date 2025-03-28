"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

// Define a simplified vendor interface (extend as needed)
interface Vendor {
  _id: string;
  name: string;
}

// Each payout item (vendor payout) within a payment record
interface PayoutItem {
  _id: string;
  vendor: Vendor;
  amountToPay: number;
}

// A payment history record as returned by the API
interface PaymentHistoryRecord {
  _id: string;
  payouts: PayoutItem[];
  orderValue: number;
  razorpayTransactionId: string;
  shippingCharges: number;
  gstTotal: number;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// API response interface
interface PayoutResponse {
  payouts: PaymentHistoryRecord[];
  page: number;
  limit: number;
  count: number;
}

const PayoutsModule: React.FC = () => {
  const [paymentHistories, setPaymentHistories] = useState<
    PaymentHistoryRecord[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);

  // Fetch payouts from the API using page, limit, and query parameters
  const fetchPayouts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get<PayoutResponse>("payouts/all", {
        params: { page, limit, query },
      });
      setPaymentHistories(response.data.payouts);
      setTotalCount(response.data.count);
    } catch (err) {
      console.error("Error fetching payouts:", err);
      setError("Error fetching payouts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayouts();
  }, [page, limit, query]);

  // Update query and reset to the first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  // Update page on pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Payouts
      </Typography>

      {/* Search input */}
      <TextField
        label="Search Payouts"
        value={query}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      {/* Loader, error message, or data table */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order Value</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Shipping Charges</TableCell>
                <TableCell>GST Total</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Vendor Payouts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistories.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record._id}</TableCell>
                  <TableCell>{record.orderValue}</TableCell>
                  <TableCell>{record.razorpayTransactionId}</TableCell>
                  <TableCell>{record.shippingCharges}</TableCell>
                  <TableCell>{record.gstTotal}</TableCell>
                  <TableCell>{record.paid ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {new Date(record.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <List dense>
                      {record.payouts.map((payoutItem) => (
                        <ListItem key={payoutItem._id}>
                          <ListItemText
                            primary={`${payoutItem.vendor.name}: ${payoutItem.amountToPay}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination control */}
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

export default PayoutsModule;
