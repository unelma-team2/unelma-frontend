"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Carousel from "../Carousel.jsx";
import FeedbackCard from "../FeedbackCard.jsx";
import LoadingSpinner from "../LoadingSpinner";

export default function ClientFeedback() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  // Fetch feedback
  useEffect(() => {
    axios
      .get(`${API_URL}/api/feedback-forms?populate=*`)
      .then((res) => setFeedback(res.data.data || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!feedback?.length) return <p>No feedback found.</p>;

  // Header settings
  const headerHeight = 180;

  return (
    <Box sx={{ width: "100%", mt: 16 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleLeft,
            boxShadow: `10px -8px 0px ${theme.palette.background.lightBlue}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "28px", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "left" },
              color: theme.palette.text.primary,
              marginLeft: { md: "170px" },
            }}
          >
            Feedback From
            <br />
            Our Clients
          </Typography>
        </Box>

        {/* RIGHT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxRight,
            boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightBlue}`,
          }}
        />

        {/* OPTIONAL BOTTOM LINE */}
        <Box
          sx={{
            ...theme.mixins.bottomLineRight,
          }}
        />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
        <Carousel
          items={feedback}
          renderItem={(item) => (
            <FeedbackCard
              key={item.id}
              name={item.name}
              message={item.message}
              avatar={item.avatar}
            />
          )}
        />
      </Box>
    </Box>
  );
}