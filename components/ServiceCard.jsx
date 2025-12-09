// 

"use client";

import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export default function ServiceCard({ service, apiUrl }) {
  const theme = useTheme();

  if (!service) return null;

  const imageUrl = service.image?.url
    ? service.image.url.startsWith("http")
      ? service.image.url
      : `${apiUrl}${service.image.url}`
    : null;

  return (
    <Card
      sx={{
        width: 300,
        height: 500,
        p: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: `-10px -8px 0px ${theme.palette.primary.yellow}`,
      }}
    >
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
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={service.title}
              width={70}
              height={70}
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>

        {/* Title */}
        <Typography variant="h4" sx={{ my: 2 }}>
          {service.title}
        </Typography>

        {/* Description */}
        <Typography variant="body14reg" sx={{ textAlign: "justify", mb: 3 }}>
          {service.description}
        </Typography>

        {/* Button */}
        <Button
          href="/services"
          sx={{ mt: "auto", alignSelf: "center", px: 1.5, py: 0.5, fontSize: 14 }}
        >
          Request a Quote
        </Button>

      </CardContent>
    </Card>
  );
}
