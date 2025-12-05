"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import ServiceCards from "@/components/ServiceCards";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ServicesIndexPage() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => setServices(res.data.data?.Services || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 700, textAlign: { xs: "left", md: "left" } }}
        >
          Our Services
        </Typography>
      </Box>

      <ServiceCards services={services} apiUrl={API_URL} />
    </Container>
  );
}


