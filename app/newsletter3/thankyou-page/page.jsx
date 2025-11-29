"use client";

import { Box, Typography, Button } from "@mui/material";

export default function ThankYouPage() {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 3,
        textAlign: "center",
        backgroundColor: "#C1FCFF",
        borderRadius: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#2F2E2E", fontWeight: "bold", mb: 2 }}
      >
        Thank You!
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#555", fontSize: 16, mb: 3 }}
      >
        Your subscription has been confirmed. Please check your email to verify
        your subscription.
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#555", fontSize: 14, mb: 3 }}
      >
        Once you verify your email, you will start receiving updates from us.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2F2E2E",
          color: "#FFFFFF",
          padding: "10px 20px",
          borderRadius: 1,
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#444" },
        }}
        onClick={() => (window.location.href = "/")} // Use window.location.href for navigation
      >
        Continue to Homepage
      </Button>
    </Box>
  );
}