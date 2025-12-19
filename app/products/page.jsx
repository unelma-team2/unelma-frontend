"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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

  // helper: extract raw category name from various shapes (iterative, stable)
  const extractCategoryRaw = useCallback((initialCat) => {
    let cat = initialCat
    // unwrap nested product_category pointers iteratively
    while (cat && typeof cat === "object" && cat.product_category) {
      cat = cat.product_category
    }
    if (!cat) return ""
    if (typeof cat === "string") return cat
    if (cat.data?.attributes?.name) return cat.data.attributes.name
    if (cat.attributes?.name) return cat.attributes.name
    if (cat.name) return cat.name
    if (cat.product_category_name) return cat.product_category_name
    return ""
  }, [])
  
  // helper: extract a list of category names from various shapes (for services that can have multiple categories)
  const extractCategoryList = useCallback((value) => {
    if (!value) return []
    // if it's already an array of strings or relation objects
    if (Array.isArray(value)) {
      return value
        .map((v) => (typeof v === "string" ? v : v?.data?.attributes?.name ?? v?.attributes?.name ?? v?.name))
        .filter(Boolean)
    }

    // if it's a relation container { data: [...] }
    if (value.data && Array.isArray(value.data)) {
      return value.data.map((d) => d?.attributes?.name).filter(Boolean)
    }

    // if it's a single relation or field that may contain multiple via delimiter
    const single = extractCategoryRaw(value)
    if (!single) return []
    // if backend stored multiple categories in a single string separated by commas
    return single.split(",").map((s) => s.trim()).filter(Boolean)
  }, [extractCategoryRaw])

  // normalize for comparison: remove non-alphanumeric, collapse whitespace, lowercase
  const normalizeForCompare = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
 
   // derive product categories from loaded products so tab labels match backend values
   const productCategories = useMemo(() => {
     try {
       const setVals = new Set()
       setVals.add("All")
       products.forEach((p) => {
         const raw = extractCategoryRaw(p?.product_category ?? p?.category)
         if (raw) setVals.add(raw)
       })
       return Array.from(setVals)
     } catch (e) {
       console.warn("Failed to derive product categories", e)
       return ["All"]
     }
   }, [products, extractCategoryRaw])
 
   // derive service categories (supports services having multiple categories)
   const serviceCategories = useMemo(() => {
     try {
       const setVals = new Set()
       setVals.add("All")
       services.forEach((s) => {
         const list = extractCategoryList(s?.service_category ?? s?.category ?? s?.service_categories)
         list.forEach((c) => c && setVals.add(c))
       })
       return Array.from(setVals)
     } catch (e) {
       console.warn("Failed to derive service categories", e)
       return ["All"]
     }
   }, [services, extractCategoryList])
 
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

  // helper: normalize category value from different shapes
  const getCategoryName = (cat) => {
    if (!cat) return ""
    if (typeof cat === "string") return cat
    // Strapi relation shape: { data: { attributes: { name: "..." } } }
    if (cat.data?.attributes?.name) return cat.data.attributes.name
    // direct field shape: { attributes: { name: "..." } } or { name: "..." }
    if (cat.attributes?.name) return cat.attributes.name
    if (cat.name) return cat.name
    // new: support product_category field that may be a string or relation
    if (cat.product_category) return getCategoryName(cat.product_category)
    if (cat.product_category_name) return cat.product_category_name
    return ""
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product?.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    // read product_category first (Strapi field), fall back to generic category
    const productCatField = product?.product_category ?? product?.category
    const productCategoryName = getCategoryName(productCatField)
    const selectedCategory = productCategories[categoryTab] || "All"

    // if "All" selected, allow all; otherwise match case-insensitively
    const matchesCategory =
      selectedCategory === "All" || productCategoryName.toLowerCase() === selectedCategory.toLowerCase()

    if (categoryTab > 0) {
      console.log(
        "[v0] Filtering product:",
        product.title,
        "product_category:",
        productCategoryName,
        "Expected:",
        selectedCategory,
        "Matches:",
        matchesCategory,
      )
    }

    return matchesSearch && matchesCategory
  })

  const filteredServices = services.filter((service) => {
    const matchesSearch = searchQuery
      ? service?.service_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    // get list of categories for this service and compare normalized forms
    const serviceCategoryList = extractCategoryList(service?.service_category ?? service?.category ?? service?.service_categories)
    const selectedCategory = serviceCategories[categoryTab] || "All"
    const matchesCategory =
      selectedCategory === "All" ||
      serviceCategoryList.some((c) => normalizeForCompare(c) === normalizeForCompare(selectedCategory))

    if (categoryTab > 0) {
      console.log(
        "[v0] Filtering service:",
        service.service_name,
        "Categories:",
        serviceCategoryList,
        "Expected:",
        selectedCategory,
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
            {(tab === 0 ? productCategories : serviceCategories).map((category) => (
              <Tab key={category} label={category} />
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
