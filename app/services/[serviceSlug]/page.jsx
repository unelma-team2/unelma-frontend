"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "@/app/context/FavoritesContext";
import Link from "next/link";
import ServicesSinglePageHero from "@/components/services/ServicesSinglePageHero";
import ServiceCard from "@/components/ServiceCard";

const toSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    if (!serviceSlug) return;
    axios
      .get(`${API_URL}/api/service-page?populate[ServiceBannerDection][populate]=*&populate[all_services][populate]=*`)
      .then((res) => {
        const allServices = res.data?.data?.all_services || [];

        const service = allServices.find(
          (item) =>
            item.slug === serviceSlug );
        setServiceData(service || null);

         // Filter related products (exclude current product)
         const relatedSrvices = allServices.filter(
          (item) => item.slug !== serviceSlug
        );

        const getRandomItems = (items, count) => {
          const shuffled = [...items].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };

        setRelatedServices(getRandomItems(relatedSrvices,3));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL, serviceSlug]);

  const {
    service_name,
    service_category,
    slug,
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
  } = serviceData || {};

  const {
    quoteButton_link,
    quoteButton_description,
    messageButton_link,
    messageButton_description,
    feedbackButton_link,
    feedbackButton_description,
  } = ServiceLink || {};

  // const imageUrl = useMemo(() => {
  //   if (!service?.image?.url) return null;
  //   return service.image.url.startsWith("http")
  //     ? service.image.url
  //     : `${API_URL}${service.image.url}`;
  // }, [API_URL, service]);

  const imageUrl = (image) => {
    if (!image) return null;

    const img = Array.isArray(image) ? image[0] : image;

    if (img?.data?.attributes?.url) {
      const url = img.data.attributes.url;
      return url.startsWith("http") ? url : `${API_URL}${url}`;
    }

    if (img?.url) {
      return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`;
    }

    return null;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h6">Loading services...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h6" color="error">
          Failed to load services. Please try again.
        </Typography>
      </Container>
    );
  }

  if (!serviceData) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h6">We could not find this service.</Typography>
        <Button component={Link} href="/products" sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <ServicesSinglePageHero />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 8 }}>
          <Link
            href="/products?tab=services"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Services
          </Link>
          {" > "} {service_name}
        </Typography>

        <Grid
        container
        spacing={3}
        sx={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              border: "2px solid #000",
              borderRadius: "8px",
              overflow: "hidden",
              height: 450,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={imageUrl(service_image)}
              alt={service_name}
              width={300}
              height={200}
              style={{ width: "60%", height: "100%", objectFit: "cover" }}
              priority
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              border: "2px solid #000",
              borderRadius: "8px",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {short_description}
            </Typography>

            <Chip
              label={service_category ? service_category : service_name}
              sx={{
                borderRadius: "999px",
                border: "2px solid #000",
                fontWeight: 700,
                alignSelf: "flex-start",
                px: 2,
                bgcolor: "transparent",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              border: "2px solid #000",
              borderRadius: "8px",
              p: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* LONG DESCRIPTION */}
            {long_description && (
              <Typography
                variant="body1"
                sx={{ color: "#555", whiteSpace: "pre-line" }}
              >
                {long_description}
              </Typography>
            )}

            {/* WHAT SERVICE OFFERS */}
            {WhatServiceOffer?.serviceOffer_title && (
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                {WhatServiceOffer?.serviceOffer_title}
              </Typography>
            )}

          {WhatServiceOffer?.serviceOffer_description && (
              <Typography
                variant="body1"
                sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}
              >
                {WhatServiceOffer.serviceOffer_description}
              </Typography>
            )}

            {WhatServiceOffer_Points?.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                    •
                  </Box>
                  <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                    {item.serviceOfferPoints_title}:
                  </Box>
                  <Box component="span">
                    {item.serviceOfferPoints_description}
                  </Box>
                </Typography>
              </Box>
            ))}

            {/* WHY CHOOSE SERVICE */}
            {WhyChooseService?.chooseService_title && (
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                {WhyChooseService?.chooseService_title}
              </Typography>
            )}

            {WhyChooseService_Points?.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                    •
                  </Box>
                  <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                    {item.serviceChoosePoints_title}
                  </Box>
                  <Box component="span">
                    {item.chooseServicePoints_description}
                  </Box>
                </Typography>
              </Box>
            ))}

            {/* WHO SERVICE IS FOR */}
            {WhoServiceFor?.serviceFor_title && (
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                {WhoServiceFor.serviceFor_title}
              </Typography>
            )}

            {WhoServiceFor?.serviceFor_description && (
              <Typography
                variant="body1"
                sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}
              >
                {WhoServiceFor.serviceFor_description}
              </Typography>
            )}

            {WhoServiceFor_Points?.map((item) => (
              <Box key={item.id} sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  • {item.serviceForPoints_description}
                </Typography>
              </Box>
            ))}

            {GetStarted?.getStarted_title && (
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}
              >
                {GetStarted.getStarted_title}
              </Typography>
            )}


          {GetStarted?.getStarted_description && (
              <Typography
                variant="body1"
                sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}
              >
                {GetStarted.getStarted_description}
              </Typography>
            )}
{/* 
            {ServiceLink?.link_description && (
              <Typography
                variant="body1"
                sx={{ color: "#555", whiteSpace: "pre-line", mb: 2 }}
              >
                {ServiceLink.link_description}
              </Typography>
            )} */}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              border: "2px solid #000",
              borderRadius: "8px",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{service_name}</Typography>
              <IconButton
                sx={{ backgroundColor: "#fff" }}
                aria-label="toggle-favourite"
                onClick={() => toggleFavorite(serviceData, "service")}
              >
                {isFavorite(serviceData, "service") ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              sx={{ fontWeight: 600, alignSelf: "flex-start" }}
            >
              Interested?
            </Typography>

            <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 300 }}>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                href={`/contact?contactType=Price%20quote%20request&service=${encodeURIComponent(service_name)}`}
                sx={{
                  borderRadius: "999px",
                  bgcolor: "#000",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#333",
                  },
                }}
              >
                {quoteButton_description || "Request a Quote"}
              </Button>

              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                or
              </Typography>

              <Button
                fullWidth
                variant="contained"
                component={Link}
                href="/contact"
                sx={{
                  borderRadius: "999px",
                  bgcolor: "#000",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#333",
                  },
                }}
              >
                {messageButton_description || "Ask a Question"}
              </Button>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Rating
                value={rating}
                size="small"
                onChange={(e, val) => setRating(val)}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#000",
                  },
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                ({rating || 0})
              </Typography>
            </Box>

            <Button
              variant="contained"
              component={Link}
  href={`/contact?contactType=Feedback%2Freview&service=${encodeURIComponent(service_name)}`}
              sx={{
                width: "100%",
                maxWidth: 300,
                borderRadius: "999px",
                bgcolor: "#000",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                mt: "auto",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              {feedbackButton_description || "Leave a Review"}
            </Button>
          </Box>
        </Grid>
      </Grid>

{PricingPlan && (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 6 }}>
      Pricing Plans
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {/* Business Plan */}
      <Grid item xs={12} sm={6} md={5}>
        <Box
          sx={{
            border: "2px solid #000000ff",
            width: 400, // increased width
            maxWidth: "100%", // responsive for smaller screens
            borderRadius: "8px",
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {PricingPlan.businessPlan_name}
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 3, flexGrow: 1 }}>
            {PricingPlan.businessPlan_details.map((detail, index) => (
              <Typography variant="body2" key={index}>
                {detail}
              </Typography>
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "999px",
              bgcolor: "#90F0FF",
              color: "#000000ff",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#5662e3ff",
              },
            }}
          >
            Order Now
          </Button>
        </Box>
      </Grid>

      {/* Professional Plan */}
      <Grid item xs={12} sm={6} md={5}>
        <Box
          sx={{
            border: "2px solid #000000ff",
            width: 400, // increased width
            maxWidth: "100%", // responsive
            borderRadius: "8px",
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {PricingPlan.professionalPlan_name}
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 3, flexGrow: 1 }}>
            {PricingPlan.professionalPlan_description.map((detail, index) => (
              <Typography variant="body2" key={index}>
                {detail}
              </Typography>
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "999px",
              bgcolor: "#90F0FF",
              color: "#000000ff",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#5662e3ff",
              },
            }}
          >
            Order Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
)}

      {/* Related Items Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Related Items
              </Typography>
              <Grid container spacing={4}>
                {relatedServices.map((item) => {
                  const imageUrl = item.service_logo?.url
                    ? item.service_logo.url.startsWith("http")
                      ? item.service_logo.url
                      : `${API_URL}${item.service_logo.url}`
                    : null;
                  return (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <ServiceCard service={item} imageUrl={imageUrl} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>


    </Container>
    </>
  );
}
