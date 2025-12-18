"use client"

import { Box, Typography, useTheme } from "@mui/material"

export default function BulletPoints({ text, backgroundColor }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 4,
        width: "100%",
        maxWidth: { xs: "100%", md: 500 },
      }}
    >
      <Box
        sx={{
          minWidth: { xs: 50, md: 70 },
          width: { xs: 50, md: 70 },
          height: { xs: 50, md: 70 },
          borderRadius: "50%",
          backgroundColor: backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          flexShrink: 0,
          mr: 3,
        }}
      />
      <Typography
        sx={{
          ...theme.typography.bodyFont_L,
          fontWeight: 700,
          color: theme.palette.text.primary,
          flex: 1,
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: { xs: "calc(100vw - 150px)", md: 430 },
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
