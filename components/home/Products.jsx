"use client"
import { Box, Typography, useTheme } from "@mui/material"
import Carousel from "@/components/Carousel.jsx"
import ProductCard from "@/components/ProductCard.jsx"

export default function Products({ products, API_URL }) {
  const theme = useTheme()

  if (!products.length) return <p>No products found.</p>

  const headerHeight = 180

  return (
    <Box sx={{ ...theme.mixins.sectionSpacing, width: "100%" }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleLeft,
            boxShadow: `0px -3px 0px ${theme.palette.section.products.pastel}, 0px -12px 0px ${theme.palette.section.products.main}`,

          }}
        >
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              textAlign: { xs: "center", md: "left" },
              marginLeft: { md: "120px"}
            }}
          >
            Our Products
          </Typography>
        </Box>

        {/* RIGHT DARK BLOCK */}
         <Box
          sx={{
            ...theme.mixins.homeBoxRight,
               boxShadow: `inset 0px -5px 0px ${theme.palette.section.products.pastel}, inset -0px -14px 0px ${theme.palette.section.products.main}`,
          }}
        />


        {/* OPTIONAL BOTTOM LINE */}
        <Box sx={{ ...theme.mixins.bottomLineRight }} />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box sx={{ ...theme.mixins.sectionContentSpacing }}>
        <Carousel items={products} renderItem={(product) => <ProductCard product={product} apiUrl={API_URL} />} />
      </Box>
    </Box>
  )
}
