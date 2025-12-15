"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";
import Carousel from "../Carousel.jsx";
import ProductCards from "../ProductCard.jsx";

export default function Products( { products, API_URL }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //const [products, setProducts] = useState([]);
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(true);

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/home?populate[Products][populate]=*`)
//       .then((res) => setProducts(res.data.data?.Products || []))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error.message}</p>;
  if (!products.length) return <p>No products found.</p>;

  const headerHeight = 180;

  return (
    <Box sx={{ width: "100%", mt: 16 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleLeft,
              boxShadow: `10px -8px 0px ${theme.palette.background.lightOrange}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "32pt", sm: "36pt", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "left" },
              color: theme.palette.text.primary,
              marginLeft: { md: "150px" },
            }}
          >
            Our Products
          </Typography>
        </Box>

        {/* RIGHT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxRight,
              boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightOrange}`,
          }}
        />

        {/* OPTIONAL BOTTOM LINE */}
        <Box
          sx={{
            ...theme.mixins.bottomLineRight,
          }}
        />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
     
          <Carousel
            items={products}
            renderItem={(product) => <ProductCards product={product} apiUrl={API_URL} />}
          />
      </Box>
    </Box>
  );
}
