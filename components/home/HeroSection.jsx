"use client";

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

export default function HeroSection() {
  const theme = useTheme();

  const [heroSection, setHeroSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[HeroSection][populate]=*`)
      .then((res) => setHeroSection(res.data.data?.HeroSection || null))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!heroSection) return <p>No hero section found.</p>;

  const {
    hero_title,
    hero_description1,
    hero_description2,
    hero_image,
    hero_link,
    hero_link_description,
  } = heroSection;

  const imageUrl = hero_image?.url
    ? hero_image.url.startsWith("http")
      ? hero_image.url
      : `${API_URL}${hero_image.url}`
    : "";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        minHeight: 1400,
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* -------------------- HERO IMAGE -------------------- */}
      <Box
        sx={{
          position: "absolute",
          top: 0,           // MOVE FREELY
          left: 0,           // MOVE FREELY
          width: "50%",
          zIndex: 1,
        }}
      >
        <Image
          src={"/images/home/hero/herox.png"}
          alt={hero_title || "Hero Image"}
          width={950}
          height={1174}
          //style={{ width: "100%", height: "auto" }}
          priority
        />
      </Box>

      {/* -------------------- TITLE -------------------- */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "45%",          // MOVE FREELY
          right: 0,         // MOVE FREELY
          zIndex: 2,
         // fontSize: { xs: "2.5rem", md: "4rem", lg: "4.8rem" },
          width: "40%",
          textAlign: "right",
          color: theme.palette.text.primary,
        }}
      >
        {hero_title}
      </Typography>

      {/* -------------------- DESCRIPTION BLOCK -------------------- */}
      <Box
        sx={{
          position: "absolute",
          top: "65%",          // MOVE FREELY
          right: 0,       // MOVE FREELY
          width: "30%",
          zIndex: 2,
          textAlign: "right",
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.30,
            color: theme.palette.text.primary,
            textAlign: "justify",
          }}
        >
          {hero_description1}
        </Typography>

        <Typography
          sx={{
            mb: 2,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.30,
            color: theme.palette.text.primary,
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
            color: theme.palette.primary.blue,
            fontSize: 18,
            fontWeight: 700,
            //color: theme.palette.primary.main,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          {hero_link_description} →
        </MUILink>
      </Box>
    </Box>
  );
}
