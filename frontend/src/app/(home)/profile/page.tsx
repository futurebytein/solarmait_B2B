"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
  IconButton,
  TextField,
  Button,
  Link as MUILink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomIcon from "@mui/icons-material/Room";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface User {
  name: string;
  email: string;
  role: string;
  state?: string;
  city?: string;
  gst_number?: string;
  gst_verified?: boolean;
  [key: string]: unknown; // Allow dynamic fields
}

interface UpdatedValues {
  [key: string]: string;
}

const Profile = () => {
  const { user } = useAuth() as { user: User | null };
  const [editField, setEditField] = useState<string | null>(null);
  const [updatedValues, setUpdatedValues] = useState<UpdatedValues>({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!user) {
    return (
      <Typography variant="h6" color="textSecondary" align="center" mt={4}>
        No user information available.
      </Typography>
    );
  }

  const handleEdit = (field: Extract<keyof User, string>) => {
    const fieldValue = user?.[field];
    setEditField(field);
    setUpdatedValues({
      ...updatedValues,
      [field]: typeof fieldValue === "string" ? fieldValue : "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof User
  ) => {
    setUpdatedValues({ ...updatedValues, [field]: e.target.value });
  };

  const handleUpdate = (field: keyof User) => {
    // Here, you'd call an API or context function to update the user information.
    setEditField(null);
    console.log(`Updated ${field} to:`, updatedValues[field]);
  };

  const renderField = (
    label: string,
    field: keyof User,
    displayValue?: string
  ) => {
    const currentValue =
      displayValue ??
      (typeof user[field] === "string" || typeof user[field] === "number"
        ? (user[field] as string | number)
        : "");

    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {label}:
        </Typography>
        {editField === field ? (
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              size="small"
              value={updatedValues[field]}
              onChange={(e) => handleChange(e, field)}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleUpdate(field)}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" color="text.secondary">
              {currentValue}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleEdit(field as Extract<keyof User, string>)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9", // Minimalist background
        py: 6,
        px: 2,
      }}
    >
      <Grid container justifyContent="center">
        {/* Top Cards Section */}
        <Grid
          container
          item
          xs={12}
          md={10}
          spacing={isSmallScreen ? 2 : 4}
          mb={4}
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MUILink href="/orders" underline="none">
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <ListAltIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Your Orders
                </Typography>
              </Card>
            </MUILink>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MUILink href="/profile/addresses" underline="none">
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <RoomIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Your Addresses
                </Typography>
              </Card>
            </MUILink>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MUILink href="/cart" underline="none">
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <ShoppingCartIcon
                  sx={{ fontSize: 40, color: "primary.main" }}
                />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Go to Cart
                </Typography>
              </Card>
            </MUILink>
          </Grid>
        </Grid>

        {/* Profile Section */}
        <Grid item xs={12} md={8} lg={6}>
          <Card
            sx={{
              p: 3,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            {/* Profile Header */}
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  backgroundColor: "secondary.main",
                  fontSize: "2.5rem",
                  color: "#fff",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.role === "admin" ? "Administrator" : "User"}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* User Information */}
            <CardContent sx={{ pt: 0 }}>
              {renderField("Name", "name")}
              {renderField("Email", "email")}
              {renderField(
                "Role",
                "role",
                user.role.charAt(0).toUpperCase() + user.role.slice(1)
              )}
              {user.state && renderField("State", "state")}
              {user.city && renderField("City", "city")}

              {/* New Fields for GST */}
              {user.gst_number && renderField("GST Number", "gst_number")}
              {renderField(
                "GST Verified",
                "gst_verified",
                user.gst_verified ? "Yes" : "No"
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
