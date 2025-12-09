"use client";

import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
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
import ProductCard from "@/components/ProductCard";
import axios from "axios";

export default function ProductPage() {
  const { productSlug } = useParams();
  const { addToCart } = useCart();
  const router = useRouter();
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

        // Filter related products (exclude current product)
      const relatedProducts = allProducts.filter((item) => item.slug !== productSlug);

      // Pick 3 random related items
      const getRandomItems = (items, count) => {
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };

      setRelatedItems(getRandomItems(relatedProducts, 3));
    })
    .catch((err) => console.error("Error fetching product:", err));
}, [productSlug, API_URL]);


  // Guard against undefined productData
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
    product_image,
    short_description,
    long_description,
    productOffer_title,
    WhatProductOffer_Points,
    WhoProductFor,
    WhoProductFor_Points,
    WhyChooseProduct,
    WhyChooseProduct_Points,
    ProductLink,
    ProductDetails,
    product_logo,
    productRelated_images,
  } = productData;

  const { product_price, cartButton_description, reviewButton_description } = ProductDetails || {};

      const imageUrl = (image) => {

        if (!image) return null;
      
        const img = Array.isArray(image) ? image[0] : image;
      
        if (img?.data?.attributes?.url) {
          const url = img.data.attributes.url;
          return url.startsWith("http") ? url : `${API_URL}${url}`;
        }
      
        if (img?.url) {
          return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`;
        }
      
        return null;
      };
  

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    console.log("Rating submitted:", newValue);
  };

  const handleAddToCart = () => {
    addToCart({ ...productData, quantity });
    router.push("/cart");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(
      `${productData.name} is ${
        !isFavorite ? "added to" : "removed from"
      } favorites.`
    );
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <ProductsSinglePageHero />

      {/* Breadcrumb */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
          Products {">"} {product_name}
        </Typography>
      </Box>

      {/* Product Details */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Product Image and Detailed Description (Left) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Main Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={imageUrl(product_image)}
            //   src={selectedImage ? imageUrl(selectedImage) : imageUrl(product_image)}
              alt={product_name}
              width={665}
              height={401}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>

          {/* Detailed Description */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* LONG DESCRIPTION */}
         {long_description && (
            <Typography
              variant="body1"
              sx={{ color: "#555", whiteSpace: "pre-line" }}
            >
            {long_description}
            </Typography>
          )}


      {/* WHAT PRODUCT OFFERS */}
      {productOffer_title && (
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          {productOffer_title}
        </Typography>
      )}

{WhatProductOffer_Points?.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: "#555" }}>
          <Box component= "span" sx={{ fontWeight: "bold",mr: 1}}>•</Box>
    <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
      {item.productOfferPoints_title}:
    </Box>
    <Box component="span">
      {item.productOfferPoints_description}
    </Box>
  </Typography>
        </Box>
      ))}

      {/* WHY CHOOSE PRODUCT */}
      {WhyChooseProduct?.chooseProduct_title && (
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
          {WhyChooseProduct.chooseProduct_title}
        </Typography>
      )}
      
      {WhyChooseProduct_Points?.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
            
<Typography variant="body1" sx={{ color: "#555" }}>
<Box component= "span" sx={{ fontWeight: "bold",mr: 1}}>•</Box>
    <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
    {item.productChoosePoints_title}
    </Box>
    <Box component="span">
    {item.productChoosePoint_description}
    </Box>
  </Typography>
  
        </Box>
      ))}

      {/* WHO PRODUCT IS FOR */}
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

      {WhoProductFor_Points?.map((item) => (
        <Box key={item.id} sx={{ mb: 1 }}>
          <Typography variant="body1" sx={{ color: "#555" }}>
            • {item.productForPoints_description}
          </Typography>
        </Box>
      ))}

{WhoProductFor?.productFor_description2 && (
        <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}>
          {WhoProductFor.productFor_description2}
        </Typography>
      )}

{ProductLink?.link_description && (
        <Typography variant="body1" sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}>
          {ProductLink.link_description}
        </Typography>
      )}

          </Box>

          {Array.isArray(productRelated_images) && productRelated_images.length > 0 && (
  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
    {productRelated_images.slice(0, 2).map((imgObj, index) => {
      const url = imageUrl(imgObj); // pass single image object here

      if (!url) return null; // skip empty images

      return (
        <Box
          key={index}
          sx={{
            border: "2px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            cursor: "pointer",
            width: "100px",
            height: "100px",
            boxShadow: selectedImage === imgObj ? "0 0 10px #000" : "none",
          }}
          onClick={() => handleImageClick(imgObj)}
        >
          <Image
            src={url}
            alt={`Gallery Image ${index + 1}`}
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        </Box>
      );
    })}
  </Box>
)}

        </Box>

        {/* Product Logo, Short Description, and Pricing (Right) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Product Logo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Image
              src={imageUrl(product_logo)}
              alt={`${product_name} Logo`}
              width={301}
              height={47}
            />
            {/* Product Type */}
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                fontWeight: "bold",
                textAlign: "center",
                mt: 1, // Add spacing between logo and product type
              }}
            >
              {product_type}
            </Typography>
          </Box>

          {/* Product Name */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
          >
            {product_name}
          </Typography>

          {/* Ratings */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <Typography variant="body2" sx={{ color: "#555" }}>
              {rating} Stars
            </Typography>
          </Box>

          {/* Price */}
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
            }}
          >
            ${Number(product_price).toFixed(2)}
          </Typography>

          {/* Quantity Controller, Add to Cart, and Favorite Button */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ width: "60px" }}
              inputProps={{ min: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart()}
            >
              {cartButton_description}
            </Button>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              color="secondary"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          {/* Leave a Review Button */}
<Box sx={{ textAlign: "center", mt: 2 }}>
  <Button variant="outlined" color="secondary">
    {reviewButton_description}
  </Button>
</Box>
        </Box>
      </Box>

      {/* Related Items Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Related Items
        </Typography>
        <Grid container spacing={4}>
          {relatedItems.map((item) => {
            const imageUrl = item.product_logo?.url
            ? item.product_logo.url.startsWith("http")
              ? item.product_logo.url
              : `${API_URL}${item.product_logo.url}`
            : null;
            return (
  
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductCard product={item} imageUrl={imageUrl} />
            </Grid>
)})}
  </Grid>
      </Box>
    </Container>
  );
}