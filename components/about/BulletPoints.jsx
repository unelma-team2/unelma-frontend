"use client";

import { Box, Typography } from "@mui/material";

export default function BulletPoints({ text, backgroundColor }) {
  return (
    <Box
      sx={{
        width: 70,
        height: 70,
        borderRadius: "50%",
      bgcolor: backgroundColor, // <-- important
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
        variant="body14med"
        fontWeight={700}
        width={"430px"}
      >
        {text}
      </Typography>
    </Box>
  );
}
