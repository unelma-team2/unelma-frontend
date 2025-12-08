"use client";

import { IconButton, Box, useTheme } from "@mui/material";
import Image from "next/image";

export default function SocialButtons() {
  const theme = useTheme();

  const items = [
    { href: "https://www.linkedin.com/company/unelma-platforms", img: "/images/logos/logo-linkedin.svg", alt: "LinkedIn" },
    { href: "https://x.com/unelmaplatforms", img: "/images/logos/logo-x.png", alt: "X" },
    { href: "https://www.facebook.com/unelmaplatforms", img: "/images/logos/logo-facebook.svg", alt: "Facebook" }
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, mb: { xs: 3, md: 0 } }}>
      {items.map((item) => (
        <IconButton
          key={item.alt}
          component="a"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.lightRed,
            overflow: "hidden",
            padding: 0,
           boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",
          transition: "0.25s ease",

          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
            backgroundColor: theme.palette.primary.red,
            transform: "scale(1.1)",
             cursor: "pointer",
          },
          }}
        >
          <Image
            src={item.img}
            alt={item.alt}
            width={36}
            height={36}
            style={{ objectFit: "contain" }}
          />
        </IconButton>
      ))}
    </Box>
  );
}
