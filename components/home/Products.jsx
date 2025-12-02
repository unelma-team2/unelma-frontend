"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import ProductCards from "../ProductCards.jsx";
import ArrowButtons from "../ArrowButtons.jsx";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";
import Carousel from "../Carousel.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => setProducts(res.data.data?.Products || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!products?.length) return <p>No products found.</p>;

  const visibleCount = 3;

  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const visibleProducts = Array.from({ length: visibleCount }).map(
    (_, i) => products[(index + i) % products.length]
  );

  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h2"
          align="left"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Our Products
        </Typography>


<Carousel
  items={products}
  renderItem={(product) => <ProductCards product={product} apiUrl={API_URL} />}
/>

      </Box>
    </Box>
  );
}
