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
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import { styled } from "@mui/system";

const ImageCell = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.5)", // Zoom effect on hover
  },
});
interface Banner {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
}

interface NewBanner {
  name: string;
  description: string;
  image: File | null;
}

const ManageBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Form state for adding a new banner
  const [newBanner, setNewBanner] = useState<NewBanner>({
    name: "",
    description: "",
    image: null,
  });

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("carousels/allCarousels");
      setBanners(response.data || []); // Handle potential null cases
      setLoading(false);
    } catch (err) {
      console.error("Error fetching banners:", err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setLoading(false);
    }
  };

  // Toggle active status
  const toggleBannerActive = async (
    bannerId: string,
    currentActiveStatus: boolean
  ) => {
    try {
      const active = !currentActiveStatus;

      await axiosInstance.put(`carousels/edit/${bannerId}/status?${active}`);

      // Optimistic update
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === bannerId ? { ...banner, active: active } : banner
        )
      );
    } catch (err) {
      console.error("Error toggling banner active status:", err);
    }
  };

  // Handle opening and closing of the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewBanner({ name: "", description: "", image: null }); // Reset the form
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewBanner((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Handle banner submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newBanner.name);
      formData.append("description", newBanner.description);
      if (newBanner.image) {
        formData.append("image", newBanner.image); // This will now only run if image is not null
      }
      await axiosInstance.post("carousels/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh the banners list
      fetchBanners();
      handleCloseDialog();
    } catch (err) {
      console.error("Error adding banner:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        align="center"
        variant="h6"
        style={{ marginTop: "2rem" }}
      >
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{ marginBottom: "1rem" }}
      >
        Add Banner
      </Button>

      {/* Add Banner Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Banner</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newBanner.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={newBanner.description}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Banners Table */}
      <Paper style={{ marginTop: "2rem" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Image</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Active</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <TableRow key={banner._id}>
                    <TableCell>
                      <ImageCell
                        src={banner.imageUrl || "/placeholder.png"}
                        alt={banner.name}
                      />
                    </TableCell>
                    <TableCell>{banner.name || "N/A"}</TableCell>
                    <TableCell>
                      {banner.description || "No description"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={banner.active}
                        onChange={() =>
                          toggleBannerActive(banner._id, banner.active)
                        }
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No banners available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ManageBanners;
