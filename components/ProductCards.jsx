"use client";

import { Card, Box, Typography, Button, Grid, useTheme } from "@mui/material";

export default function ProductCards({ products = [], apiUrl = "" }) {
  const theme = useTheme();

  const cardSx = {
    height: 560,
    width: 370,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 2,
    paddingX: 6,
    overflow: "hidden",
  };

  const imageContainerSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    maxHeight: 200,
    maxWidth: 200,
    minHeight: 200,
    minWidth: 200,
    paddingBottom: 4,
  };

  const imageSx = {
    flexGrow: 1,
    width: "100%",
    height: 200,
    borderRadius: 50,
    backgroundColor: "#B7EBEC",
    objectFit: "fill",
    overflow: "hidden",
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 8,
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {products.map((product, i) => {
        const imageUrl = product.image?.url
          ? product.image.url.startsWith("http")
            ? product.image.url
            : `${apiUrl}${product.image.url}`
          : null;

        return (
          <Card sx={cardSx} key={i}>
            <Box sx={imageContainerSx}>
              <Box
                component="img"
                src={imageUrl}
                alt={product.title}
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2.5,
                flexGrow: 1,
              }}
            >
              <Typography variant="h3" align="center">
                {product.title}
              </Typography>

              <Typography
                variant="body14med"
                sx={{
                  lineHeight: 1.2,
                  textAlign: "justify",
                  pb: 2,
                }}
              >
                {product.description}
              </Typography>

              <Button
                href={product.link || "/products"}
                sx={{
                  alignSelf: "center",
                  px: 2,
                  py: 1,
                  fontSize: 15,
                }}
              >
                {product.link_description}
              </Button>
            </Box>
          </Card>
        );
      })}
    </Grid>
  );
}
