"use client";

import { useParams } from "next/navigation";
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
} from "@mui/material";
import Link from "next/link";

const toSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => {
        const services = res.data?.data?.Services || [];
        const found = services.find(
          (item) =>
            item.slug === serviceSlug || toSlug(item.title) === serviceSlug
        );
        setService(found || null);
        setRelatedServices(
          services
            .filter(
              (item) =>
                item !== found &&
                (item.slug || toSlug(item.title)) !== serviceSlug
            )
            .slice(0, 3)
        );
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL, serviceSlug]);

  const imageUrl = useMemo(() => {
    if (!service?.image?.url) return null;
    return service.image.url.startsWith("http")
      ? service.image.url
      : `${API_URL}${service.image.url}`;
  }, [API_URL, service]);

  const shortText =
    service?.shortDescription ||
    service?.description ||
    "short service text here";

  const category = service?.category || "category";

  const description =
    service?.description ||
    "UnelmaCloud — a secure, intuitive cloud-storage & file-sharing platform by Unelma Platforms. Easily store, manage and share files from anywhere — with generous free space, reliable security, and professional support included.";

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

  if (!service) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h6">We could not find this service.</Typography>
        <Button component={Link} href="/services" sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 8 }}>
        Services &gt; {service.title}
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
              src="/images/products/unelmamail-image.png"
              alt={service.title}
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
              {shortText}
            </Typography>

            <Chip
              label={category}
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
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              This is the all-in-one cloud storage and file-sharing solution
              from Unelma Platforms that gives you a flexible, secure home for
              all your files. Whether for personal use, team collaboration or
              business workflows, UnelmaCloud makes file management simple,
              safe, and scalable. What UnelmaCloud offers Universal file storage
              & sharing — upload virtually any file type (documents, images,
              videos, archives, etc.), organize in folders, drag-and-drop for
              ease, and share with colleagues or friends via secure links.
              Built-in file preview & management tools — preview files without
              needing to download; mark favorites, move or delete items, and
              search across the entire storage through an intuitive dashboard.
              Flexible access from anywhere — access your files from any device
              with internet connection; ideal for remote teams, multi-device
              users, or people on the go. Free storage tier available —
              registered users get free storage space (historically 5 GB at
              launch) to get started, making it a risk-free option to test or
              use for casual needs. Scalable plans for businesses — for heavy or
              enterprise usage, UnelmaCloud provides paid tiers under a SaaS
              model, offering expanded storage and business-grade reliability.
              Professional support, maintenance & security included — with each
              subscription you get one year of full support, maintenance,
              security updates and bug fixes from Unelma Platforms’ experienced
              developer team. Who is UnelmaCloud for? UnelmaCloud is perfect
              for: Individuals wanting secure, easy-to-use cloud storage for
              personal documents, photos, media or backups. Teams or small
              businesses needing shared storage and file-sharing for
              collaboration, document storage, or project management.
              Enterprises seeking a SaaS-based cloud storage solution with
              professional support, scalability, and data security. With
              UnelmaCloud, you get more than just “somewhere to store files.”
              You get a full-featured, secure, and user-friendly cloud platform
              — backed by professional maintenance and support — designed to
              grow with you, whether you're managing personal files or business
              data.
            </Typography>
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
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, alignSelf: "flex-start" }}
            >
              {service.title}
            </Typography>

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
                Request A Quote
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
                Ask Us Anything
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
              Leave a Review
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Related Items
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {relatedServices.map((service, index) => {
            const imageUrl = service.image?.url
              ? service.image.url.startsWith("http")
                ? service.image.url
                : `${API_URL}${service.image.url}`
              : null;

            const slug = service.slug || toSlug(service.title);

            return (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component={Link}
                  href={`/services/${slug}`}
                  sx={{
                    width: 345,
                    height: 450,
                    p: 2,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid #000",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      border: "2px solid #2F2E2E",
                      overflow: "hidden",
                    }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        width={70}
                        height={70}
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No image
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="h4" sx={{ my: 2.5 }}>
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      mb: 3,
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Button
                    sx={{
                      mt: "auto",
                      alignSelf: "center",
                      px: 1.5,
                      py: 0.5,
                      fontSize: 14,
                      borderRadius: "999px",
                    }}
                  >
                    Request a Quote
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
