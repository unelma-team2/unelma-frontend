"use client";

import { useEffect, useState } from "react";
import { IconButton, Box, Fade, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); 
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
            bgcolor: theme.palette.primary.violet,
            color: "white",
            width: 55,
            height: 55,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",
          transition: "0.25s ease",

          "&:hover": {
            boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
            backgroundColor: theme.palette.primary.darkViolet,
            transform: "scale(1.1)",
            cursor: "pointer",
          }
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </Fade>
  );
}
