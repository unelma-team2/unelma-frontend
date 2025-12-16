"use client";

import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

export default function ArrowButtons({ onPrev, onNext }) {
  const theme = useTheme();

  return (
    <Box sx={{ my: 12, display: "flex", justifyContent: "center", gap: 24 }}>
      <IconButton
        aria-label="previous"
        onClick={onPrev}
        color="arrowButton"
      >
        <ArrowCircleLeftRoundedIcon sx={{ fontSize: 72 }} />
      </IconButton>

      <IconButton
        aria-label="next"
        onClick={onNext}
        color="arrowButton"
      >
        <ArrowCircleRightRoundedIcon sx={{ fontSize: 72 }} />
      </IconButton>
    </Box>
  );
}
