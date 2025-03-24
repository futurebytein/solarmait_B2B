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
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Debounced product search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setSearchLoading(true);
      axiosInstance
        .get<{ data: Product[] }>("products/search", {
          params: { name: searchTerm },
        })
        .then((response) => {
          setSearchResults(response.data.data);
          setSearchLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setSearchLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Add product to the selected list
  const handleAddProduct = (product: Product) => {
    if (selectedProducts.find((p) => p._id === product._id)) return;
    setSelectedProducts((prev) => [...prev, product]);
  };

  // Remove product from the selected list
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || selectedProducts.length === 0) {
      setError(
        "Please provide a name, description, and select at least one product."
      );
      return;
    }
    setError("");
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      products: selectedProducts.map((p) => p._id),
    };

    try {
      await axiosInstance.post("products/solar-kit/add", payload);
      setSubmitting(false);
      onSolarKitAdded(); // refresh the list in parent
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

      {/* Name Field */}
      <TextField
        label="Kit Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Description Field */}
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Search Field */}
      <TextField
        label="Search Products"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchLoading && <CircularProgress size={24} sx={{ mt: 1 }} />}

      {/* Search Results */}
      {searchResults.length > 0 && (
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

      {/* "No results" message */}
      {!searchLoading &&
        searchTerm.trim() !== "" &&
        searchResults.length === 0 && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            No product found with this name.
          </Typography>
        )}

      {/* Selected Products */}
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

      {/* Form Buttons */}
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
