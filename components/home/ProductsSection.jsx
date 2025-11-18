"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme
} from "@mui/material";

export default function ProductsSection() {
  const theme = useTheme();

  const cardSx = {
    height: "100%",
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "20px",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const imageContainerSx = {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "#f0faff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 4,
    px: 3,
    height: 250,
  };

  const imageSx = {
    width: "auto",
    height: "200px",
    objectFit: "contain",
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: theme.palette.background,
        py: { xs: 12, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="left"
          sx={{
            mb: 10,
            fontSize: { xs: "2.35rem", md: theme.typography.h2.fontSize },
          }}
        >
          Our Products
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 18,
            justifyItems: "center",
          }}
        >
          {/* --- Card 1: UnelmaMail --- */}
          <Card sx={cardSx}>
            <Box sx={imageContainerSx}>
              <Box
                component="img"
                src="/images/homepage-products/unelmamail.png"
                alt="UnelmaMail illustration"
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.700" : "#cffafe",
                py: 2,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                UnelmaMail
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4C4C4C",
                  lineHeight: 1.6,
                  textAlign: "left",
                  minHeight: 120,
                }}
              >
                Experience the future of email marketing with UnelmaMail, the
                world's first AI-powered email marketing platform. Offering
                user-friendly and efficient solutions, UnelmaMail revolutionizes
                the way businesses engage in email marketing strategies for
                ultimate growth and expansion.
              </Typography>

              <Button
                component="a"
                href="/products"
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  px: 4,
                  py: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.700" : "grey.900",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                  },
                }}
              >
                BUY ONLINE
              </Button>
            </Box>
          </Card>

          {/* --- Card 2: UnelmaCRM --- */}
          <Card sx={cardSx}>
            <Box sx={imageContainerSx}>
              <Box
                component="img"
                src="/images/homepage-products/unelmacrm.png"
                alt="UnelmaCRM cover"
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.700" : "#cffafe",
                py: 2,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                UnelmaCRM
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4C4C4C",
                  lineHeight: 1.6,
                  textAlign: "left",
                  minHeight: 120,
                }}
              >
                When you choose UnelmaCRM, you choose a comprehensive CRM
                solution that offers 1 year of full support, maintenance,
                hosting, SaaS, top-notch security, and bug fixes.
              </Typography>

              <Button
                component="a"
                href="/products"
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  px: 4,
                  py: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.700" : "grey.900",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                  },
                }}
              >
                BUY ONLINE
              </Button>
            </Box>
          </Card>

          {/* --- Card 3: UnelmaCloud --- */}
          <Card sx={cardSx}>
            <Box sx={imageContainerSx}>
              <Box
                component="img"
                src="/images/homepage-products/unelmacloud.png"
                alt="UnelmaCloud badge"
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.700" : "#cffafe",
                py: 2,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                UnelmaCloud
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4C4C4C",
                  lineHeight: 1.6,
                  textAlign: "left",
                  minHeight: 120,
                }}
              >
                With UnelmaCloud, we offer more than just storage space. Our
                product comes with a comprehensive package that includes one
                year of full support, maintenance, and security, along with free
                bug fixes from our experienced team of developers.
              </Typography>

              <Button
                component="a"
                href="/products"
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  px: 4,
                  py: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.700" : "grey.900",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                  },
                }}
              >
                BUY ONLINE
              </Button>
            </Box>
          </Card>

          {/* --- Card 4: Open-Source --- */}
          <Card sx={cardSx}>
            <Box sx={imageContainerSx}>
              <Box
                component="img"
                src="/images/homepage-products/opensourcesoftware.png"
                alt="Open-source logo"
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.700" : "#cffafe",
                py: 2,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Open-Source Software
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4C4C4C",
                  lineHeight: 1.6,
                  textAlign: "left",
                  minHeight: 120,
                }}
              >
                Unelma Platforms brings to you UnelmaBrowser and
                Unelma-Code Translator — innovative software designed for
                optimized user experience. With open-source access, full
                support, maintenance, and security provisions, we ensure a
                smooth, secure, and efficient digital journey.
              </Typography>

              <Button
                component="a"
                href="/products"
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  px: 4,
                  py: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.700" : "grey.900",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                  },
                }}
              >
                BUY ONLINE
              </Button>
            </Box>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}