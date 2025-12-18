"use client"

import { Card, Box, Typography, Button, useTheme } from "@mui/material"
import Link from "next/link"

export default function ProductCard({ product, imageUrl, apiUrl }) {
  const theme = useTheme()

  const image = product.image?.url
    ? product.image.url.startsWith("http")
      ? product.image.url
      : `${apiUrl}${product.image.url}`
    : null

  return (
    <Card
      sx={{
        height: 480,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        px: 4,
        py: 2,
        boxShadow: `-8px -6px 0px  ${theme.palette.section.products.main}`,
        transition: "transform 0.25s ease",
        mt: 2,

        "&:hover": {
          transform: "translateY(-4px)",
            boxShadow: `-10px -8px 0px  ${theme.palette.section.products.vibrant}`,
            transition: "transform 0.25s ease",
        },

        "&:hover .productImage": {
          transform: "scale(1.08)",
          boxShadow: `inset -4px -3px 0px ${theme.palette.section.products.vibrant}`,
        },
        "&:hover .productTitle": {
          transform: "scale(1.05)",
          color: theme.palette.primary.main,
        },
      }}
    >
      {/* Image — clickable */}
      <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
        <Box
          className="productImage"
          sx={{
            width: 158,
            height: 158,
            borderRadius: 50,
            border: theme.mixins.borderStyle,
            boxShadow: `-4px -3px 0px ${theme.palette.section.products.main}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            mb: 2,
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
        >
          <Box
            component="img"
            src={imageUrl ? imageUrl : image}
            alt={product.title}
            sx={{
              maxWidth: "100%",
              height: 160,
              objectFit: "contain",
              p: 0.1,
            }}
          />
        </Box>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: 140, textAlign: "center" }}>
        {/* Title — clickable */}
        <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
          <Typography
            className="productTitle"
            sx={{
              ...theme.typography.bodyFontTitle_M_Card,
              color: "inherit",
              transition: "transform 0.25s ease, color 0.25s ease",
              cursor: "pointer",
            }}
          >
            {product.title || product.product_name}
          </Typography>
        </Link>

        {/* Description */}
        <Typography sx={{ ...theme.typography.bodyFont_M, lineHeight: 1.2, pb: 2 }}>{product.product_type}</Typography>
      </Box>

      <Button href={`/products/${product.slug}`} sx={{ alignSelf: "center", px: 1.5, py: 0.8, fontSize: 14 }}>
        Buy Online
      </Button>
    </Card>
  )
}
