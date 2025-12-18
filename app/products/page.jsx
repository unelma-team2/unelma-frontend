"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useFavorites } from "@/app/context/FavoritesContext"
import ProductsSinglePageHero from "@/components/products/ProductsSinglePageHero"
import Image from "next/image"
import { useEffect, useState, use } from "react"
import ProductCard from "@/components/ProductCard"
import axios from "axios"
import Link from "next/link"
import BackToTopButton from "@/components/BackToTopButton"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ProductPage({ params }) {
  const resolvedParams = use(params)
  const { productSlug } = resolvedParams
  const { addToCart } = useCart()
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const theme = useTheme()
  const [productData, setProductData] = useState(null)
  const [rating, setRating] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [relatedItems, setRelatedItems] = useState([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    if (!productSlug) return

    axios
      .get(`${API_URL}/api/product?populate[all_products][populate]=*`)
      .then((res) => {
        const allProducts = res.data?.data?.all_products || []
        const product = allProducts.find((item) => item.slug === productSlug)
        if (product) setProductData(product)

        const relatedProducts = allProducts.filter((item) => item.slug !== productSlug)

        const getRandomItems = (items, count) => {
          const shuffled = [...items].sort(() => 0.5 - Math.random())
          return shuffled.slice(0, count)
        }

        setRelatedItems(getRandomItems(relatedProducts, 3))
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false))
  }, [productSlug, API_URL])

  const imageUrl = (image) => {
    if (!image) return null
    const img = Array.isArray(image) ? image[0] : image
    if (img?.data?.attributes?.url) {
      const url = img.data.attributes.url
      return url.startsWith("http") ? url : `${API_URL}${url}`
    }
    if (img?.url) {
      return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`
    }
    return null
  }

  const getPriceNumber = (price) => {
    if (!price) return 0
    const num = Number.parseFloat(price.replace(/[^0-9.]/g, ""))
    return isNaN(num) ? 0 : num
  }

  const handleAddToCart = async () => {
    if (!productData) return
    const quantityValue = quantity || 1
    const unitPriceValue = getPriceNumber(productData.ProductDetails?.product_price)
    await addToCart({
      id: productData.id,
      name: productData.product_name,
      unitPrice: unitPriceValue,
      quantity: quantityValue,
    })
    router.push("/cart")
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner />
      </Container>
    )
  }

  if (!productData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography sx={{ ...theme.typography.headingFont_M, textAlign: "center", mt: 10 }}>
          Product not found
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button component={Link} href="/products">
            Back to Products
          </Button>
        </Box>
      </Container>
    )
  }

  const {
    product_name,
    product_type,
    product_image,
    long_description,
    productOffer_title,
    WhatProductOffer_Points,
    WhoProductFor,
    WhoProductFor_Points,
    WhyChooseProduct,
    WhyChooseProduct_Points,
    ProductDetails,
    product_logo,
  } = productData

  const { product_price, cartButton_description, reviewButton_description } = ProductDetails || {}

  return (
    <>
      <ProductsSinglePageHero />
      <Box
        sx={{
          mx: { xs: 2, sm: 4, md: "150px" },
          py: 6,
        }}
      >
        <Typography sx={{ ...theme.typography.bodyFontTitle_L, mb: 6 }}>
          <Link href="/products" style={{ color: theme.palette.section.products.main, textDecoration: "none" }}>
            Products
          </Link>
          {" > "} {product_name}
        </Typography>

        <Grid container spacing={4}>
          {/* Left: Product Image Card */}
          <Grid item xs={12} md={7}>
            <Card>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 500 },
                  overflow: "hidden",
                }}
              >
                <Image
                  src={imageUrl(product_image) || "/placeholder.svg"}
                  alt={product_name}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
            </Card>

            <Card sx={{ mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ ...theme.typography.headingFont_S, mb: 3 }}>Product Details</Typography>

                {long_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 3, whiteSpace: "pre-line" }}>
                    {long_description}
                  </Typography>
                )}

                {productOffer_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {productOffer_title}
                  </Typography>
                )}

                {WhatProductOffer_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        {item.productOfferPoints_title}:
                      </Box>
                      <Box component="span">{item.productOfferPoints_description}</Box>
                    </Typography>
                  </Box>
                ))}

                {WhyChooseProduct?.chooseProduct_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {WhyChooseProduct.chooseProduct_title}
                  </Typography>
                )}

                {WhyChooseProduct_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        {item.productChoosePoints_title}
                      </Box>
                      <Box component="span">{item.productChoosePoint_description}</Box>
                    </Typography>
                  </Box>
                ))}

                {WhoProductFor?.productFor_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {WhoProductFor.productFor_title}
                  </Typography>
                )}

                {WhoProductFor?.productFor_description1 && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 2, whiteSpace: "pre-line" }}>
                    {WhoProductFor.productFor_description1}
                  </Typography>
                )}

                {WhoProductFor_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 1 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      • {item.productForPoints_description}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Logo and Product Info Card */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 90,
                }}
              >
                <Image
                  src={imageUrl(product_logo) || "/placeholder.svg"}
                  alt={`${product_name} Logo`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>

            <Typography
              sx={{
                ...theme.typography.bodyFont_M,
                textAlign: "right",
                mb: 3,
                color: theme.palette.text.secondary,
              }}
            >
              {product_type}
            </Typography>

            <Card>
              <CardContent sx={{ p: 4 }}>
                {/* Product Name */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <Typography sx={{ ...theme.typography.headingFont_S }}>{product_name}</Typography>
                  <IconButton onClick={() => toggleFavorite(productData, "product")} aria-label="toggle-favourite">
                    {isFavorite(productData, "product") ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                {/* Price */}
                <Typography
                  sx={{
                    ...theme.typography.headingFont_M,
                    color: theme.palette.section.products.main,
                    mb: 3,
                  }}
                >
                  ${getPriceNumber(product_price).toFixed(2)}
                </Typography>

                {/* Quantity and Add to Cart */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    sx={{ width: "80px" }}
                    inputProps={{ min: 1 }}
                    size="small"
                  />
                  <Button variant="contained" fullWidth onClick={handleAddToCart}>
                    {cartButton_description || "Add to Cart"}
                  </Button>
                </Box>

                {/* Star Rating */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, my: 3 }}>
                  <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} size="large" />
                  <Typography sx={{ ...theme.typography.bodyFont_S }}>{rating} Stars</Typography>
                </Box>

                {/* Leave a Review Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  href={`/contact?contactType=Feedback%2Freview&product=${encodeURIComponent(product_name)}`}
                >
                  {reviewButton_description || "Leave a Review"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography sx={{ ...theme.typography.headingFont_S, mb: 4 }}>Related Products</Typography>
            <Grid container spacing={4}>
              {relatedItems.map((item) => {
                const logoUrl = item.product_logo?.url
                  ? item.product_logo.url.startsWith("http")
                    ? item.product_logo.url
                    : `${API_URL}${item.product_logo.url}`
                  : null
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ProductCard product={item} imageUrl={logoUrl} />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}
      </Box>
      <BackToTopButton />
    </>
  )
}
