"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  TextField,
  Pagination,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import ProductCard from "@/components/UI/productCard";
import ServiceCard from "@/components/UI/ServiceCard";
import SolarService from "@/components/UI/SolarMait-Service";
import SolarKitCard from "@/components/UI/SolarKitCard"; // New SolarKitCard component
import { useSearchParams } from "next/navigation";

const categories = [
  { label: "Panels", value: "pannel" },
  { label: "Inverters", value: "inverter" },
  { label: "Batteries", value: "battery" },
  { label: "Solar Components", value: "solar_components" },
  { label: "Services", value: "services" },
  { label: "Solar Kits", value: "solar-kit" },
];

const Loading = () => <p>Loading...</p>;

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface SolarKit {
  _id: string;
  name: string;
  description?: string;
  category?: string; // e.g., "OnGrid", "OffGrid", "Hybrid"
  technical_docs?: string[];
  products?: string[];
}

const SearchHandler = ({
  setSelectedTab,
}: {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      const categoryIndex = categories.findIndex(
        (cat) => cat.value === categoryFromUrl
      );
      setSelectedTab(categoryIndex !== -1 ? categoryIndex : 0);
    }
  }, [categoryFromUrl, setSelectedTab]);

  return null;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [solarKits, setSolarKits] = useState<SolarKit[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const limit = 8;

  const fetchProducts = async () => {
    try {
      const category = categories[selectedTab].value;
      if (category === "services") {
        const response = await axiosInstance.get("/services/get-all");
        setServices(response.data.services);
        setTotalPages(1);
        setProducts([]);
        setSolarKits([]);
      } else if (category === "solar-kit") {
        const response = await axiosInstance.get("/products/solar-kit/get-all");
        if (response.data?.solar_kits) {
          setSolarKits(response.data.solar_kits);
          setTotalPages(1); // Update if your endpoint supports pagination
          setProducts([]);
          setServices([]);
        }
      } else {
        const response = await axiosInstance.get(
          `/products/all-products?category=${category}&page=${page}&limit=${limit}&search=${searchQuery}`
        );
        if (response.data.success) {
          setProducts(response.data.data);
          setTotalPages(Math.ceil(response.data.total / limit));
          setServices([]);
          setSolarKits([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, selectedTab, searchQuery]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  return (
    <Suspense fallback={<Loading />}>
      <SearchHandler setSelectedTab={setSelectedTab} />

      <Box sx={{ padding: 4 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#FFCC00", marginBottom: 4 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => {
                setSelectedTab(newValue);
                setPage(1);
              }}
              textColor="inherit"
              indicatorColor="primary"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category.label}
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    textTransform: "none",
                  }}
                />
              ))}
            </Tabs>

            <TextField
              variant="outlined"
              placeholder="Search products/services..."
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
              onChange={handleSearch}
            />
          </Toolbar>
        </AppBar>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Services Tab */}
              {selectedTab === 4 &&
                services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service._id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}

              {/* Solar Kits Tab */}
              {selectedTab === 5 &&
                solarKits.map((kit) => (
                  <Grid item xs={12} sm={6} md={4} key={kit._id}>
                    <SolarKitCard kit={kit} />
                  </Grid>
                ))}

              {/* Other Product Categories */}
              {selectedTab !== 4 &&
                selectedTab !== 5 &&
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>

            {selectedTab === 4 && <SolarService />}

            {/* Show pagination only for non-service & non-solar-kit tabs */}
            {selectedTab !== 4 && selectedTab !== 5 && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#FFCC00",
                      color: "white",
                    },
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
};

export default ProductList;
