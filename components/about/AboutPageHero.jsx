"use client"

import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Image from "next/image"

export default function AboutPageHero({ bannerSection, imageUrl }) {
  const theme = useTheme()

  if (!bannerSection) return null

  const { banner_title, banner_image } = bannerSection

  console.log("[v0] banner_image:", banner_image)
  const heroImageUrl = imageUrl(banner_image) || "/placeholder.svg?height=500&width=700"
  console.log("[v0] heroImageUrl:", heroImageUrl)

  return (
    <Box
      sx={{
        mx: { xs: 2, md: "150px" },
        my: { xs: 4, md: 8 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 4, md: 8 },
      }}
    >
      {/* Text Content - Left Side */}
      <Box
        sx={{
          flex: { xs: 1, md: "0 1 40%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            ...theme.typography.headingFont_XL_Hero,
            textShadow: `${theme.palette.primary.main} -4px -3px 0px`,
          }}
        >
          {banner_title}
        </Typography>
      </Box>

      {/* Image - Right Side */}
      <Box
        sx={{
          flex: { xs: 1, md: "0 1 55%" },
          width: "100%",
          maxWidth: { xs: "100%", md: "700px" },
          height: { xs: 300, md: 500 },
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Image
          src={heroImageUrl || "/placeholder.svg"}
          alt={banner_title || "About Hero"}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    </Box>
  )
}
