import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface RequestProductModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

const RequestProductModal: React.FC<RequestProductModalProps> = ({
  open,
  onClose,
  productName,
}) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = () => {
    // Here you would typically send the request details to your backend API.
    console.log("Request submitted:", {
      productName,
      userName,
      userEmail,
      additionalInfo,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Request Product: {productName}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Your Email"
          type="email"
          fullWidth
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Additional Information"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestProductModal;
