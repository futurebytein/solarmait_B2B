"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  TextField,
  Typography,
  Card,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BlogCard from "@/components/UI/blogCard"; // Import the separate component
import { axiosInstance } from "@/lib/axiosInstance"; // Axios instance to fetch blogs

interface Blog {
  _id: string;
  title: string;
  content: string;
  body: string;
  // Add other fields like author, date, etc., if necessary
}
const tags = [
  "All",
  "Technology",
  "Solar Energy",
  "Sustainability",
  "Innovation",
  "Environment",
];

const BlogList = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get(
        `/blogs/get-all?filter=${selectedTag}`
      );

      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FFCC00", marginBottom: 4 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Blog Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Tags Section for Small Screens */}
      {isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            mb: 3,
            gap: 1,
            padding: "8px 0",
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
          }}
        >
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "contained" : "outlined"}
              onClick={() => handleTagClick(tag)}
              sx={{
                backgroundColor:
                  selectedTag === tag ? "#FFCC00" : "transparent",
                color: selectedTag === tag ? "white" : "black",
                whiteSpace: "nowrap", // Prevent text wrapping
                fontSize: "0.8rem",
                padding: "6px 12px",
                borderRadius: "20px",
                flexShrink: 0, // Prevent shrinking inside flex container
                "&:hover": {
                  backgroundColor: selectedTag === tag ? "#FFD700" : "#f5f5f5",
                },
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>
      )}

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* Left Tags Section for Larger Screens */}
        {!isSmallScreen && (
          <Grid item xs={3}>
            <Card sx={{ padding: 2, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Tags
              </Typography>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "contained" : "outlined"}
                  onClick={() => handleTagClick(tag)}
                  sx={{
                    width: "100%",
                    marginBottom: 1,
                    backgroundColor:
                      selectedTag === tag ? "#FFCC00" : "transparent",
                    color: selectedTag === tag ? "white" : "black",
                    "&:hover": {
                      backgroundColor:
                        selectedTag === tag ? "#FFD700" : "#f5f5f5",
                    },
                  }}
                >
                  {tag}
                </Button>
              ))}
            </Card>
          </Grid>
        )}

        {/* Blog List Section */}
        <Grid item xs={12} sm={9}>
          <Grid container spacing={3}>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", width: "100%" }}
              >
                No blogs found.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogList;
