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
  CircularProgress,
  Typography,
  TablePagination,
  Switch,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { axiosInstance } from "@/lib/axiosInstance";
import AddProduct from "@/components/UI/AddProduct";
import EditProductModal from "@/components/UI/EditProductModal";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  cover_image: string;
  product_images: string[];
  technical_docs: string[];
}

// Additional filter types
type MainCategory = "pannel" | "inverter" | "battery" | "solar_components";

const mainCategories: MainCategory[] = [
  "pannel",
  "inverter",
  "battery",
  "solar_components",
];

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Pagination states
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Filter states
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>("pannel");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [vendors, setVendors] = useState<{ _id: string; name: string }[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>("");

  // Edit and delete states
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Modal states for images/docs
  const [viewImagesModal, setViewImagesModal] = useState<boolean>(false);
  const [viewDocsModal, setViewDocsModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  // Fetch products with pagination & filters
  const fetchAllProducts = async (currentPage = 1, currentLimit = 5) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<{
        data: Product[];
        total: number;
      }>("products/all-products", {
        params: {
          category: selectedMainCategory,
          subCategory: selectedSubCategory,
          vendor: selectedVendor,
          page: currentPage,
          limit: currentLimit,
        },
      });
      setProducts(response.data.data);
      setTotalProducts(response.data.total);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unexpected error occurred."));
      }
      setLoading(false);
    }
  };

  // Fetch sub-categories and vendors when main category changes
  const fetchFilters = async (category: MainCategory) => {
    try {
      const subCatRes = await axiosInstance.get(
        `/products/all-subCategories?category=${category}`
      );
      if (subCatRes.data?.success) {
        setSubCategories(subCatRes.data.subCategories || []);
      } else {
        setSubCategories([]);
      }
      const vendorsRes = await axiosInstance.get(
        `/products/all-vendors?category=${category}`
      );
      if (vendorsRes.data?.success) {
        setVendors(vendorsRes.data.vendors || []);
      } else {
        setVendors([]);
      }
      setSelectedSubCategory("");
      setSelectedVendor("");
    } catch (error) {
      console.error("Failed to fetch filters:", error);
      setSubCategories([]);
      setVendors([]);
    }
  };

  // Fetch products and filters on mount and when dependencies change
  useEffect(() => {
    fetchAllProducts(page + 1, rowsPerPage);
  }, [
    page,
    rowsPerPage,
    selectedMainCategory,
    selectedSubCategory,
    selectedVendor,
  ]);

  useEffect(() => {
    fetchFilters(selectedMainCategory);
  }, [selectedMainCategory]);

  // Handle page change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // Handle toggle active/inactive
  const handleToggleActive = async (product: Product) => {
    try {
      await axiosInstance.put(`/products/update-product/${product._id}`, {
        isActive: !product.isActive,
      });
      fetchAllProducts(page + 1, rowsPerPage);
    } catch (err) {
      console.error("Error toggling product status:", err);
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/products/delete-product/${deleteProductId}`);
      setDeleteProductId(null);
      fetchAllProducts(page + 1, rowsPerPage);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Open modal for viewing images or documents
  const handleViewModal = (items: string[], type: "images" | "docs") => {
    setModalContent(items);
    if (type === "images") {
      setViewImagesModal(true);
    } else {
      setViewDocsModal(true);
    }
  };

  return (
    <Box sx={{ overflowX: "auto", padding: 2 }}>
      {/* Filter Section */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Main Category</InputLabel>
          <Select
            label="Main Category"
            value={selectedMainCategory}
            onChange={(e) =>
              setSelectedMainCategory(e.target.value as MainCategory)
            }
          >
            {mainCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sub-Category</InputLabel>
          <Select
            label="Sub-Category"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value as string)}
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

      {/* Add Product Button */}
      <AddProduct
        onProductAdded={() => fetchAllProducts(page + 1, rowsPerPage)}
      />

      {/* Products Table */}
      <Paper sx={{ marginTop: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Cover</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Stock</strong>
                </TableCell>
                <TableCell>
                  <strong>Images</strong>
                </TableCell>
                <TableCell>
                  <strong>Documents</strong>
                </TableCell>
                <TableCell>
                  <strong>Active</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.cover_image}
                        alt={product.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Tooltip title="View Images">
                        <IconButton
                          onClick={() =>
                            handleViewModal(product.product_images, "images")
                          }
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Documents">
                        <IconButton
                          onClick={() =>
                            handleViewModal(product.technical_docs, "docs")
                          }
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.isActive}
                        onChange={() => handleToggleActive(product)}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => setEditProduct(product)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => setDeleteProductId(product._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalProducts}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Edit Product Modal */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onProductUpdated={() => fetchAllProducts(page + 1, rowsPerPage)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteProductId)}
        onClose={() => setDeleteProductId(null)}
      >
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteProductId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Viewing Product Images */}
      <Dialog
        open={viewImagesModal}
        onClose={() => setViewImagesModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Product Images</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {modalContent.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewImagesModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Viewing Technical Documents */}
      <Dialog
        open={viewDocsModal}
        onClose={() => setViewDocsModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Technical Documents</DialogTitle>
        <DialogContent>
          {modalContent.map((doc, index) => (
            <Typography key={index}>
              <a
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2" }}
              >
                Document {index + 1}
              </a>
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDocsModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsTable;
