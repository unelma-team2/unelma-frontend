"use client"

import AboutPageHero from "@/components/about/AboutPageHero"
import BulletPoints from "@/components/about/BulletPoints"
import AboutImageList from "@/components/about/AboutImageList"
import { Box, Container, Typography, useTheme, useMediaQuery } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function AboutPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const [bannerSection, setBannerSection] = useState(null)
  const [welcomeSection, setWelcomeSection] = useState(null)
  const [bulletPoints, setBulletPoints] = useState(null)
  const [philosophySection, setPhilosophySection] = useState(null)
  const [networkSection, setNetworkSection] = useState(null)
  const [innovationSection, setInnovationSection] = useState(null)
  const [promiseSection, setPromiseSection] = useState(null)
  const [imageList, setImageList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        // defer to microtask to avoid synchronous setState in effect body
        await Promise.resolve()
        if (!mounted) return

        setLoading(true)

        const res = await axios.get(
          `${API_URL}/api/about?populate[AboutBannerSection][populate]=*&populate[WelcomeSection]=*&populate[BulletPoints]=*&populate[PhilosophySection]=*&populate[NetworkSection][populate]=*&populate[InnovationSection]=*&populate[PromiseSection][populate]=*&populate[AboutImageList][populate]=*`,
        )

        if (!mounted) return
        const data = res.data?.data || {}
        setBannerSection(data.AboutBannerSection || null)
        setWelcomeSection(data.WelcomeSection || null)
        setBulletPoints(data.BulletPoints || null)
        setPhilosophySection(data.PhilosophySection || null)
        setNetworkSection(data.NetworkSection || null)
        setInnovationSection(data.InnovationSection || null)
        setPromiseSection(data.PromiseSection || null)
        setImageList(data.AboutImageList || null)
        if (mounted) setLoading(false)
      } catch (err) {
        console.error(err)
        if (mounted) {
          setError(err)
          setLoading(false)
        }
      }
    })()

    return () => {
      mounted = false
    }
  }, [API_URL])

  if (loading) return <LoadingSpinner />
  if (error) return <Container sx={{ py: 8 }}>Error loading contact page: {error.message}</Container>

  const { banner_description1, banner_description2, banner_description3 } = bannerSection
  const { welcome_title1, welcome_title2, welcome_title3, welcome_description1, welcome_description2 } = welcomeSection
  const { point1, point2, point3, point4 } = bulletPoints
  const { philosophy_title, philosophy_description1, philosophy_description2 } = philosophySection
  const { network_title, network_description1, network_description2, video_image, network_image } = networkSection
  const {
    innovation_title1,
    innovation_title2,
    innovation_description1,
    innovation_description2,
    innovation_description3,
  } = innovationSection
  const { promise_title, promise_description1, promise_description2, promise_description3, promise_image } =
    promiseSection

  const imageUrl = (image) => {
    if (!image) return null
    const img = Array.isArray(image) ? image[0] : image

    if (img?.data?.attributes?.url) {
      const url = img.data.attributes.url
      return url.startsWith("http") ? url : `${API_URL}${url}`
    }

    if (img?.url) {
      return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`
    }

    return null
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, pb: { xs: 16, md: 24 } }}>
      <AboutPageHero bannerSection={bannerSection} imageUrl={imageUrl} />

      <Typography
        sx={{
          ...theme.typography.headingFont_L,
          textAlign: "right",
          mb: { xs: 4, md: 12 },
          color: theme.palette.text.primary,
        }}
      >
        {banner_description1}
        <br />
        {banner_description2}
        <br />
        {banner_description3}
      </Typography>

      {/* MOBILE/TABLET LAYOUT */}
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, sm: 6 } }}>
          <AboutImageList imageUrl={imageUrl} imageList={imageList} />

          <Box>
            <Typography sx={{ ...theme.typography.headingFont_M, mb: 2, color: theme.palette.text.primary }}>
              {welcome_title1}
              <br />
              {welcome_title2}
              <br />
              {welcome_title3}
            </Typography>
            <Typography
              sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
            >
              {welcome_description1}
              <br />
              <br />
              {welcome_description2}
            </Typography>
          </Box>

          <Box>
                <BulletPoints text={point1} backgroundColor={theme.palette.section.feedback.main} />
                <BulletPoints text={point2} backgroundColor={theme.palette.section.blog.main} />
                <BulletPoints text={point3} backgroundColor={theme.palette.section.careers.main} />
                <BulletPoints text={point4} backgroundColor={theme.palette.section.home.main} />
          </Box>

          <Box>
            <Typography sx={{ ...theme.typography.headingFont_M, mb: 4, color: theme.palette.text.primary }}>
              {innovation_title1}
              <br />
              {innovation_title2}
            </Typography>
            <Typography
              sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
            >
              {innovation_description1}
              <br />
              <br />
              {innovation_description2}
              <br />
              <br />
              {innovation_description3}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ ...theme.typography.headingFont_M, mb: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
              {philosophy_title}
            </Typography>
            <Typography
              sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
            >
              {philosophy_description1}
              <br />
              <br />
              {philosophy_description2}
            </Typography>
          </Box>

          {/* <Box
            component="img"
            src={imageUrl(network_image)}
            alt="Global Map"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          /> */}

          <Box>
            <Typography sx={{ ...theme.typography.headingFont_M, mb: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
              {network_title}
            </Typography>
            <Typography
              sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
            >
              {network_description1}
              <br />
              <br />
              {network_description2}
            </Typography>
          </Box>

          <Box
            component="img"
            src={imageUrl(video_image)}
            alt="Team"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />

          <Box>
            <Typography sx={{ ...theme.typography.headingFont_M, mb: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
              {promise_title}
            </Typography>
            <Typography
              sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
            >
              {promise_description1}
              <br />
              <br />
              {promise_description2}
              <br />
              <br />
              {promise_description3}
            </Typography>
          </Box>

          <Box
            component="img"
            src={imageUrl(promise_image)}
            alt="Signature"
            sx={{
              width: { xs: 100, sm: 120 },
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      ) : (
        /* DESKTOP LAYOUT */
        <Box sx={{ display: "flex", position: "relative", gap: 6, minHeight: { md: 2800, lg: 3000 } }}>
          {/* LEFT COLUMN */}
          <Box sx={{ flex: 1, position: "relative" }}>
            {/* Welcome Section */}
            <Box sx={{ position: "absolute", top: { md: 80, lg: 100 }, width: "100%" }}>
              <Typography
                sx={{ ...theme.typography.headingFont_M, mb: { md: 8, lg: 12 }, color: theme.palette.text.primary }}
              >
                {welcome_title1}
                <br />
                {welcome_title2}
                <br />
                {welcome_title3}
              </Typography>
              <Typography
                sx={{
                  ...theme.typography.bodyFont_L,
                  textAlign: "justify",
                  maxWidth: 400,
                  color: theme.palette.text.primary,
                }}
              >
                {welcome_description1}
                <br />
                <br />
                {welcome_description2}
              </Typography>
            </Box>

            {/* Bullet Points */}
            <Box sx={{ position: "absolute", top: { md: 940, lg: 900 }, width: "100%" }}>
                <BulletPoints text={point1} backgroundColor={theme.palette.section.feedback.main} />
                <BulletPoints text={point2} backgroundColor={theme.palette.section.blog.main} />
                <BulletPoints text={point3} backgroundColor={theme.palette.section.careers.main} />
                <BulletPoints text={point4} backgroundColor={theme.palette.section.home.main} />
            </Box>

            {/* Philosophy Section */}
            <Box sx={{ position: "absolute", top: { md: 1400, lg: 1500 }, width: "100%" }}>
              <Typography sx={{ ...theme.typography.headingFont_M, mb: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
                {philosophy_title}
              </Typography>
              <Typography
                sx={{
                  ...theme.typography.bodyFont_L,
                  textAlign: "justify",
                  maxWidth: 400,
                  color: theme.palette.text.primary,
                }}
              >
                {philosophy_description1}
                <br />
                <br />
                {philosophy_description2}
              </Typography>
            </Box>

            {/* Network Section */}
            <Box sx={{ position: "absolute", top: { md: 1900, lg: 2000 }, width: "100%" }}>
              <Typography sx={{ ...theme.typography.headingFont_M, mb: { xs: 2, md: 4 }, color: theme.palette.text.primary }}>
                {network_title}
              </Typography>
              <Typography
                sx={{
                  ...theme.typography.bodyFont_L,
                  textAlign: "justify",
                  maxWidth: 400,
                  color: theme.palette.text.primary,
                }}
              >
                {network_description1}
                <br />
                <br />
                {network_description2}
              </Typography>
            </Box>

            {/* Video Image */}
            <Box sx={{ position: "absolute", top: { md: 2350, lg: 2400 }, width: "100%" }}>
              <Box
                component="img"
                src={imageUrl(video_image)}
                alt="Team"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* RIGHT COLUMN */}
          <Box sx={{ flex: 1, position: "relative" }}>
            {/* Image List */}
            <Box sx={{ position: "absolute", top: 0, right: 0, width: "100%" }}>
              <AboutImageList imageUrl={imageUrl} imageList={imageList} />
            </Box>

            {/* Innovation Section */}
            <Box
              sx={{
                position: "absolute",
                top: { md: 1000, lg: 1100 },
                right: 0,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ maxWidth: 400 }}>
                <Typography
                  sx={{
                    ...theme.typography.headingFont_M,
                    mb: 4,
                    textAlign: "right",
                    color: theme.palette.text.primary,
                  }}
                >
                  {innovation_title1}
                  <br />
                  {innovation_title2}
                </Typography>
                <Typography
                  sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
                >
                  {innovation_description1}
                  <br />
                  <br />
                  {innovation_description2}
                  <br />
                  <br />
                  {innovation_description3}
                </Typography>
              </Box>
            </Box>

            {/* Global Map Image */}
            {/* <Box
              component="img"
              src={imageUrl(network_image)}
              alt="Global Map"
              sx={{
                position: "absolute",
                top: { md: 1800, lg: 1900 },
                width: "100%",
                height: "auto",
                opacity: 0.8,
                objectFit: "cover",
              }}
            /> */}

            {/* Promise Section */}
            <Box
              sx={{
                position: "absolute",
                top: { md: 2350, lg: 2450 },
                right: 0,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ maxWidth: 400, position: "relative" }}>
                <Typography
                  sx={{
                    ...theme.typography.headingFont_M,
                    mb: { xs: 2, md: 4 },
                    textAlign: "right",
                    color: theme.palette.text.primary,
                  }}
                >
                  {promise_title}
                </Typography>
                <Typography
                  sx={{ ...theme.typography.bodyFont_L, textAlign: "justify", color: theme.palette.text.primary }}
                >
                  {promise_description1}
                  <br />
                  <br />
                  {promise_description2}
                  <br />
                  <br />
                  {promise_description3}
                </Typography>
                <Box
                  component="img"
                  src={imageUrl(promise_image)}
                  alt="Signature"
                  sx={{
                    position: "absolute",
                    bottom: { md: "-110px", lg: "-130px" },
                    right: 0,
                    width: { md: 100, lg: 110 },
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  )
}
