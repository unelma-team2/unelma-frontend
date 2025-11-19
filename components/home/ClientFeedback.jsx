"use client";

import Image from "next/image";
import { Box, Typography, Paper, Avatar, IconButton, useTheme } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import theme from "@/theme";
import { useEffect, useState } from "react";
import axios from "axios";

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

function FeedbackCard({ name, message, avatar }) {
  const theme = useTheme();

  const avatarUrl = avatar?.url
    ? avatar.url.startsWith("http")
        ? avatar.url
            : `${API_URL}${avatar.url}`
    : "/images/avatars/default.png"; 

  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: 300,
        height: 400,
        flex: "0 0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          mb: 2,
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.darkMint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        <Image
          src="/images/icons/icons8-quote-96.png"
          alt="quote"
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          fontSize: 14,
          textAlign: "justify",
        }}
      >
        {message}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 2,
          ml: 1,
          height: 50,
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 50,
            height: 50,
            mr: 2,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function ClientFeedback() {

    const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);


useEffect(() => {
  axios
    .get(`${API_URL}/api/feedback-forms?populate=*`)
    .then((res) => setFeedback(res.data.data))
    .catch((err) => setError(err))
}, [API_URL]);

if (error) return <p>Error: {error.message}</p>;
if (!feedback) return <p>No Feedback found.</p>;

const { name, message, avatar, id } = feedback;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.background.lightMint,
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        borderRadius: "0 0 48px 48px",
        mt: { xs: 6, md: 10 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.75rem" },
          mb: 6,
        }}
      >
        Feedback From
        <br />
        Our Clients
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 10,
          justifyContent: "center",
        }}
      >
        {feedback.map((fb) => (
          <FeedbackCard key={fb.id} {...fb} />
        ))}
      </Box>

     <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3 }}>
      <IconButton
        aria-label="previous"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.background.darkMint,
          },
        }}
      >
        <ArrowCircleLeftIcon sx={{ fontSize: 48 }} />
      </IconButton>

      <IconButton
        aria-label="next"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.background.darkMint,
          },
        }}
      >
        <ArrowCircleRightIcon sx={{ fontSize: 48 }} />
      </IconButton>
  </Box>
    </Box>
  );
}
