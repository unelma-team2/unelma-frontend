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
            backgroundColor: theme.palette.primary.mint,
            overflow: "hidden",
            padding: 0,
            transition: "0.25s ease",
            "&:hover": {
              transform: "scale(1.1)",
              bgcolor: theme.palette.primary.blue,
              color: "#fff"
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
