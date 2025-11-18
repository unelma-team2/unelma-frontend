"use client";

import { Box, Typography, useTheme, Link as MUILink } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.default,
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 14 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 6, md: 0 },
        }}
      >
        <Box
          sx={{
            flex: 0.95,
            display: "flex",
            justifyContent: "center",
            maxWidth: { md: 820 },
            transform: { md: "translateX(40px)" },
          }}
        >
          <Image
            src="/images/homepage-hero/home-hero.png"
            alt="Software Development Illustration"
            width={600}
            height={600}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </Box>

        <Box sx={{ flex: 1.05 }}>
          <Box
            sx={{
              maxWidth: 560,
              ml: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              textAlign: "right",
              height: { xs: "auto", md: 600 },
              mt: { xs: 4, md: 8 },
              transform: { md: "translateX(-96px)" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: "2.25rem", md: "3.5rem", lg: "4.5rem" },
                lineHeight: 1.02,
              }}
            >
              Cutting-edge <br />
              Software <br />
              Development.
            </Typography>

            <Box sx={{ maxWidth: 380, ml: "auto", mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: theme.palette.text.secondary,
                  fontSize: 18,
                  lineHeight: 1.55,
                  textAlign: "justify",
                }}
              >
                Unelma Platforms is a global software development company
                operating across Asia, the EU, and North America. We specialize
                in cutting-edge, business-specific software solutions and expert
                IT consulting services.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: theme.palette.text.secondary,
                  fontSize: 18,
                  lineHeight: 1.55,
                  textAlign: "justify",
                }}
              >
                Our team builds custom applications, web platforms, and APIs
                that empower organizations in education, healthcare, and
                business to harness the power of the cloud, streamline
                operations, and boost customer engagement.
              </Typography>

              <MUILink
                component={NextLink}
                href="/about"
                underline="none"
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 1,
                  cursor: "pointer",
                }}
              >
                Learn more about Unelma Platforms →
              </MUILink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
