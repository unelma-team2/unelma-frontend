"use client";

import { useEffect, useState } from "react";
import { IconButton, Box, Fade, useTheme } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
    const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // Show after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={visible}>
      <Box
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 9999,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            stroke: "white",
            width: 55,
            height: 55,
            borderRadius: "50%",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            "&:hover": { bgcolor: "#9D00A0", transform: "scale(1.1)" },
          }}
        >
          <ArrowUpward sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </Fade>
  );
}
