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
  shippingChargesPerKm: string;
  wareHousePincode: string;
  specifications: Record<string, string>;
  hsnCode: string;
  product_code: string;
  discount: string;
  gstPerc: string;
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
    technicalDocs: [],
    shippingChargesPerKm: "",
    wareHousePincode: "",
    specifications: {},
    hsnCode: "",
    product_code: "",
    discount: "",
    gstPerc: "",
  });

  // States to handle new specification key/value input
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  // Handle input changes for text fields
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

  // Add new specification to the specifications object
  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        specifications: {
          ...prevProduct.specifications,
          [specKey]: specValue,
        },
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  // Optionally, remove a specification from the object
  const removeSpecification = (keyToRemove: string) => {
    setNewProduct((prevProduct) => {
      const { [keyToRemove]: _, ...restSpecs } = prevProduct.specifications;
      return { ...prevProduct, specifications: restSpecs };
    });
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
      formData.append("shippingChargesPerKm", newProduct.shippingChargesPerKm);
      formData.append("wareHousePincode", newProduct.wareHousePincode);
      formData.append("hsnCode", newProduct.hsnCode);
      formData.append("product_code", newProduct.product_code);
      formData.append("discount", newProduct.discount);
      formData.append("gstPerc", newProduct.gstPerc);
      // Append specifications as JSON string
      formData.append(
        "specifications",
        JSON.stringify(newProduct.specifications)
      );

      if (newProduct.coverImage) {
        formData.append("cover_image", newProduct.coverImage);
      }

      newProduct.productImages.forEach((file) => {
        formData.append("product_images", file);
      });

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
    // Reset new product state
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
      technicalDocs: [],
      shippingChargesPerKm: "",
      wareHousePincode: "",
      specifications: {},
      hsnCode: "",
      product_code: "",
      discount: "",
      gstPerc: "",
    });
    setSpecKey("");
    setSpecValue("");
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
          {/* Basic product fields */}
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

          {/* New fields */}
          <TextField
            margin="dense"
            label="Shipping Charges Per Km"
            name="shippingChargesPerKm"
            type="number"
            inputProps={{ min: 0 }}
            fullWidth
            value={newProduct.shippingChargesPerKm}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Warehouse Pincode"
            name="wareHousePincode"
            fullWidth
            value={newProduct.wareHousePincode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="HSN Code"
            name="hsnCode"
            fullWidth
            value={newProduct.hsnCode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Product Code"
            name="product_code"
            fullWidth
            value={newProduct.product_code}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Discount"
            name="discount"
            type="number"
            fullWidth
            value={newProduct.discount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="GST Percentage"
            name="gstPerc"
            type="number"
            fullWidth
            value={newProduct.gstPerc}
            onChange={handleChange}
          />

          {/* Specifications: dynamic key-value inputs */}
          <Typography style={{ marginTop: "1rem" }}>Specifications:</Typography>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <TextField
              label="Key"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
            />
            <TextField
              label="Value"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
            />
            <Button variant="outlined" onClick={addSpecification}>
              Add
            </Button>
          </div>
          {/* Display added specifications */}
          {Object.keys(newProduct.specifications).length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              {Object.entries(newProduct.specifications).map(([key, value]) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography>
                    {key}: {value}
                  </Typography>
                  <Button size="small" onClick={() => removeSpecification(key)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* File inputs */}
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
