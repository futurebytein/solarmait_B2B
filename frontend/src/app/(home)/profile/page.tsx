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
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomIcon from "@mui/icons-material/Room";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ListAltIcon from "@mui/icons-material/ListAlt";
interface User {
  name: string;
  email: string;
  role: string;
  state?: string;
  city?: string;
  [key: string]: unknown; // Allow dynamic fields
}

interface UpdatedValues {
  [key: string]: string;
}

const Profile = () => {
  const { user } = useAuth() as { user: User | null }; // Type the user context
  const [editField, setEditField] = useState<string | null>(null);
  const [updatedValues, setUpdatedValues] = useState<UpdatedValues>({});

  if (!user) {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
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
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="body1" fontWeight="bold">
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
              onClick={() => handleUpdate(field)}
            >
              Update
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              {typeof user[field] === "string" ||
              typeof user[field] === "number"
                ? user[field]
                : ""}
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
    <Grid container justifyContent="center" className="p-6">
      {/* Top Cards Section */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Link href="/orders" underline="none">
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: 3,
              }}
            >
              <ListAltIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" mt={1}>
                Your Orders
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link href="/profile/addresses" underline="none">
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: 3,
              }}
            >
              <RoomIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" mt={1}>
                Your Addresses
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link href="/cart" underline="none">
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: 3,
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" mt={1}>
                Go to Cart
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link href="/contact" underline="none">
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: 3,
              }}
            >
              <ContactPhoneIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" mt={1}>
                Contact Us
              </Typography>
            </Card>
          </Link>
        </Grid>
      </Grid>

      {/* Profile Section */}
      <Grid item xs={12} md={8} lg={6}>
        <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 3 }}>
          {/* Profile Header */}
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                backgroundColor: "#FFCC00",
                fontSize: "2.5rem",
                color: "white",
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
          <CardContent>
            {renderField("Name", "name")}
            {renderField("Email", "email")}
            {renderField(
              "Role",
              "role",
              user.role.charAt(0).toUpperCase() + user.role.slice(1)
            )}

            {user.state && renderField("State", "state")}
            {user.city && renderField("City", "city")}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
