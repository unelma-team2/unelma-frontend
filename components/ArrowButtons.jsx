"use client";

import { Box, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTheme } from "@mui/material/styles";
import { ArrowCircleLeftRounded } from "@mui/icons-material";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

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
        <ArrowCircleRightIcon sx={{ fontSize: 72 }} />
      </IconButton>
    </Box>
  );
}
