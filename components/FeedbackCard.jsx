"use client"

import { Card, Box, Typography, Avatar, useTheme } from "@mui/material"
import Image from "next/image"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

const PLACEHOLDER_AVATARS = [
  "/images/feedback/avatar1.png",
  "/images/feedback/avatar2.png",
  "/images/feedback/avatar3.png",
]

// Simple hash function to get consistent avatar for same name
const getPlaceholderAvatar = (name) => {
  if (!name) return PLACEHOLDER_AVATARS[0]

  // Create a simple hash from the name for consistency
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % PLACEHOLDER_AVATARS.length
  return PLACEHOLDER_AVATARS[index]
}

export default function FeedbackCard({ name, message, avatar }) {
  const theme = useTheme()

  const avatarUrl = avatar?.url
    ? avatar.url.startsWith("http")
      ? avatar.url
      : `${API_URL}${avatar.url}`
    : getPlaceholderAvatar(name)

  return (
    <Card
      sx={{
        p: 4,
        width: 300,
        height: 450,
        flex: "0 0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: `-8px -6px 0px  ${theme.palette.section.feedback.main}`, 
        mt: 2,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `-4px -2px 0px  ${theme.palette.section.feedback.main}, 
        -10px -6px 0px  ${theme.palette.section.feedback.vibrant}`,
        },

        "&:hover .avatarCircle": {
          transform: "scale(1.08)",
          boxShadow: `-4px -4px 0px  ${theme.palette.section.feedback.vibrant}, 
            -2px -2px 0px  ${theme.palette.section.feedback.main},`,
        },

        "&:hover .feedbackName": {
          transform: "scale(1.05)",
          color: theme.palette.primary.blue1,
        },
      }}
    >
      {/* Quote Image */}
      <Box
        sx={{
          mx: "auto",
          mb: 3,
          width: 100,
          height: 100,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image src="/images/feedback/quote2.png" alt="quote" width={100} height={100} style={{ objectFit: "cover" }} />
      </Box>

      {/* Message */}
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          overflow: "auto",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            ...theme.typography.bodyFont_M,
            textAlign: "justify",
          }}
        >
          {message}
        </Typography>
      </Box>

      {/* Footer: Avatar + Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Avatar
          className="avatarCircle"
          src={avatarUrl}
          sx={{
            width: 55,
            height: 55,
            mr: 2,
            border: theme.mixins.borderStyle,
            borderRadius: "50%",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
        />
        <Typography
          className="feedbackName"
          sx={{
            ...theme.typography.bodyFontTitle_S,
            fontWeight: 600,
            transition: "transform 0.25s ease, color 0.25s ease",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Card>
  )
}
