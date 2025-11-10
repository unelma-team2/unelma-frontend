"use client";

import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 4,
        borderTop: 1,
        borderColor: "divider",
        color: "text.secondary",
        fontSize: "0.9rem",
      }}
    >
      © {new Date().getFullYear()} Unelma Platforms. All rights reserved.
    </Box>
  );
}
