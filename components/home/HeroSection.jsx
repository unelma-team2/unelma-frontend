"use client"

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material"
import NextLink from "next/link"
import Image from "next/image"

export default function HeroSection({ heroSection }) {
  const theme = useTheme()

  const {
    hero_title,
    hero_description1,
    hero_description2,
    hero_link,
    hero_link_description,
    hero_image_top,
    hero_image_bottom,
  } = heroSection || {}

  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        position: "relative",
        // left: "50%",
        // ml: "-50vw",
        paddingTop: { xs: 8 },
        paddingBottom: { xs: 2, sm: 6, md: 6 },
        minHeight: { xs: 850, sm: 1200, md: 1400, lg: 1400 },
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
          src={hero_image_bottom || "/images/home/hero/hero_background.png"}
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
          top: { xs: "-1%", sm: "2.5%", md: "2%" },
          left: { xs: "23%", sm: "35%", md: "36%" },
          width: { xs: "55%", sm: "30%", md: "30%" },
          zIndex: 3,
        }}
      >
        <Image
          src={hero_image_top || "/images/home/hero/hero_top_smaller.png"}
          alt="Overlay graphic"
          width={500}
          height={500}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/** ---------------- TITLE (LEFT SIDE ON DESKTOP, CENTERED ON MOBILE) ---------------- */}
      <Typography
        sx={{
          ...theme.typography.headingFontHero,
          position: "absolute",
          top: { xs: "42%", sm: "65%", md: "71%" },
          left: { xs: "50%", md: "5%" },
          transform: { xs: "translateX(-50%)", md: "none" },
          zIndex: 4,
          width: { xs: "90%", sm: "65%", md: "60%" },
          textAlign: { xs: "center", sm: "left", md: "left" },
          color: theme.palette.section.about.main,

          pl: { xs: 0, md: 8 },
          ml: { xs: 0, md: 4 },
        }}
      >
        {hero_title}
      </Typography>

      {/** ---------------- DESCRIPTIONS (RIGHT SIDE ON DESKTOP AT SAME HEIGHT, BELOW TITLE ON MOBILE) ---------------- */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "67%", sm: "87%", md: "80%" },
          right: { xs: "50%", md: "5%" },
          transform: { xs: "translateX(50%)", md: "none" },
          width: { xs: "90%", sm: "85%", md: "32%" },
          zIndex: 4,
          textAlign: { xs: "center", md: "left" },
          pr: { xs: 0, md: 8 },
          mr: { xs: 0, md: 4 },
        }}
      >
        <Typography
          sx={{
            ...theme.typography.bodyFontL,
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
            textAlign: "justify",
          }}
        >
          {hero_description1}
        </Typography>

        <Typography
          sx={{
            ...theme.typography.bodyFontL,
            mb: 2,
            fontWeight: 500,
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
            //  color: theme.palette.primary.blue1 || theme.palette.primary.main,
            color: theme.palette.section.services.main,
            fontSize: { xs: 16, sm: 18, md: 20 },
            fontWeight: 700,
            display: "inline-flex",
            alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
            textAlign: { xs: "left", sm: "left", md: "center" },
            gap: 0.5,
            // transition: "transform 0.25s ease",
            "&:hover": {
              //   transform: "scale(1.1)",
              //   cursor: "pointer",
              color: theme.palette.section.shopOrder.main,
            },
          }}
        >
          {hero_link_description} →
        </MUILink>
      </Box>
    </Box>
  )
}
