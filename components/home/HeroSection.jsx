"use client";

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const theme = useTheme();

    const [heroSection, setHeroSection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
      //const API_URL = "http://localhost:1337";
    

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[HeroSection][populate]=*`)
      .then((res) => setHeroSection(res.data.data?.HeroSection || null))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <p>Loading hero section...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!heroSection) return <p>No hero section found.</p>;

  const { hero_title, hero_description1, hero_description2, hero_image, hero_link, hero_link_description } = heroSection;
  const imageUrl = hero_image?.url
            ? hero_image.url.startsWith("http")
              ? hero_image.url
              : `${API_URL}${hero_image.url}`
            : "";

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.default,
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 14 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 6, md: 0 },
        }}
      >
        <Box
          sx={{
            flex: 0.95,
            display: "flex",
            justifyContent: "center",
            maxWidth: { md: 820 },
            transform: { md: "translateX(40px)" },
          }}
        >
          <Image
            src={imageUrl}
            alt={hero_title || "Hero Image"}
            width={600}
            height={600}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </Box>

        <Box sx={{ flex: 1.05 }}>
          <Box
            sx={{
              maxWidth: 560,
              ml: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              textAlign: "right",
              height: { xs: "auto", md: 600 },
              mt: { xs: 4, md: 8 },
              transform: { md: "translateX(-96px)" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: "2.25rem", md: "3.5rem", lg: "4.5rem" },
                lineHeight: 1.02,
              }}
            >
             {hero_title}
            </Typography>

            <Box sx={{ maxWidth: 380, ml: "auto", mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: theme.palette.text.secondary,
                  fontSize: 18,
                  lineHeight: 1.55,
                  textAlign: "justify",
                }}
              >
              {hero_description1}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: theme.palette.text.secondary,
                  fontSize: 18,
                  lineHeight: 1.55,
                  textAlign: "justify",
                }}
              >
              {hero_description2}
              </Typography>

              <MUILink
                component={NextLink}
                href={hero_link}
                underline="none"
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 1,
                  cursor: "pointer",
                }}
              >
                {hero_link_description} →
              </MUILink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
