"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import ProductCards from "../ProductCards";
import { Box } from "@mui/system";
import LoadingSpinner from "../LoadingSpinner";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => setProducts(res.data.data?.Products || null))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!products) return <p>No Product section found.</p>;

  return (
    <Box>
      <ProductCards products={products} apiUrl={API_URL} />
    </Box>
  );
}
