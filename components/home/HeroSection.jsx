"use client";

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

export default function HeroSection({ heroSection }) {
  const theme = useTheme();

  const {
    hero_title,
    hero_description1,
    hero_description2,
    hero_link,
    hero_link_description,
  } = heroSection || {};

  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        ml: "-50vw",
        minHeight: 600, 
        //overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/** ---------------- FULL-WIDTH BACKGROUND IMAGE (RELATIVE) ---------------- */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          zIndex: 1,
          WebkitMaskImage: "linear-gradient(to bottom, black 43%, transparent 68%)",
            maskImage: "linear-gradient(to bottom, black 43%, transparent 68%)",
          
        }}
      >
        <Image
          src="/images/home/hero/spot-valley.png"
          alt="Hero background"
          width={1600}
          height={900}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </Box>

      {/** ---------------- TOP IMAGE (ABSOLUTE, ON TOP OF BACKGROUND) ---------------- */}
      <Box
        sx={{
          position: "absolute",
          top: "2%",     
          left: "36%",    
          width: { xs: "40%", md: "30%" }, // size of the floating image
          zIndex: 3,
        }}
      >
        <Image
          src="/images/home/hero/cloud_mod.png" 
          alt="Overlay graphic"
          width={500}
          height={500}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/** ---------------- TITLE ---------------- */}
      <Typography
        variant="hero"
        sx={{
          position: "absolute",
          top: "55%",
          right: { xs: 16, md: 0 },
          zIndex: 4,
          width: { xs: "90%", md: "60%" },
          textAlign: "right",
          color: theme.palette.primary.violet,
          //fontSize: 122,
          pr: { xs: 0, md: 4 },
          mr: { xs: 0, md: 17 },
        }}
      >
        {hero_title}
      </Typography>

      {/** ---------------- DESCRIPTION ---------------- */}
      <Box
        sx={{
          position: "absolute",
          top: "82%",
          right: { xs: 16, md: 0 },
          width: { xs: "90%", md: "30%" },
          zIndex: 4,
          textAlign: "right",
          pr: { xs: 0, md: 4 },
          mr: { xs: 0, md: 17 },
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.3,
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
            lineHeight: 1.3,
            color: theme.palette.text.primary,
            textAlign: "justify",
          }}
        >
          {hero_description2}
        </Typography>

        <MUILink
          component={NextLink}
          href={hero_link || "#"}
          underline="none"
          sx={{
            mt: 1,
            color: theme.palette.primary.blue1 || theme.palette.primary.main,
            fontSize: 18,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
              transition: "transform 0.25s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              cursor: "pointer",
                            }
          }}
        >
          {hero_link_description} →
        </MUILink>
      </Box>
    </Box>
  );
}
