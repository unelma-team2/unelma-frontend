"use client";

import { Card, Box, Typography, Button, useTheme } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product, apiUrl = "" }) {
  const theme = useTheme();

  const cardSx = {
    height: 470,
    width: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 4,
    paddingX: 6,
    overflow: "hidden",
    boxShadow: `-10px -8px 0px ${theme.palette.primary.orange}`,
    mt: 2,
  };

  const imageContainerSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: 160,
    maxHeight: 160,
    maxWidth: 160,
    minHeight: 160,
    minWidth: 160,
    paddingBottom: 6,
    marginBottom: 2,
  };

  const imageSx = {
    flexGrow: 1,
    padding: 0.5,
    maxWidth: "100%",
    height: 160,
    borderRadius: 50,
    objectFit: "contain",
    overflow: "hidden",
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const imageUrl = product.image?.url
    ? product.image.url.startsWith("http")
      ? product.image.url
      : `${apiUrl}${product.image.url}`
    : null;

  return (
    <Card sx={cardSx}>
      <Box sx={imageContainerSx}>
        <Box component="img" src={imageUrl} alt={product.title} sx={imageSx} />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, flexGrow: 1 }}
      >
        {/* Centered Title */}
        <Typography variant="h4" align="center" sx={{ textAlign: "center" }}>
          {product.title}
        </Typography>

        {/* Centered Description */}
        <Typography
          variant="body14reg"
          sx={{
            lineHeight: 1.2,
            textAlign: "center", // Center the description text
            pb: 2,
          }}
        >
          {product.product_type}
        </Typography>
      </Box>

      {/* "Buy Online" Button */}
      <Link href={`/products/${product.slug}`} passHref>
        <Button
          sx={{
            mt: 2,
            alignSelf: "center",
            px: 2,
            py: 1,
            fontSize: 14,
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Buy Online
        </Button>
      </Link>
    </Card>
  );
}
