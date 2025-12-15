"use client";

import { useEffect, useState } from "react";
import { IconButton, Box, Fade, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';

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
           
          color="topButton"
          onClick={scrollToTop}
        
        >
          <ArrowCircleUpRoundedIcon sx={{ fontSize: 72 }} />
        </IconButton>
      </Box>
    </Fade>
  );
}
