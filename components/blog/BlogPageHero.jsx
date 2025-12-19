"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function BlogPageHero({ bannerSection, imageUrl }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#ffffff",
        px: { xs: 3, sm: 4, md: 6 },
        py: { xs: 6, md: 8 },
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
        mb: { xs: 6, md: 12 },
        flexDirection: { xs: "column", md: "row" }, // stack on mobile
        gap: { xs: 4, md: 0 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2.25rem", sm: "3.5rem", md: "72pt" }, // responsive sizes
          lineHeight: 1,
          textAlign: { xs: "center", md: "left" },
          flex: { md: 1 },
          ml: { md: "170px", xs: 0 },
        }}
      >
        Blog
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: { xs: 220, sm: 340, md: 592 },
          height: { xs: 220, sm: 340, md: 640 },
          flex: { md: 1 },
          display: "block",
          mx: { xs: "auto", md: 0 },
        }}
      >
        <Image
          src="/images/blog2.png"
          alt="Blog Hero"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Box>
    </Box>
  );
}