"use client"

import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default function ServiceCard({ service, apiUrl, imageUrl }) {
  const theme = useTheme()

  if (!service) return null

  const image = service.service_logo?.url
  ? service.service_logo.url.startsWith("http")
    ? service.service_logo.url
    : `${apiUrl}${service.service_logo.url}`
  : null;


  return (
    <Card
      sx={{
        width: 300,
        height: 520,
        p: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: `-8px -6px 0px  ${theme.palette.section.services.main}`, 
        transition: "transform 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `-10px -8px 0px  ${theme.palette.section.services.vibrant}`,
          transition: "transform 0.25s ease",
        },

        /* Sync hover effects */
        "&:hover .iconCircle": {
          transform: "scale(1.08)",
          boxShadow: `inset -4px -3px 0px ${theme.palette.section.services.vibrant}`,
        },

        "&:hover .serviceTitle": {
          transform: "scale(1.05)",
          color: theme.palette.primary.main,
          
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Icon circle — clickable */}
        <Link href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
          <Box
            className="iconCircle"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: theme.palette.section.services.soft,
              border: theme.mixins.borderStyle,
              boxShadow: `-4px -3px 0px ${theme.palette.section.services.main}`,
              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              mt: 1,
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
            className="serviceTitle"
            sx={{
              ...theme.typography.bodyFontTitle_M_Card,
              my: 2,
              color: theme.palette.primary.main,
              transition: "transform 0.25s ease, color 0.25s ease",
              cursor: "pointer",
            }}
          >
            {service.service_name || service.title}
          </Typography>
        </Link>

        {/* Description */}
        <Typography sx={{ ...theme.typography.bodyFont_M, textAlign: "justify",  color: theme.palette.primary.main, mb: 3 }}>
          {service.short_description || service.description}
        </Typography>

        {/* Button — quote */}
        <Button
          href={`/services/${service.slug}`}
          sx={{
            mt: "auto",
            alignSelf: "center",
            px: 1.5,
            py: 0.8,
            fontSize: 14,
             "&:hover": {
            color: theme.palette.primary.main,
          }}}
        >
          More Details
        </Button>
      </CardContent>
    </Card>
  )
}
