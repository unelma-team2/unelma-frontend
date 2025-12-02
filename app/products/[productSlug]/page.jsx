"use client";

import { useParams } from "next/navigation";
import { Box, Container, Typography, Button, Rating, IconButton, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductsSinglePageHero from "@/components/products/ProductsSinglePageHero";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { productSlug } = useParams(); // Get the slug from the dynamic route

  const productData = {
    name: "UnelmaMail",
    shortDescription: "Revolutionize email marketing with AI-powered campaigns.",
    detailedDescription:
      "Unleash the full potential of your email marketing with UnelmaMail! Harness the power of AI to secure the edge your business needs in today's competitive marketing landscape. Our platform is packed with advanced features, user-friendly design, and unprecedented efficiencies to support your unique business needs.",
    price: "$49.90",
    image: "/images/products/unelmamail-image.png",
    logo: "/images/products/unelmamail-logo.png",
    category: "Enterprise Software",
    gallery: [
      "/images/products/unelmamail-image.png",
      "/images/products/unelmamail-image2.png",
    ],
  };

  const [rating, setRating] = useState(0); 

  const [quantity, setQuantity] = useState(1); 
  // State to manage favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  // State to manage the currently selected image
  const [selectedImage, setSelectedImage] = useState(productData.image);

  const [relatedItems, setRelatedItems] = useState([]); // State for related items

  useEffect(() => {
    // Mock data for related items
    const mockRelatedItems = [
      { id: 1, name: "Related Product 1", image: "/images/products/related-item1.png" },
      { id: 2, name: "Related Product 2", image: "/images/products/related-item2.png" },
      { id: 3, name: "Related Product 3", image: "/images/products/related-item3.png" },
    ];

    // Simulate API call delay
    setTimeout(() => {
      setRelatedItems(mockRelatedItems); // Use mock data
    }, 500); // Simulate a delay of 500ms
  }, []);
  const handleRatingChange = (newValue) => {
    setRating(newValue);
    console.log("Rating submitted:", newValue);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${productData.name} to the cart.`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${productData.name} is ${!isFavorite ? "added to" : "removed from"} favorites.`);
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
          Products {'>'} {productData.name}
        </Typography>
      </Box>

      {/* Product Details */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Product Image and Detailed Description (Left) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Main Image */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image
              src={selectedImage}
              alt={productData.name}
              width={665}
              height={401}
              style={{ borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </Box>

          {/* Detailed Description */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Product Description
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              {productData.detailedDescription}
            </Typography>
          </Box>

          {/* Gallery Section */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {productData.gallery.slice(0, 2).map((image, index) => (
              <Box
                key={index}
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  boxShadow: selectedImage === image ? "0 0 10px #000" : "none",
                }}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Product Logo, Short Description, and Pricing (Right) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Product Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
            <Image
              src={productData.logo}
              alt={`${productData.name} Logo`}
              width={301}
              height={47}
            />
          </Box>

          {/* Short Description */}
          <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
            {productData.shortDescription}
          </Typography>

          {/* Category Box */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000",
              borderRadius: "30px",
              padding: "4px 16px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#000",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              mb: 2,
            }}
          >
            {productData.category}
          </Box>

          {/* Product Name */}
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
            {productData.name}
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
          <Typography variant="h4" sx={{ color: "black", fontWeight: "bold", textAlign: "center", mb: 2 }}>
            {productData.price}
          </Typography>

          {/* Quantity Controller, Add to Cart, and Favorite Button */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", mt: 2 }}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              sx={{ width: "60px" }}
              inputProps={{ min: 1 }}
            />
            <Button variant="contained" color="primary" onClick={() => console.log(`Added ${quantity} to cart`)}>
              Add to Cart
            </Button>
            <IconButton onClick={() => setIsFavorite(!isFavorite)} color="secondary">
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          {/* Leave a Review Button */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="outlined" color="secondary">
              Leave a Review
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Related Items Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Related Items
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {relatedItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 2,
                textAlign: "center",
                width: "150px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}