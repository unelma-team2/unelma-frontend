"use client";

import { useParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

export default function ProductPage() {
  const { productSlug } = useParams(); // Get the slug from the dynamic route

  // Simulate fetching product data based on slug
  const productData = {
    name: "Example Product",
    description: "This is an example product description.",
    price: "$99.99",
    image: "/products/example-product.png",
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        {productData.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {productData.description}
      </Typography>
      <Typography variant="h4" sx={{ color: "green", mb: 2 }}>
        {productData.price}
      </Typography>
      <img
        src={productData.image}
        alt={productData.name}
        style={{ maxWidth: "100%", marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary">
        Add to Cart
      </Button>
    </Box>
  );
}