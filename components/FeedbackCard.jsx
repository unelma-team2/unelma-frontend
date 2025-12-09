"use client";

import { Box, Card, CardContent, Typography, Avatar, useTheme } from "@mui/material";
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

export default function FeedbackCard({ name, message, avatar }) {
  const theme = useTheme();

  const avatarUrl = avatar?.url
    ? avatar.url.startsWith("http")
      ? avatar.url
      : `${API_URL}${avatar.url}`
    : "/images/avatars/avatar_placeholder.png";

  return (
    <Card
      sx={{
        p: 4,
        width: 300,
        height: 400,
        flex: "0 0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // border: `2px solid ${theme.palette.primary.main}`,
        //borderRadius: 2,
        //0backgroundColor: theme.palette.background.paper,
        boxShadow: `-10px -8px 0px ${theme.palette.primary.blue}`,
        mt: 2,
      }}
    >
      <CardContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          elevation={0}
          sx={{
            mx: "auto",
            mb: 2,
            width: 70,
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "transparent",
          }}
        >
          <Image
            src="/images/icons/icons8-quote-100_1.png"
            alt="quote"
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: 14,
            textAlign: "justify",
            flexGrow: 1,
          }}
        >
          {message}
        </Typography>
      </CardContent>

      {/* Footer: Avatar + Name */}
      <CardContent
        sx={{
          p: 0,
          mt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 55,
            height: 55,
            mr: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "50%",
          }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
