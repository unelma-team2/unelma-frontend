"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsPageHero from "@/components/products/ProductsPageHero";
import {
  Box,
  Tabs,
  Tab,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard"; 
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProductsPage() {
  const theme = useTheme();
  const [tab, setTab] = useState(0); // Main tabs: Products, Services
  const [subTab, setSubTab] = useState(0); // Subtabs for categories
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]); // State for services data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    // Fetch products data
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => {
        console.log("Products API Response:", res.data.data?.Products); // Debug the API response
        setProducts(res.data.data?.Products || []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  useEffect(() => {
    // Fetch services data
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => {
        console.log("Services API Response:", res.data.data?.Services); // Debug the API response
        setServices(res.data.data?.Services || []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setSubTab(0); // Reset subtabs when switching main tabs
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTab(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Subtabs for Products and Services
  const productsSubTabs = [
    "All",
    "Enterprise Software",
    "Open Source",
    "E-Commerce",
    "Accessories",
  ];
  const servicesSubTabs = [
    "All",
    "Web Development",
    "Website Design",
    "Mobile Development",
    "Cyber Support",
  ];

  // Filter products based on searchQuery
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products; // Show all products if searchQuery is empty

  // Filter services based on searchQuery
  const filteredServices = searchQuery
    ? services.filter((service) =>
        service.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services; // Show all services if searchQuery is empty

  // Sort products or services based on sortBy
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0; // Default: no sorting
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0; // Default: no sorting
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ py: 4, px: 2, marginLeft: "170px" }}>
      <ProductsPageHero />

      {/* Tabs Section */}
      <Box sx={{ mb: 4 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Products" />
          <Tab label="Services" />
        </Tabs>

        {/* Subtabs Section */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Tabs value={subTab} onChange={handleSubTabChange}>
            {(tab === 0 ? productsSubTabs : servicesSubTabs).map(
              (label, index) => (
                <Tab key={index} label={label} />
              )
            )}
          </Tabs>

          {/* Sort Dropdown */}
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
              <MenuItem value="low-to-high">Low Price</MenuItem>
              <MenuItem value="high-to-low">High Price</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={3}>
        {/* Left Column: Search Box */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
              Search
            </Typography>
            <TextField
              fullWidth
              placeholder={`Search ${tab === 0 ? "products" : "services"}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": {
                  border: `2px solid ${theme.palette.primary.main}`,
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                },
              }}
            />
          </Box>
        </Grid>

        {/* Right Column: Cards */}
        <Grid item xs={12} md={9}>
          {tab === 0 ? (
            <Grid container spacing={4}>
              {sortedProducts.map((product) => (
                <Grid item xs={12} sm={4} md={4} lg={4} key={product.id}>
                  <ProductCard product={product} apiUrl={API_URL} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {sortedServices.map((service) => (
                <Grid item xs={12} sm={4} md={4} lg={4} key={service.id}>
                  <ServiceCard service={service} apiUrl={API_URL} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
