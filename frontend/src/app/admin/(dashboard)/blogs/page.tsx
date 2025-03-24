import React from "react";
import dynamic from "next/dynamic";

// import AdminBlogs from "@/components/Admin/pages/blogs/page";
const AdminBlogs = dynamic(
  () => import("@/components/Admin/pages/blogs/page"),
  { ssr: false }
);

export default function page() {
  return (
    <div>
      <AdminBlogs />
    </div>
  );
}
