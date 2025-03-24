"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";

interface NewProduct {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  tags: string;
  coverImage: File | null;
  productImages: File[];
  technicalDocs: File[];
}

interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
  const categoryOptions = ["pannel", "inverter", "battery", "solar_components"];

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    tags: "",
    coverImage: null,
    productImages: [],
    technicalDocs: [], // New Field for PDFs
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle file inputs
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProduct({ ...newProduct, coverImage: e.target.files[0] });
    }
  };

  const handleProductImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setNewProduct({
        ...newProduct,
        productImages: Array.from(e.target.files),
      });
    }
  };

  const handleTechnicalDocsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setNewProduct({
        ...newProduct,
        technicalDocs: Array.from(e.target.files),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("brand", newProduct.brand);
      formData.append("stock", newProduct.stock);
      formData.append("tags", newProduct.tags);

      if (newProduct.coverImage) {
        formData.append("cover_image", newProduct.coverImage);
      }

      newProduct.productImages.forEach((file) => {
        formData.append("product_images", file);
      });

      // Append technical docs
      newProduct.technicalDocs.forEach((file) => {
        formData.append("technical_docs", file);
      });

      await axiosInstance.post("products/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Trigger callback to refresh the product list
      onProductAdded();
      handleClose();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Open and close dialog handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      tags: "",
      coverImage: null,
      productImages: [],
      technicalDocs: [], // Reset technical docs on close
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "1rem" }}
      >
        Add Product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChange}
            required
          />

          <Select
            fullWidth
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            margin="dense"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <TextField
            margin="dense"
            label="Brand"
            name="brand"
            fullWidth
            value={newProduct.brand}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            value={newProduct.stock}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Tags (comma-separated)"
            name="tags"
            fullWidth
            value={newProduct.tags}
            onChange={handleChange}
          />

          <Typography style={{ marginTop: "1rem" }}>Cover Image:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            style={{ marginTop: "0.5rem" }}
          />

          <Typography style={{ marginTop: "1rem" }}>
            Product Images (multiple):
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleProductImagesChange}
            style={{ marginTop: "0.5rem" }}
          />

          <Typography style={{ marginTop: "1rem" }}>
            Technical Documents (PDFs):
          </Typography>
          <input
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={handleTechnicalDocsChange}
            style={{ marginTop: "0.5rem" }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
