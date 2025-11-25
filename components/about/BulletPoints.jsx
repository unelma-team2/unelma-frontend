"use client";

import { Box, Typography } from "@mui/material";

export default function BulletPoints({ text, gradient }) {
  return (
    <Box
      sx={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        background: gradient,
        //position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        //alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        mb: 4,
        paddingLeft: 4,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        width={"500px"}
      >
        {text}
      </Typography>
    </Box>
  );
}
