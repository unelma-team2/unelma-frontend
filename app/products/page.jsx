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
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [tab, setTab] = useState(tabParam === "services" ? 1 : 0); // 0: Products, 1: Services
  const [subTab, setSubTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [bannerSection, setBannerSection] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  // Fetch product page data
  useEffect(() => {
    axios
      .get(
        `${API_URL}/api/product?populate[ProductBannerSection][populate]=*&populate[all_products][populate]=*`
      )
      .then((res) => {
        const productPage = res.data?.data; // SINGLE TYPE → not array
  
        setBannerSection(productPage?.ProductBannerSection || null);
  
        const allProducts = productPage?.all_products || [];
  
        console.log("Fetched Products:", allProducts);
  
        setProducts(allProducts);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);
  

  useEffect(() => {
    // Fetch services data
    axios
      .get(`${API_URL}/api/service-page?populate[ServiceBannerDection][populate]=*&populate[all_services][populate]=*`)
      .then((res) => {
        const servicePage = res.data?.data;
        console.log("Service Page Data:", servicePage);
        const allServices = servicePage?.all_services || [];

        console.log("Fetched Services:", allServices);
  
        setServices(allServices);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL])

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setSubTab(0);
    if (newValue === 0) {
    router.push("/products?tab=products");
  } else {
    router.push("/products?tab=services");
  }
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTab(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Subtabs
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

  // Filter products by search
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Filter services by search
  const filteredServices = searchQuery
    ? services.filter((service) =>
        service?.attributes?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : services;

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    const aAttr = a.attributes;
    const bAttr = b.attributes;

    if (sortBy === "newest")
      return new Date(bAttr.createdAt) - new Date(aAttr.createdAt);
    if (sortBy === "oldest")
      return new Date(aAttr.createdAt) - new Date(bAttr.createdAt);
    if (sortBy === "low-to-high") return aAttr.price - bAttr.price;
    if (sortBy === "high-to-low") return bAttr.price - aAttr.price;
    return 0;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <ProductsPageHero bannerSection={bannerSection} apiUrl={API_URL}/>

      {/* Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Products" />
          <Tab label="Services" />
        </Tabs>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Sub Tabs */}
          <Tabs value={subTab} onChange={handleSubTabChange}>
            {(tab === 0 ? productsSubTabs : servicesSubTabs).map(
              (label, index) => (
                <Tab key={index} label={label} />
              )
            )}
          </Tabs>

          {/* Sorting */}
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

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Search */}
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

        {/* Cards */}
        <Grid item xs={12} md={9}>
  {tab === 0 ? (
    <Grid container spacing={4}>
      {sortedProducts.map((product) => {
        
        const imageUrl = product.product_logo?.url
          ? product.product_logo.url.startsWith("http")
            ? product.product_logo.url
            : `${API_URL}${product.product_logo.url}`
          : null;

        return (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              product={product} 
              imageUrl={imageUrl}   // ← pass to card if needed
              apiUrl={API_URL}
            />
          </Grid>
        );
      })}
    </Grid>
          ) : (
            <Grid container spacing={4}>
              {sortedServices.map((service) => {

              const imageUrl = service.service_logo?.url
              ? service.service_logo.url.startsWith("http")
                ? service.service_logo.url
                : `${API_URL}${service.service_logo.url}`
              : null;

return (
                <Grid item xs={12} sm={4} md={4} lg={4} key={service.id}>
                  <ServiceCard service={service} imageUrl={imageUrl} apiUrl={API_URL} />
                </Grid>
)})}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}