"use client";

import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import theme from "@/theme";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ServicesSection() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    //  const API_URL = "https://localhost:1337";
  

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => setServices(res.data.data?.Services || null))
      .catch((err) => setError(err))
  }, [API_URL]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (!services) return <p>No Services are available.</p>;
  
  const { image, title, description} = services;

  return (
    <Box sx={{ position: "relative", width: "100%", height: "600px", py: 10, zIndex: 1,borderBottom: "2px solid #2F2E2E" }}>
          <Box sx={{ ...theme.mixins.homeBoxLeft, backgroundColor: theme.palette.background.darkMint, borderBottom: "2px solid #2F2E2E", borderRight: "2px solid #2F2E2E" }} />
          <Box sx={{ ...theme.mixins.homeTitleRight, backgroundColor: theme.palette.background.lightMint   }}>
          <Typography
          variant="h2"
          component="h2"
        align="right"
          sx={{ marginRight: "170px", marginY: "4rem" }}>
      
          Our Services
        </Typography>
        </Box>

    <Box sx={{ position: "relative", zIndex: 2, backgroundColor: theme.palette.background.lightMint, py: 28, px: 4 }}>
      <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
        

        <Grid container spacing={8} justifyContent="center">
          {services.map((service, index) => {

            const imageUrl = service.image?.url
                ? service.image.url.startsWith("http")
                ? service.image.url
                : `${API_URL}${service.image.url}`
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
                    height: 320,
                    borderRadius: "10px",
                    p: 2,
                    textAlign: "center",
                    border: "2px solid #2F2E2E",
                    }}
                >
                    <CardContent>
                    <Box
                        sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.background.darkMint,
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
                    width={45}     
                    height={45}    
                    objectFit="contain"
                        />
                    </Box>

                    <Typography variant="h3" sx={{ mb: 2 }}>
                        {service.title}
                    </Typography>

                    <Typography
                        variant="body1"
                        color={theme.palette.text.secondary}
                        sx={{ textAlign: "justify" }}
                    >
                        {service.description}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
          )})}
        </Grid>
      </Box>
    </Box>
    </Box>
  );
}
