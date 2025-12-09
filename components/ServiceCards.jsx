"use client";

import { Box, Button, Grid, Card, CardContent, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCards({ services = [], apiUrl = "" }) {
  const theme = useTheme();

  const toSlug = (value = "") =>
    value
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <Grid container spacing={8} justifyContent="center">
      {services.map((service, index) => {
        const imageUrl = service.image?.url
          ? service.image.url.startsWith("http")
            ? service.image.url
            : `${apiUrl}${service.image.url}`
          : null;

        const slug = service.slug || toSlug(service.title);

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              component={Link}
              href={`/services/${slug}`}
              sx={{
                width: 345,
                height: 450,
                p: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                  transform: "translateY(-4px)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.lightMint,
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
                  variant="body14reg"
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
                  }}
                >
                  Request a Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
