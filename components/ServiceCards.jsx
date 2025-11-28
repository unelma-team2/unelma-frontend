"use client";

import { Box, Button, Grid, Card, CardContent, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export default function ServiceCards({ services = [], apiUrl = "" }) {
  const theme = useTheme();

  const { image, title, description} = services;

  return (
    <Grid container spacing={8} justifyContent="center">
      {services.map((service, index) => {
        const imageUrl = service.image?.url
          ? service.image.url.startsWith("http")
            ? service.image.url
            : `${apiUrl}${service.image.url}`
          : null;

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
            sx={{
                width: 300,
                height: 485,
                p: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
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
                    width: 90,
                    height: 90,
                    minWidth: 90,
                    minHeight: 90,
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
                <Image
                    src={imageUrl}
                    alt={service.title}
                    width={60}
                    height={60}
                    style={{ objectFit: "contain" }}
                />
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
                href="/services"
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
