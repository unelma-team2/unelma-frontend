"use client";

import React from "react"; 
import ServiceCards from "@/components/ServiceCards.jsx";  
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";


export default function Services() {
  const theme = useTheme();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => setServices(res.data.data?.Services || null))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!services) return <p>No Service section found.</p>;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.lightMint, py: 8, 
    //px: 4
     }}>
      <Box sx={{ 
      maxWidth: "1200px", 
       // mx: "auto" 
        }}>
        <Typography
          variant="h2"
          align="right"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Our Services
        </Typography>

        <ServiceCards services={services} apiUrl={API_URL} />
      </Box>
    </Box>
  );
}
