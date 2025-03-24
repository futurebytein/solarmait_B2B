import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Define Blog type
interface Blog {
  _id: string;
  title: string;
  body: string;
  images?: string[]; // Optional array of image URLs
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        padding: 1,
        border: "1px solid #e0e0e0",
      }}
    >
      <CardMedia
        component="img"
        image={blog.images?.[0] || "/default-blog.png"} // Safe access with optional chaining
        alt={blog.title}
        sx={{
          height: 180,
          objectFit: "cover",
          backgroundColor: "#f5f5f5",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          {blog.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {blog.body ? `${blog.body.substring(0, 100)}...` : ""}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFCC00",
            color: "white",
            width: "100%",
            marginTop: 2,
            "&:hover": { backgroundColor: "#FFD700" },
          }}
          onClick={() => router.push(`/blog/${blog._id}`)} // Uses Next.js router for navigation
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
