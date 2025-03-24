"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import CustomEditor from "./CustomEditor";

interface BlogModalProps {
  open: boolean;
  handleClose: () => void;
  blog: any;
  fetchBlogs: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({
  open,
  handleClose,
  blog,
  fetchBlogs,
}) => {
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [blogType, setBlogType] = useState("blog");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBlogContent(blog.body);
      setMetaTitle(blog.metaTitle || "");
      setMetaDescription(blog.metaDescription || "");
      setBlogType(blog.blogType || "blog");
    } else {
      setTitle("");
      setBlogContent("");
      setMetaTitle("");
      setMetaDescription("");
      setBlogType("blog");
    }
  }, [blog]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (blog) {
        await axiosInstance.put(`blog/updateblog/${blog._id}`, {
          title,
          blogContent,
          metaTitle,
          metaDescription,
          blogType,
        });
      } else {
        await axiosInstance.post("blog/add", {
          title,
          blogContent,
          metaTitle,
          metaDescription,
          blogType,
        });
      }
      fetchBlogs();
      handleClose();
    } catch (error) {
      console.error("Error saving blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
          {blog ? "Edit Blog" : "Add Blog"}
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2, color: "black" }}
          InputProps={{ style: { color: "black" } }}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: "black", marginBottom: 1 }}
        >
          Content
        </Typography>
        <CustomEditor value={blogContent} onChange={setBlogContent} />
        <TextField
          fullWidth
          label="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          sx={{ marginTop: 2, marginBottom: 2, color: "black" }}
          InputProps={{ style: { color: "black" } }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Blog Type</InputLabel>
          <Select
            value={blogType}
            onChange={(e) => setBlogType(e.target.value)}
          >
            <MenuItem value="blog">Blog</MenuItem>
            <MenuItem value="community">Community</MenuItem>
            <MenuItem value="social-post">Social Post</MenuItem>
            <MenuItem value="social-video">Social Video</MenuItem>
            <MenuItem value="social-shorts">Social Shorts</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BlogModal;
