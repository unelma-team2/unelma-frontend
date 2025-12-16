"use client";

import { Card, Box, Typography, Button, useTheme, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useFavorites } from "@/app/context/FavoritesContext";
import { useAuth } from "@/app/context/AuthContext";

export default function ProductCard({ product, imageUrl , apiUrl}) {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const cardSx = {
    height: 470,
    width: 300,
    position: "relative",
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

  const image = product.image?.url
  ? product.image.url.startsWith("http")
    ? product.image.url
    : `${apiUrl}${product.image.url}`
  : null;

  const isLiked = isFavorite(product?.id, "product");

  return (
    <Card sx={cardSx}>
      {user ? (
        <Tooltip title={isLiked ? "Remove from favourites" : "Save to favourites"}>
          <IconButton
            onClick={() => toggleFavorite(product, "product")}
            sx={{ position: "absolute", top: 12, right: 12, backgroundColor: "#fff" }}
          >
            {isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon sx={{ color: theme.palette.grey[700] }} />
            )}
          </IconButton>
        </Tooltip>
      ) : null}
      <Box sx={imageContainerSx}>
        <Box component="img" src={imageUrl ? imageUrl : image} alt={product.title} sx={imageSx} />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, flexGrow: 1 }}
      >
        {/* Centered Title */}
        <Typography variant="h4" align="center" sx={{ textAlign: "center" }}>
          {product.title || product.product_name}
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
