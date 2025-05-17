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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { axiosInstance } from "@/lib/axiosInstance";
import ProductCard from "@/components/UI/productCard";
import ServiceCard from "@/components/UI/ServiceCard";
import SolarService from "@/components/UI/SolarMait-Service";
import SolarKitCard from "@/components/UI/SolarKitCard";
import { useSearchParams } from "next/navigation";

// Categories array
const categories = [
  { label: "Panels", value: "pannel" },
  { label: "Inverters", value: "inverter" },
  { label: "Batteries", value: "battery" },
  { label: "Solar Components", value: "solar_components" },
  { label: "Services", value: "services" },
  { label: "Solar Kits", value: "solar-kit" },
];

const Loading = () => <p>Loading...</p>;

// Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

// Service interface
interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// SolarKit interface
interface SolarKit {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  technical_docs?: string[];
  products?: string[];
}

// Vendor interface
interface Vendor {
  _id: string;
  name: string;
}

const ProductList = () => {
  // Read category from the URL query
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const initialTabIndex =
    categoryFromUrl &&
    categories.findIndex((cat) => cat.value === categoryFromUrl) !== -1
      ? categories.findIndex((cat) => cat.value === categoryFromUrl)
      : 0;

  // States for data
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [solarKits, setSolarKits] = useState<SolarKit[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<number>(initialTabIndex);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // States for sub-categories and vendors
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>("");

  const limit = 8;

  // 1. Fetch sub-categories & vendors when tab changes
  const fetchSubCategoriesAndVendors = async () => {
    try {
      const category = categories[selectedTab].value;

      // If category is services, skip filters
      if (category === "services") {
        setSubCategories([]);
        setSelectedSubCategory("");
        setVendors([]);
        setSelectedVendor("");
        return;
      }

      // For solar-kit, use dedicated endpoints
      if (category === "solar-kit") {
        const subCatRes = await axiosInstance.get(
          `/solar-kit/all-subCategories?category=${category}`
        );
        if (subCatRes.data?.success) {
          setSubCategories(subCatRes.data.subCategories || []);
        } else {
          setSubCategories([]);
        }

        const vendorsRes = await axiosInstance.get(
          `/solar-kit/all-vendors?category=${category}`
        );
        if (vendorsRes.data?.success) {
          setVendors(vendorsRes.data.vendors || []);
        } else {
          setVendors([]);
        }
      } else {
        // For other categories, use the regular endpoints
        const subCatRes = await axiosInstance.get(
          `/products/all-subCategories?category=${category}`
        );
        if (subCatRes.data?.success) {
          setSubCategories(subCatRes.data.subCategories || []);
        } else {
          setSubCategories([]);
        }

        const vendorsRes = await axiosInstance.get(
          `/products/all-vendors?category=${category}`
        );
        if (vendorsRes.data?.success) {
          setVendors(vendorsRes.data.vendors || []);
        } else {
          setVendors([]);
        }
      }
      // Reset filters upon tab change
      setSelectedSubCategory("");
      setSelectedVendor("");
    } catch (error) {
      console.error("Failed to fetch sub-categories or vendors:", error);
      setSubCategories([]);
      setVendors([]);
    }
  };

  useEffect(() => {
    fetchSubCategoriesAndVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  // 2. Fetch products, services, or solar kits
  const fetchProducts = async () => {
    try {
      const category = categories[selectedTab].value;

      // Services
      if (category === "services") {
        const response = await axiosInstance.get("/services/get-all");
        setServices(response.data.services);
        setTotalPages(1);
        setProducts([]);
        setSolarKits([]);
        return;
      }

      // Solar Kits
      if (category === "solar-kit") {
        // Append filters for solar kits as well
        const response = await axiosInstance.get(
          `/products/solar-kit/get-all?` +
            `page=${page}&limit=${limit}&search=${searchQuery}` +
            `&subCategory=${selectedSubCategory}&vendor=${selectedVendor}`
        );
        if (response.data?.solar_kits) {
          setSolarKits(response.data.solar_kits);
          setTotalPages(1); // Adjust if your endpoint supports pagination
          setProducts([]);
          setServices([]);
        }
        return;
      }

      // Other Product Categories
      const response = await axiosInstance.get(
        `/products/all-products?category=${category}&page=${page}&limit=${limit}&search=${searchQuery}` +
          `&subCategory=${selectedSubCategory}&vendors=${selectedVendor}`
      );
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
        setServices([]);
        setSolarKits([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Re-fetch whenever these states change
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedTab, searchQuery, selectedSubCategory, selectedVendor]);

  // 3. Handlers
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

  // Handler for sub-category dropdown
  const handleSubCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedSubCategory(event.target.value as string);
    setPage(1);
  };

  // Handler for vendor dropdown
  const handleVendorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedVendor(event.target.value as string);
    setPage(1);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Box sx={{ padding: 4 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#FFCC00", marginBottom: 4 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Category Tabs */}
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

            {/* Search Input */}
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

        {/* Filter Row (Sub-Categories, Vendors) */}
        {/* Show these filters for all categories except services */}
        {selectedTab !== 4 && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: 2,
              flexWrap: "wrap",
            }}
          >
            {/* Sub-Category Filter */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 200, backgroundColor: "white" }}
            >
              <InputLabel>Sub-Category</InputLabel>
              <Select
                label="Sub-Category"
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
              >
                <MenuItem value="">
                  <em>All Sub-Categories</em>
                </MenuItem>
                {subCategories.map((subCat, idx) => (
                  <MenuItem key={idx} value={subCat}>
                    {subCat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Vendors Filter */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 200, backgroundColor: "white" }}
            >
              <InputLabel>Vendors</InputLabel>
              <Select
                label="Vendors"
                value={selectedVendor}
                onChange={handleVendorChange}
              >
                <MenuItem value="">
                  <em>All Vendors</em>
                </MenuItem>
                {vendors.map((vendor) => (
                  <MenuItem key={vendor._id} value={vendor._id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

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

            {/* If we're on the Services tab, show the SolarService component */}
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
