// 

"use client";

import { Box, Button, Card, CardContent, Typography, useTheme, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/app/context/FavoritesContext";
import { useAuth } from "@/app/context/AuthContext";

export default function ServiceCard({ service, apiUrl, imageUrl }) {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  if (!service) return null;

  const image = service.image?.url
    ? service.image.url.startsWith("http")
      ? service.image.url
      : `${apiUrl}${service.image.url}`
    : null;

  const isLiked = isFavorite(service?.id, "service");

  return (
    <Card
      sx={{
        width: 300,
        height: 500,
        position: "relative",
        p: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: `-10px -8px 0px ${theme.palette.primary.yellow}`,
      }}
    >
      {user ? (
        <Tooltip title={isLiked ? "Remove from favourites" : "Save to favourites"}>
          <IconButton
            onClick={() => toggleFavorite(service, "service")}
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
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Icon circle */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: theme.palette.background.lightYellow,
            border: "2px solid " + theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            overflow: "hidden"
          }}
        >
          
            <Image
              src={imageUrl ? imageUrl : image}
              alt={service.service_name || service.title}
              width={70}
              height={70}
              style={{ objectFit: "contain" }}
            />
         
        </Box>

        {/* Title */}
        <Link href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
  <Typography
    variant="h4"
    sx={{
      my: 2,
      color: "inherit",
      transition: "transform 0.3s ease, color 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        color: theme.palette.primary.main,
      },
      cursor: "pointer",
    }}
  >
    {service.service_name || service.title}
  </Typography>
</Link>

        {/* Description */}
        <Typography variant="body14reg" sx={{ textAlign: "justify", mb: 3 }}>
          {service.short_description || service.description}
        </Typography>

        {/* Button */}
        <Button
          href={`/contact?contactType=Price%20quote%20request&service=${encodeURIComponent(service.service_name)}`}
          sx={{ mt: "auto", alignSelf: "center", px: 1.5, py: 0.5, fontSize: 14 }}
        >
          Request a Quote
        </Button>

      </CardContent>
    </Card>
  );
}
