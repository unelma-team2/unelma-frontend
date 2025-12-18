"use client"

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material"
import NextLink from "next/link"
import Image from "next/image"

export default function HeroSection({ heroSection, imageUrl }) {
  const theme = useTheme()

  if (!imageUrl || typeof imageUrl !== "function") {
    console.error("[v0] imageUrl is not a function:", imageUrl)
    return null
  }

  const {
    hero_title,
    hero_description1,
    hero_description2,
    hero_link,
    hero_link_description,
    hero_image_top,
    hero_image_bottom,
  } = heroSection || {}

  const topImageUrl = imageUrl(hero_image_top) || "/images/home/hero/hero_top_smaller.png"
  const bottomImageUrl = imageUrl(hero_image_bottom) || "/images/home/hero/hero_background.png"

  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        position: "relative",
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
          src={bottomImageUrl || "/placeholder.svg"}
          alt="Hero background"
          width={1600}
          height={900}
          sizes="100vw"
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
          src={topImageUrl || "/placeholder.svg"}
          alt="Overlay graphic"
          width={500}
          height={500}
          sizes="(max-width: 600px) 55vw, (max-width: 960px) 30vw, 30vw"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/** ---------------- TITLE (LEFT SIDE ON DESKTOP, CENTERED ON MOBILE) ---------------- */}
      <Typography
        sx={{
          ...theme.typography.headingFont_XL_Hero,
          position: "absolute",
          top: { xs: "42%", sm: "65%", md: "71%" },
          left: { xs: "50%", md: "5%" },
          transform: { xs: "translateX(-50%)", md: "none" },
          zIndex: 4,
          width: { xs: "90%", sm: "65%", md: "60%" },
          textAlign: { xs: "center", sm: "left", md: "left" },
          color: "#ef2d53",
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
            ...theme.typography.bodyFont_M,
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
            ...theme.typography.bodyFont_M,
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
            color: theme.palette.section.services.main,
            fontSize: { xs: 16, sm: 18, md: 20 },
            fontWeight: 700,
            display: "inline-flex",
            alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
            textAlign: { xs: "left", sm: "left", md: "center" },
            gap: 0.5,
            "&:hover": {
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
