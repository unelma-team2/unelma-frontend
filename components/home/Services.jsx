"use client"
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material"
import Carousel from "@/components/Carousel.jsx"
import ServiceCard from "@/components/ServiceCard.jsx"

export default function Services({ services, API_URL }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (!services.length) return <p>No services found.</p>

  const headerHeight = 180

  return (
    <Box sx={{ width: "100%", mt: 0, pt: 0 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
              boxShadow: `inset 0px -8px 0px ${theme.palette.section.services.muted}, inset -2px -2px 0px ${theme.palette.section.services.vibrant}`,
          }}
        />

        {/* RIGHT WHITE CURVED PANEL */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
              boxShadow: `-10px -8px 0px ${theme.palette.section.services.vibrant}, -4px -4px 0px ${theme.palette.section.services.main}`,
          }}
        >
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              textAlign: { xs: "center", md: "right" },
              marginRight: { md: "120px"}
            }}
          >
            Our Services
          </Typography>
        </Box>

        {/* OPTIONAL TOP BORDER EXTENSION */}
        <Box sx={{ ...theme.mixins.bottomLineLeft }} />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box sx={{ ...theme.mixins.sectionContentSpacing }}>
        {/* MOBILE — Carousel */}
        {isMobile && (
          <Carousel items={services} renderItem={(service) => <ServiceCard service={service} apiUrl={API_URL} />} />
        )}

        {/* DESKTOP — Grid */}
        {!isMobile && (
          <Grid container spacing={8} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                <ServiceCard service={service} apiUrl={API_URL} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}
