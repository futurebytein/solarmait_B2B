"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TableFooter,
  TablePagination,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { axiosInstance } from "@/lib/axiosInstance";
// import BlogModal from "./blogModal"; // Separate component for add/edit blog
const BlogModal = React.lazy(() => import("./blogModal"));

// const BlogModal = dynamic(() => import("./blogModal"), { ssr: false });

interface Blog {
  _id: string;
  title: string;
  blogContent: string;
  blogType: string;
  createdAt: string;
  writtenBy: {
    name: string;
    username: string;
  };
}

interface ApiResponse {
  success: boolean;
  total: number;
  count: number;
  blogs: Blog[]; // Changed from 'data' to 'blogs'
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [page, limit]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `blogs/get-all?page=${page}&limit=${limit}&filter=All`
      );
      setBlogs(response.data.blogs);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleOpenModal = (blog: Blog | null) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Blog
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal(null)}
        sx={{ marginBottom: 2 }}
        // color="black"
      >
        Add Blog
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.writtenBy.name}</TableCell>
                  <TableCell>{blog.blogType}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenModal(blog)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalPages * limit}
                  page={page - 1}
                  onPageChange={handlePageChange}
                  rowsPerPage={limit}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}

      {/* Blog Add/Edit Modal */}
      <BlogModal
        open={open}
        handleClose={handleCloseModal}
        blog={selectedBlog}
        fetchBlogs={fetchBlogs}
      />
    </Box>
  );
};

export default BlogList;
