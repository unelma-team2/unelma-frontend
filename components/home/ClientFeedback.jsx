"use client";

import Image from "next/image";
import { Box, Typography, Paper, Avatar, IconButton, useTheme } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import theme from "@/theme";

const feedbacks = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewer: "Reviewer Name",
    avatar: "/images/avatars/avatar1.png",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    reviewer: "Reviewer Name",
    avatar: "images/avatars/avatar2.png",
  },
  {
    id: 3,
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    reviewer: "Reviewer Name",
    avatar: "/images/avatars/avatar3.png",
  },
];

function FeedbackCard({ text, reviewer, avatar }) {
  const theme = useTheme();
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
        {text}
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
          src={avatar}
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
          {reviewer}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function ClientFeedback() {
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
        {feedbacks.map((fb) => (
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
