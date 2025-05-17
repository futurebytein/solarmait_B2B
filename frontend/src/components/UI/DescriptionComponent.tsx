"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";

// Define the Product and Parts types
interface Part {
  item: string;
  specification: string;
  qty: number | string;
}

interface Product {
  description?: string;
  parts?: Part[];
  technical_docs?: string[];
}

// Optional interface for additional PDF documents groups (used for solarkit)
interface PDFDocsGroup {
  label: string;
  docs: string[];
}

interface DescriptionComponentProps {
  product: Product | null;
  pdfDocsGroups?: PDFDocsGroup[];
}

// PdfViewer Component with type-safe props
const PdfViewer: React.FC<{ file: string }> = ({ file }) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", height: "600px", mt: 2 }}>
        <iframe
          src={file}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        ></iframe>
      </Box>
    </Box>
  );
};

// Main DescriptionComponent
const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  product,
  pdfDocsGroups,
}) => {
  // Main tab: 0 = Product Details, 1 = Technical Documents
  const [tabValue, setTabValue] = useState<number>(0);
  // For technical documents: if using additional groups, track the selected group tab.
  // Otherwise, for single group technical_docs, track the selected doc.
  const [docTab, setDocTab] = useState<number>(0);

  // Handle main tabs (Product Details, Technical Documents)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle technical document tabs (works for both single group and additional groups)
  const handleDocTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setDocTab(newValue);
  };

  // Return a message if product is null
  if (!product) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          No product details available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", borderRadius: 2, p: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Product Details" sx={{ fontWeight: "bold" }} />
        <Tab label="Technical Documents" sx={{ fontWeight: "bold" }} />
      </Tabs>

      {/* Product Details Tab */}
      {tabValue === 0 && (
        <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Description
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
            {product.description || "No description available."}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }} fontWeight="bold">
            Parts & Details
          </Typography>
          <Box sx={{ mt: 1, p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px" }}>Item</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    Specification
                  </th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {product.parts?.length ? (
                  product.parts.map((part, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px" }}>{part.item}</td>
                      <td style={{ padding: "8px" }}>{part.specification}</td>
                      <td style={{ padding: "8px" }}>{part.qty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ padding: "8px" }}>
                      No parts information available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Paper>
      )}

      {/* Technical Documents Tab */}
      {tabValue === 1 && (
        <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Technical Documents
          </Typography>

          {/* If optional pdfDocsGroups is provided, use that */}
          {pdfDocsGroups && pdfDocsGroups.length > 0 ? (
            <>
              <Tabs
                value={docTab}
                onChange={handleDocTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mt: 2 }}
              >
                {pdfDocsGroups.map((group, index) => (
                  <Tab
                    key={index}
                    label={group.label}
                    sx={{ fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
              {/* Render all PDF viewers in the selected group */}
              <Box sx={{ mt: 2 }}>
                {pdfDocsGroups[docTab].docs.map((doc, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <PdfViewer file={doc} />
                  </Box>
                ))}
              </Box>
            </>
          ) : product.technical_docs && product.technical_docs.length ? (
            <>
              {/* Fallback: Tabs for multiple documents in product.technical_docs */}
              <Tabs
                value={docTab}
                onChange={handleDocTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mt: 2 }}
              >
                {product.technical_docs.map((doc, index) => (
                  <Tab
                    key={index}
                    label={`Document ${index + 1}`}
                    sx={{ fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
              {/* PDF Viewer for Selected Document */}
              <PdfViewer file={product.technical_docs[docTab]} />
            </>
          ) : (
            <Typography sx={{ mt: 2, color: "gray" }}>
              No technical documents available.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default DescriptionComponent;
