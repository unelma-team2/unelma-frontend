"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import ProductsPageHero from "@/components/products/ProductsPageHero"
import { Box, Tabs, Tab, useTheme, Select, MenuItem, FormControl, Typography } from "@mui/material"
import ProductCard from "@/components/ProductCard"
import ServiceCard from "@/components/ServiceCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import SearchInput from "@/components/SearchInput"
import { useRouter, useSearchParams } from "next/navigation"
import BackToTopButton from "@/components/BackToTopButton"

export default function ProductsPage() {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [tab, setTab] = useState(tabParam === "services" ? 1 : 0)
  const [categoryTab, setCategoryTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const productCategories = ["All", "Enterprise Software", "Open Source", "E-Commerce", "Accessories"]
  const serviceCategories = ["All", "Web Development", "Website Design", "Mobile Development", "Cyber Support"]

  useEffect(() => {
    axios
      .get(`${API_URL}/api/product?populate[ProductBannerSection][populate]=*&populate[all_products][populate]=*`)
      .then((res) => {
        const productPage = res.data?.data
        const allProducts = productPage?.all_products || []
        console.log("[v0] Products loaded:", allProducts)
        console.log(
          "[v0] Product categories:",
          allProducts.map((p) => p.category),
        )
        setProducts(allProducts)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/service-page?populate[ServiceBannerDection][populate]=*&populate[all_services][populate]=*`)
      .then((res) => {
        const servicePage = res.data?.data
        const allServices = servicePage?.all_services || []
        console.log("[v0] Services loaded:", allServices)
        console.log(
          "[v0] Service categories:",
          allServices.map((s) => s.category),
        )
        setServices(allServices)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
    setCategoryTab(0)
    if (newValue === 0) {
      router.push("/products?tab=products")
    } else {
      router.push("/products?tab=services")
    }
  }

  const handleCategoryTabChange = (event, newValue) => {
    setCategoryTab(newValue)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery ? product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesCategory = categoryTab === 0 ? true : product?.category === productCategories[categoryTab]
    if (categoryTab > 0) {
      console.log(
        "[v0] Filtering product:",
        product.title,
        "Category:",
        product.category,
        "Expected:",
        productCategories[categoryTab],
        "Matches:",
        matchesCategory,
      )
    }
    return matchesSearch && matchesCategory
  })

  const filteredServices = services.filter((service) => {
    const matchesSearch = searchQuery ? service?.service_name?.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesCategory = categoryTab === 0 ? true : service?.category === serviceCategories[categoryTab]
    if (categoryTab > 0) {
      console.log(
        "[v0] Filtering service:",
        service.service_name,
        "Category:",
        service.category,
        "Expected:",
        serviceCategories[categoryTab],
        "Matches:",
        matchesCategory,
      )
    }
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === "low-to-high") return a.price - b.price
    if (sortBy === "high-to-low") return b.price - a.price
    return 0
  })

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === "low-to-high") return (a.price || 0) - (b.price || 0)
    if (sortBy === "high-to-low") return (b.price || 0) - (a.price || 0)
    return 0
  })

  if (loading) return <LoadingSpinner />
  if (error) return <Typography sx={{ textAlign: "center", py: 4 }}>Error: {error.message}</Typography>

  return (
    <Box sx={{ mb: 10 }}>
      <ProductsPageHero />
      <Box sx={{ mx: { xs: 2, md: "150px" }, mt: 6 }}>
        <Box sx={{ borderBottom: `2px solid ${theme.palette.primary.main}`, mb: 2 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                ...theme.typography.bodyFontTitle_M_Card,
                textTransform: "uppercase",
                minWidth: 150,
                py: 2,
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: theme.palette.section.products.soft,
                  transform: "scale(1.05)",
                },
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.section.products.pastel,
                color: theme.palette.primary.main,
                fontWeight: 700,
              },
              "& .MuiTabs-indicator": {
                height: 4,
                backgroundColor: theme.palette.section.products.vibrant,
              },
            }}
          >
            <Tab label="Products" />
            <Tab label="Services" />
          </Tabs>
        </Box>

        <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 4 }}>
          <Tabs
            value={categoryTab}
            onChange={handleCategoryTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                ...theme.typography.bodyFont_L,
                textTransform: "capitalize",
                minWidth: 100,
                py: 1.5,
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: theme.palette.section.products.soft,
                },
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.section.products.pastel,
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                height: 3,
                backgroundColor: theme.palette.section.products.main,
              },
            }}
          >
            {(tab === 0 ? productCategories : serviceCategories).map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        <Box
          sx={{
            border: theme.mixins.borderStyle,
            borderRadius: 2,
            p: 4,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Search Input */}
            <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: 400 } }}>
              <SearchInput placeholder={`Search ${tab === 0 ? "products" : "services"}...`} onSearch={handleSearch} />
            </Box>

            {/* Sort By Filter */}
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                sx={{
                  ...theme.typography.bodyFont_M,
                  border: theme.mixins.borderStyle,
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                <MenuItem value="">
                  <Typography sx={{ ...theme.typography.bodyFont_M }}>Sort by</Typography>
                </MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="low-to-high">Price: Low to High</MenuItem>
                <MenuItem value="high-to-low">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
              justifyItems: "center",
            }}
          >
            {tab === 0
              ? sortedProducts.map((product) => {
                  const imageUrl = product.product_logo?.url
                    ? product.product_logo.url.startsWith("http")
                      ? product.product_logo.url
                      : `${API_URL}${product.product_logo.url}`
                    : null

                  return <ProductCard key={product.id} product={product} imageUrl={imageUrl} apiUrl={API_URL} />
                })
              : sortedServices.map((service) => {
                  const imageUrl = service.service_logo?.url
                    ? service.service_logo.url.startsWith("http")
                      ? service.service_logo.url
                      : `${API_URL}${service.service_logo.url}`
                    : null

                  return <ServiceCard key={service.id} service={service} imageUrl={imageUrl} apiUrl={API_URL} />
                })}
          </Box>

          {((tab === 0 && sortedProducts.length === 0) || (tab === 1 && sortedServices.length === 0)) && (
            <Typography
              sx={{
                ...theme.typography.bodyFont_L,
                textAlign: "center",
                py: 8,
                color: theme.palette.text.secondary,
              }}
            >
              No {tab === 0 ? "products" : "services"} found
            </Typography>
          )}
        </Box>
      </Box>

      <BackToTopButton />
    </Box>
  )
}
