"use client"
import { useEffect, useState, use } from "react"
import axios from "axios"
import Image from "next/image"
import { Box, Button, Typography, IconButton, Grid, Card, CardContent, useTheme, Rating, Stack } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useFavorites } from "@/app/context/FavoritesContext"
import Link from "next/link"
import ServicesSinglePageHero from "@/components/services/ServicesSinglePageHero"
import ServiceCard from "@/components/ServiceCard"
import BackToTopButton from "@/components/BackToTopButton"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ServicePage({ params }) {
  const resolvedParams = use(params)
  const { serviceSlug } = resolvedParams
  const { isFavorite, toggleFavorite } = useFavorites()
  const theme = useTheme()
  const [serviceData, setServiceData] = useState(null)
  const [relatedServices, setRelatedServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(0)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    if (!serviceSlug) return
    axios
      .get(`${API_URL}/api/service-page?populate[ServiceBannerDection][populate]=*&populate[all_services][populate]=*`)
      .then((res) => {
        const allServices = res.data?.data?.all_services || []
        const service = allServices.find((item) => item.slug === serviceSlug)
        setServiceData(service || null)

        const relatedSrvices = allServices.filter((item) => item.slug !== serviceSlug)

        const getRandomItems = (items, count) => {
          const shuffled = [...items].sort(() => 0.5 - Math.random())
          return shuffled.slice(0, count)
        }

        setRelatedServices(getRandomItems(relatedSrvices, 3))
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL, serviceSlug])

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

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Box sx={{ mx: { xs: 2, sm: 4, md: "150px" }, py: 6 }}>
        <Typography sx={{ ...theme.typography.headingFont_M, color: "error" }}>
          Failed to load service. Please try again.
        </Typography>
      </Box>
    )
  }

  if (!serviceData) {
    return (
      <Box sx={{ mx: { xs: 2, sm: 4, md: "150px" }, py: 6 }}>
        <Typography sx={{ ...theme.typography.bodyFontTitle_L }}>Service not found.</Typography>
        <Button component={Link} href="/products?tab=services" sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Box>
    )
  }

  const {
    service_name,
    service_category,
    short_description,
    long_description,
    service_logo,
    service_image,
    PricingPlan,
    WhatServiceOffer,
    WhatServiceOffer_Points,
    WhyChooseService,
    WhyChooseService_Points,
    WhoServiceFor,
    WhoServiceFor_Points,
    GetStarted,
    ServiceLink,
  } = serviceData

  const {
    quoteButton_link,
    quoteButton_description,
    messageButton_link,
    messageButton_description,
    feedbackButton_link,
    feedbackButton_description,
  } = ServiceLink || {}

  return (
    <>
      <ServicesSinglePageHero />
      <Box
        sx={{
          mx: { xs: 2, sm: 4, md: "150px" },
          py: 6,
        }}
      >
        <Typography sx={{ ...theme.typography.bodyFontTitle_L, mb: 6 }}>
          <Link
            href="/products?tab=services"
            style={{ color: theme.palette.section.products.main, textDecoration: "none" }}
          >
            Services
          </Link>
          {" > "} {service_name}
        </Typography>

        <Grid container spacing={4}>
          {/* Left: Service Image Card */}
          <Grid item xs={12} md={7}>
            <Card>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 500 },
                  overflow: "hidden",
                }}
              >
                <Image
                  src={imageUrl(service_image) || "/placeholder.svg"}
                  alt={service_name}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
            </Card>

            <Card sx={{ mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ ...theme.typography.headingFont_S, mb: 3 }}>Service Details</Typography>

                {long_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 3, whiteSpace: "pre-line" }}>
                    {long_description}
                  </Typography>
                )}

                {WhatServiceOffer?.serviceOffer_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {WhatServiceOffer.serviceOffer_title}
                  </Typography>
                )}

                {WhatServiceOffer?.serviceOffer_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 2, whiteSpace: "pre-line" }}>
                    {WhatServiceOffer.serviceOffer_description}
                  </Typography>
                )}

                {WhatServiceOffer_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        {item.serviceOfferPoints_title}:
                      </Box>
                      <Box component="span">{item.serviceOfferPoints_description}</Box>
                    </Typography>
                  </Box>
                ))}

                {WhyChooseService?.chooseService_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {WhyChooseService.chooseService_title}
                  </Typography>
                )}

                {WhyChooseService_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                        {item.serviceChoosePoints_title}
                      </Box>
                      <Box component="span">{item.chooseServicePoints_description}</Box>
                    </Typography>
                  </Box>
                ))}

                {WhoServiceFor?.serviceFor_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {WhoServiceFor.serviceFor_title}
                  </Typography>
                )}

                {WhoServiceFor?.serviceFor_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 2, whiteSpace: "pre-line" }}>
                    {WhoServiceFor.serviceFor_description}
                  </Typography>
                )}

                {WhoServiceFor_Points?.map((item) => (
                  <Box key={item.id} sx={{ mb: 1 }}>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>
                      • {item.serviceForPoints_description}
                    </Typography>
                  </Box>
                ))}

                {GetStarted?.getStarted_title && (
                  <Typography sx={{ ...theme.typography.bodyFontTitle_L, mt: 4, mb: 2 }}>
                    {GetStarted.getStarted_title}
                  </Typography>
                )}

                {GetStarted?.getStarted_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 2, whiteSpace: "pre-line" }}>
                    {GetStarted.getStarted_description}
                  </Typography>
                )}
              </CardContent>
            </Card>

            {PricingPlan && (
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ ...theme.typography.headingFont_S, mb: 4 }}>Pricing Plans</Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ ...theme.typography.bodyFontTitle_L, mb: 3 }}>
                          {PricingPlan.businessPlan_name}
                        </Typography>

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                          {PricingPlan.businessPlan_details.map((detail, index) => (
                            <Typography sx={{ ...theme.typography.bodyFont_M }} key={index}>
                              {detail}
                            </Typography>
                          ))}
                        </Stack>

                        <Button fullWidth variant="contained">
                          Order Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ ...theme.typography.bodyFontTitle_L, mb: 3 }}>
                          {PricingPlan.professionalPlan_name}
                        </Typography>

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                          {PricingPlan.professionalPlan_description.map((detail, index) => (
                            <Typography sx={{ ...theme.typography.bodyFont_M }} key={index}>
                              {detail}
                            </Typography>
                          ))}
                        </Stack>

                        <Button fullWidth variant="contained">
                          Order Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Right: Logo and Service Info Card */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 90,
                }}
              >
                <Image
                  src={imageUrl(service_logo) || "/placeholder.svg"}
                  alt={`${service_name} Logo`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>

            <Typography
              sx={{
                ...theme.typography.bodyFont_M,
                textAlign: "right",
                mb: 3,
                color: theme.palette.text.secondary,
              }}
            >
              {service_category || service_name}
            </Typography>

            <Card>
              <CardContent sx={{ p: 4 }}>
                {/* Service Name */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <Typography sx={{ ...theme.typography.headingFont_S }}>{service_name}</Typography>
                  <IconButton onClick={() => toggleFavorite(serviceData, "service")} aria-label="toggle-favourite">
                    {isFavorite(serviceData, "service") ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                {/* Short Description */}
                {short_description && (
                  <Typography sx={{ ...theme.typography.bodyFont_M, mb: 3 }}>{short_description}</Typography>
                )}

                {/* Interested Label */}
                <Typography
                  sx={{
                    ...theme.typography.bodyFontTitle_S,
                    mb: 2,
                  }}
                >
                  Interested?
                </Typography>

                {/* Action Buttons */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    href={`/contact?contactType=Price%20quote%20request&service=${encodeURIComponent(service_name)}`}
                  >
                    {quoteButton_description || "Request a Quote"}
                  </Button>

                  <Typography sx={{ ...theme.typography.bodyFont_M, textAlign: "center", fontWeight: 700 }}>
                    or
                  </Typography>

                  <Button fullWidth variant="contained" component={Link} href="/contact">
                    {messageButton_description || "Ask a Question"}
                  </Button>
                </Stack>

                {/* Star Rating */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, my: 3 }}>
                  <Rating value={rating} size="large" onChange={(e, val) => setRating(val)} />
                  <Typography sx={{ ...theme.typography.bodyFont_S }}>({rating || 0})</Typography>
                </Box>

                {/* Leave a Review Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  href={`/contact?contactType=Feedback%2Freview&service=${encodeURIComponent(service_name)}`}
                >
                  {feedbackButton_description || "Leave a Review"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography sx={{ ...theme.typography.headingFont_S, mb: 4 }}>Related Services</Typography>
            <Grid container spacing={4}>
              {relatedServices.map((item) => {
                const logoUrl = item.service_logo?.url
                  ? item.service_logo.url.startsWith("http")
                    ? item.service_logo.url
                    : `${API_URL}${item.service_logo.url}`
                  : null
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ServiceCard service={item} imageUrl={logoUrl} />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}
      </Box>
      <BackToTopButton />
    </>
  )
}
