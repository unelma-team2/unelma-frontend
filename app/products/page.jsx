"use client";

import React, { useState, useEffect } from "react";
import ProductsPageHero from "@/components/products/ProductsPageHero";
import { Box, Container, Tabs, Tab, useTheme, Select, MenuItem, FormControl, InputLabel, Menu } from "@mui/material";

const data = [
  // Your data here
];


export default function ProductsPage() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [subTab, setSubTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const handleTabChange = (event, newValue) => {setTab(newValue);
    setSubTab(0);
  };
  
  const handleSubTabChange = (event, newValue) => {
    setSubTab(newValue);
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductsPageHero />
      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
        >
          <Tab label="Products" />
          <Tab label="Services" />
        </Tabs>

        {tab === 0 && (
          <Tabs
          value={subTab}
          onChange={handleSubTabChange}
          sx={{ mb: 2 }}
        >
          <Tab label="All" />
          <Tab label="Enterprise Software" />
          <Tab label="Open Source" />
          <Tab label="E-Commerce" />
          <Tab label="Accessories" />
        </Tabs>
        )}
        {tab === 1 && (
          <Tabs
          value={subTab}
          onChange={handleSubTabChange}
          sx={{ mb: 2 }}
          >
          <Tab label="All" />
          <Tab label="Web Development" />
          <Tab label="Website Design" />
          <Tab label="Mobile Development" />
          <Tab label="Cyber Support" />
          </Tabs>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort by"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="low-to-high">High Price</MenuItem>
              <MenuItem value="high-to-low">Low Price</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "8px",
            padding: "1rem",
            background: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>Search</h3>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
        </Box>
        
      </Box>
    </Container>
  );
}
