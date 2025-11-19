"use client";

import { useEffect, useState } from "react";
import { IconButton, Box, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

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
            bgcolor: "#9D00A0",
            color: "white",
            width: 55,
            height: 55,
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            "&:hover": { bgcolor: "#6c006e" },
            borderRadius: "50%",
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </Fade>
  );
}
