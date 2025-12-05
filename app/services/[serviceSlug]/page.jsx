"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import ProductsSinglePageHero from "@/components/products/ProductsSinglePageHero";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCards from "@/components/ServiceCards";

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const router = useRouter();

  const [serviceData, setServiceData] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [rating, setRating] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    if (!serviceSlug) return;

    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => {
        const allServices = res.data.data?.Services || [];
        const current = allServices.find((item) => item.slug === serviceSlug);

        setServiceData(
          current || {
            title: "Cloud Services",
            shortDescription: "short service text here",
            description:
              "Meet our Cloud Services — scalable, secure, and managed solutions tailored for modern businesses.",
            image: {
              url: "/images/home/services/icons8-cloud-100.png",
            },
            category: "Cloud Services",
          }
        );

        // Related services: pick others excluding current slug
        const otherServices = allServices.filter(
          (svc) => svc.slug && svc.slug !== serviceSlug
        );

        const pickServices = (items, count) => {
          if (!items || items.length === 0) return [];
          const shuffled = [...items].sort(() => 0.5 - Math.random());

          if (shuffled.length >= count) {
            return shuffled.slice(0, count);
          }

          // If fewer than requested, repeat from the start to always show count
          const padded = [...shuffled];
          while (padded.length < count) {
            padded.push(shuffled[padded.length % shuffled.length]);
          }
          return padded.slice(0, count);
        };

        // Prefer other services; if none, fall back to any services (including current)
        const pool =
          otherServices.length > 0 ? otherServices : allServices || [];
        setRelatedServices(pickServices(pool, 3));
      })
      .catch((err) => console.error("Error fetching service page data:", err));
  }, [API_URL, serviceSlug]);

  if (!serviceData) {
    return null;
  }

  const imageUrl = serviceData.image?.url
    ? serviceData.image.url.startsWith("http")
      ? serviceData.image.url
      : `${API_URL}${serviceData.image.url}`
    : "/images/home/services/icons8-cloud-100.png";

  const shortSummary =
    serviceData.shortDescription ||
    (serviceData.description
      ? serviceData.description.slice(0, 200)
      : "Learn more about this service.");

  const handleGetQuote = () => {
    router.push("/contact"); // assumes the quote form is on the contact page
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <ProductsSinglePageHero />

      {/* Breadcrumb */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
          Services {">"} {serviceData.title}
        </Typography>
      </Box>

      {/* Service Details */}
      <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
        {/* Service Illustration and Detailed Description (Left) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Main Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={imageUrl}
              alt={serviceData.title}
              width={665}
              height={401}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Detailed Description */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#555", whiteSpace: "pre-line" }}
            >
              {serviceData.description || "service description text here"}
            </Typography>
          </Box>
        </Box>

        {/* Sidebar with short description and quote CTA (Right) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Short description box */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              p: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#555", mb: 2, fontWeight: 500 }}
            >
              {shortSummary}
            </Typography>

            {serviceData.category && (
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  px: 3,
                  py: 0.5,
                }}
              >
                {serviceData.category}
              </Button>
            )}
          </Box>

          {/* Quote & rating box */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {serviceData.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#555", mb: 1 }}
            >
              Interested?
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleGetQuote}
              sx={{ textTransform: "none", mb: 1 }}
            >
              Request a Quote
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "#555", my: 1 }}
            >
              or
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleGetQuote}
              sx={{ textTransform: "none" }}
            >
              Ask Us Anything
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Rating
                name="service-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
              <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                {rating || 0} / 5 (0)
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="outlined" color="secondary" sx={{ textTransform: "none" }}>
                Leave a Review
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Related Items Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Related Services
        </Typography>
        {relatedServices?.length ? (
          <ServiceCards services={relatedServices} apiUrl={API_URL} />
        ) : (
          <Typography variant="body2" sx={{ color: "#555" }}>
            No related services found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}


