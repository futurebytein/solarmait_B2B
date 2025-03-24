"use client";

import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProductsTable from "@/components/Admin/pages/products/page"; // your provided component
import SolarKitsTable from "@/components/Admin/pages/products/solarKit"; // new component

const ProductsAndSolarKitsTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Products" />
        <Tab label="Solar Kits" />
      </Tabs>
      <Box sx={{ marginTop: 2 }}>
        {tabIndex === 0 && <ProductsTable />}
        {tabIndex === 1 && <SolarKitsTable />}
      </Box>
    </Box>
  );
};

export default ProductsAndSolarKitsTabs;
