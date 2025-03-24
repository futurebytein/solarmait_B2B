"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Navigation from "@/components/Admin/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`lg:pl-64 flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <Navigation />
        <main className="flex-1 min-h-scren bg-gray-200 px-10">
          <div className="mx-auto max-w-screen  p-4 md:p-6 2xl:p-10">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-8 text-red-600">
                Error: {error}
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
