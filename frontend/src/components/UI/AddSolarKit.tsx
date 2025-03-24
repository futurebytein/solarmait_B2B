"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { axiosInstance } from "@/lib/axiosInstance";

interface Product {
  _id: string;
  name: string;
}

interface AddSolarKitProps {
  onSolarKitAdded: () => void;
  onClose: () => void;
}

const AddSolarKit: React.FC<AddSolarKitProps> = ({
  onSolarKitAdded,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setSearchLoading(true);
      axiosInstance
        .get("products/search", { params: { name: searchTerm } })
        .then((response) => {
          // Check the shape of your API response here.
          const products = response.data?.data ?? [];
          setSearchResults(products);
          setSearchLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setSearchResults([]);
          setSearchLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleAddProduct = (product: Product) => {
    if (selectedProducts.find((p) => p._id === product._id)) return;
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || selectedProducts.length === 0) {
      setError("Please provide a description and add at least one product.");
      return;
    }
    setError("");
    setSubmitting(true);

    const payload = {
      products: selectedProducts.map((p) => p._id),
      description: description.trim(),
    };

    try {
      await axiosInstance.post("products/solar-kit/add", payload);
      setSubmitting(false);
      onSolarKitAdded();
    } catch (err) {
      console.error("Error adding solar kit:", err);
      setError("An error occurred while adding the solar kit.");
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Solar Kit
      </Typography>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="Search Products"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchLoading && <CircularProgress size={24} sx={{ mt: 1 }} />}

      {/** If no results, show "No product found" */}
      {!searchLoading &&
        searchTerm.trim() !== "" &&
        searchResults?.length === 0 && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            No product found with this name.
          </Typography>
        )}

      {searchResults?.length > 0 && (
        <Paper sx={{ maxHeight: 200, overflow: "auto", mt: 1 }}>
          <List dense>
            {searchResults.map((product) => (
              <ListItem
                key={product._id}
                button
                onClick={() => handleAddProduct(product)}
              >
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {selectedProducts.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Products:</Typography>
          <List dense>
            {selectedProducts.map((product) => (
              <ListItem key={product._id}>
                <ListItemText primary={product.name} />
                <IconButton onClick={() => handleRemoveProduct(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Add Solar Kit"}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddSolarKit;
