"use client";

import React from "react";
import { Card, CardMedia, CardContent, Typography, useTheme } from "@mui/material";

export default function WorkProjectCard({ work, API_URL }) {
  const theme = useTheme();

  const imageUrl = work.image?.url
    ? work.image.url.startsWith("http")
      ? work.image.url
      : `${API_URL}${work.image.url}`
    : null;

  return (
    <Card
      key={work.id || work.title}
      sx={{
        mt: 2,
        textAlign: "center",
        border: `2px solid ${theme.palette.primary.main}`,
        //borderRadius: "10px",
        width: 300,
        //boxShadow: 3,
        boxShadow: `-10px -8px 0px ${theme.palette.primary.blue}`,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia component="img" height="335px" image={imageUrl} />
      <CardContent sx={{ background: theme.palette.background.lightMint }}>
        <Typography fontWeight={700} align="center">
          {work.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
