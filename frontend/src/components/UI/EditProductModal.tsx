import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent

// Define Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Define Props for the modal
interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onProductUpdated,
}) => {
  const categoryOptions = ["pannel", "inverter", "battery", "solar_components"];

  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    if (!name) return;

    setUpdatedProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? Number(value) // Convert numeric fields to numbers
          : value, // Keep other fields as strings
    }));
  };

  // Update product via API
  const handleUpdateProduct = async () => {
    try {
      await axiosInstance.put(
        `/products/update-product/${product._id}`,
        updatedProduct
      );
      onProductUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={updatedProduct.name}
          onChange={handleTextFieldChange} // ✅ Uses the correct handler
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={updatedProduct.description}
          onChange={handleTextFieldChange} // ✅ Uses the correct handler
          margin="dense"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={updatedProduct.price}
          onChange={handleTextFieldChange} // ✅ Uses the correct handler
          margin="dense"
        />
        <Select
          fullWidth
          name="category"
          value={updatedProduct.category}
          onChange={handleInputChange}
          sx={{ mt: 1 }} // Fixed invalid "margin" prop usage in Select
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={updatedProduct.stock}
          onChange={handleTextFieldChange} // ✅ Uses the correct handler
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleUpdateProduct}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
