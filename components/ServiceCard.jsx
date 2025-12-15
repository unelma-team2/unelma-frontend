"use client";

import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service, apiUrl, imageUrl }) {
  const theme = useTheme();

  if (!service) return null;

  const image = service.image?.url
    ? service.image.url.startsWith("http")
      ? service.image.url
      : `${apiUrl}${service.image.url}`
    : null;

  const quoteHref = `/contact?contactType=Price%20quote%20request&service=${encodeURIComponent(
    service.service_name
  )}`;

  return (
    <Card
      sx={{
        width: 300,
        height: 500,
        p: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: `-10px -8px 0px ${theme.palette.primary.main}`,
        transition: "transform 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
        },

        /* Sync hover effects */
        "&:hover .iconCircle": {
          transform: "scale(1.08)",
          boxShadow: `-5px -4px 0px ${theme.palette.primary.main}`,
        },

        "&:hover .serviceTitle": {
          transform: "scale(1.05)",
          color: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Icon circle — clickable */}
        <Link href={quoteHref} style={{ textDecoration: "none" }}>
          <Box
            className="iconCircle"
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
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
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
        </Link>

        {/* Title — service page */}
        <Link href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            className="serviceTitle"
            sx={{
              my: 2,
              color: "inherit",
              transition: "transform 0.25s ease, color 0.25s ease",
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

        {/* Button — quote */}
        <Button
          href={quoteHref}
          sx={{
            mt: "auto",
            alignSelf: "center",
            px: 1.5,
            py: 0.5,
            fontSize: 14,
          }}
        >
          Request a Quote
        </Button>
      </CardContent>
    </Card>
  );
}
