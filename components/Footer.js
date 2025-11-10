"use client";

import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 4,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        color: (theme) => theme.palette.text.secondary,
        fontSize: "0.9rem",
      }}
    >
      © {new Date().getFullYear()} Unelma Platforms. All rights reserved.
    </Box>
  );
}
