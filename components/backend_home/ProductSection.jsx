"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsSection() {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
    const API_URL ="http://localhost:1337";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => setProducts(res.data.data?.Products || null))
      .catch((err) => setError(err))
  }, [API_URL]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (!products) return <p>No Product section found.</p>;
  
  const { image, title, description, link, link_description } = products;

  const cardSx = {
    height: "100%",
    border: "2px solid black",
    borderRadius: "20px",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const imageContainerSx = {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "#f0faff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 4,
    px: 3,
    height: 250,
  };

  const imageSx = {
    width: "auto",
    height: "200px",
    objectFit: "contain",
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: theme.palette.background,
        py: { xs: 12, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="left"
          sx={{
            mb: 10,
            fontSize: { xs: "2.35rem", md: theme.typography.h2.fontSize },
          }}
        >
          Our Products
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 18,
            justifyItems: "center",
          }}
        >
         
          {products.map((product, i) => {

            const imageUrl = product.image?.url
                ? product.image.url.startsWith("http")
                ? product.image.url
                : `${API_URL}${product.image.url}`
                : null;

         return (
          <Card sx={cardSx} key={i}>
            <Box sx={imageContainerSx} >
              <Box
                component="img"
                src={imageUrl}
                alt={product.title}
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.700" : "#cffafe",
                py: 2,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                {product.title}
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4C4C4C",
                  lineHeight: 1.6,
                  textAlign: "left",
                  minHeight: 120,
                }}
              >
                {product.description}
              </Typography>

              <Button
                component="a"
                href={product.link || "/products"}
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  px: 4,
                  py: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.700" : "grey.900",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                  },
                }}
              >
                {product.link_description}
              </Button>
            </Box>
          </Card>

    )})}
        </Grid>
      </Container>
    </Box>
  );
}