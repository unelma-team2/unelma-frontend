"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductsSinglePageHero from "@/components/products/ProductsSinglePageHero";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCards";
import axios from "axios";

export default function ProductPage() {
  const { productSlug } = useParams();
  const [productData, setProductData] = useState(null);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedItems, setRelatedItems] = useState([]);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  // Fetch product data by slug
  useEffect(() => {
    if (!productSlug) return;

    axios
      .get(`${API_URL}/api/product?populate[all_products][populate]=*`)
      .then((res) => {
        const allProducts = res.data?.data?.all_products || [];
        const product = allProducts.find((item) => item.slug === productSlug);
        if (product) setProductData(product);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productSlug, API_URL]);

  // Fetch related items
  useEffect(() => {
    if (!productSlug) return;

    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => {
        const allProducts = res.data.data?.Products || [];
        const filteredProducts = allProducts.filter(
          (item) => item.slug !== productSlug
        );
        const getRandomItems = (items, count) => items.sort(() => 0.5 - Math.random()).slice(0, count);
        setRelatedItems(getRandomItems(filteredProducts, 3));
      })
      .catch((err) => console.error("Error fetching related products:", err));
  }, [API_URL, productSlug]);

  if (!productData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
          Loading product...
        </Typography>
      </Container>
    );
  }

  const {
    product_name,
    product_type,
    product_category,
    short_description,
    long_description,
    productOffer_title,
    WhatProductOffer_Points,
    WhoProductFor,
    WhoProductFor_Points,
    WhyChooseProduct,
    WhyChooseProduct_Points,
    ProductDetails,
    product_logo,
    productRelated_images,
  } = productData;

  const { product_price, cartButton_description, reviewButton_description } = ProductDetails || {};

  const imageUrl = (image) => {
    if (!image) return null;
    if (Array.isArray(image) && image.length > 0) image = image[0];
    if (image?.url) return image.url.startsWith("http") ? image.url : `${API_URL}${image.url}`;
    return null;
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const handleImageClick = (image) => setSelectedImage(image);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductsSinglePageHero />

      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
          Products {">"} {product_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left Column */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={imageUrl(product_logo) || "/images/placeholder.png"}
              alt={product_name}
              width={665}
              height={401}
              style={{ borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            />
          </Box>

          {/* Long Description */}
          {long_description && (
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line" }}>
                {long_description}
              </Typography>
            </Box>
          )}

          {/* What SnapValid Offers */}
          {productOffer_title && (
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
              {productOffer_title}
            </Typography>
          )}
          {WhatProductOffer_Points?.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item.productOfferPoints_title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line" }}>
                {item.productOfferPoints_description}
              </Typography>
            </Box>
          ))}

          {/* Who Product is For */}
          {WhoProductFor?.productFor_title && (
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
              {WhoProductFor.productFor_title}
            </Typography>
          )}
          {WhoProductFor?.productFor_description1 && (
            <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}>
              {WhoProductFor.productFor_description1}
            </Typography>
          )}
          {WhoProductFor?.productFor_description2 && (
            <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}>
              {WhoProductFor.productFor_description2}
            </Typography>
          )}
          {WhoProductFor_Points?.map((item) => (
            <Typography key={item.id} variant="body1" sx={{ color: "#555" }}>
              • {item.productForPoints_description}
            </Typography>
          ))}

          {/* Why Choose Product */}
          {WhyChooseProduct?.chooseProduct_title && (
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
              {WhyChooseProduct.chooseProduct_title}
            </Typography>
          )}
          {WhyChooseProduct_Points?.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item.productChoosePoints_title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line" }}>
                {item.productChoosePoint_description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Logo & Type */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Image
              src={imageUrl(product_logo) || "/images/placeholder.png"}
              alt={`${product_name} Logo`}
              width={301}
              height={47}
            />
            <Typography variant="body1" sx={{ color: "#555", fontWeight: "bold", mt: 1 }}>
              {product_type}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {product_name}
          </Typography>

          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
            <Typography variant="body2" sx={{ color: "#555" }}>{rating} Stars</Typography>
          </Box>

          <Typography variant="h4" sx={{ color: "black", fontWeight: "bold", textAlign: "center", mb: 2 }}>
            {product_price}
          </Typography>

          {/* Quantity & Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", mt: 2 }}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              sx={{ width: "60px" }}
              inputProps={{ min: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              {cartButton_description}
            </Button>
            <IconButton onClick={toggleFavorite} color="secondary">
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="outlined" color="secondary">{reviewButton_description}</Button>
          </Box>
        </Box>
      </Box>

      {/* Related Items */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Related Items
        </Typography>
        <Grid container spacing={4}>
          {relatedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductCard product={item} apiUrl={API_URL} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

