"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";
import Carousel from "../Carousel.jsx";
import ServiceCard from "@/components/ServiceCard.jsx";

export default function Services({ services, API_URL }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //const [services, setServices] = useState([]);
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(true);

    
  //const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/api/home?populate[Services][populate]=*`)
  //     .then((res) => setServices(res.data.data?.Services || []))
  //     .catch((err) => setError(err))
  //     .finally(() => setLoading(false));
  // }, [API_URL]);

  // if (loading) return <LoadingSpinner />;
  // if (error) return <p>Error: {error.message}</p>;
  if (!services.length) return <p>No services found.</p>;

  const headerHeight = 180;
  //const headerRadius = 120;

  return (
    <Box sx={{ width: "100%",
    // mt: 8 
     }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
            boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightYellow}`,
          }}
        />

        {/* RIGHT WHITE CURVED PANEL */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
             boxShadow: `-10px -8px 0px ${theme.palette.background.lightYellow}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "32pt", sm: "36pt", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "right" },
              color: theme.palette.text.primary,
              //marginRight: { md: "120px"}
            }}
          >
            Our Services
          </Typography>
        </Box>

        {/* OPTIONAL TOP BORDER EXTENSION */}
        <Box
          sx={{
            ...theme.mixins.bottomLineLeft,
           //  boxShadow: `-10px -8px 0px ${theme.palette.primary.yellow}`,
          }}
        />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          //mt: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
        {/* MOBILE — Carousel */}
        {isMobile && (
          <Carousel
            items={services}
            renderItem={(service) => <ServiceCard service={service} apiUrl={API_URL} />}
          />
        )}

        {/* DESKTOP — Grid */}
        {!isMobile && (
          <Grid container spacing={8} justifyContent="center">
            {services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ServiceCard service={service} apiUrl={API_URL} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
