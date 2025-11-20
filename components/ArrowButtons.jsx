"use client";

import { Box, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useTheme } from "@mui/material/styles";

export default function ArrowButtons({ onPrev, onNext }) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 4 }}>
      <IconButton
        aria-label="previous"
        onClick={onPrev}
        sx={{
          color: theme.palette.primary.main,
          "&:hover": {
            color: "#9D00A0",
            transform: "scale(1.1)",
          },
        }}
      >
        <ArrowCircleLeftIcon sx={{ fontSize: 48 }} />
      </IconButton>

      <IconButton
        aria-label="next"
        onClick={onNext}
        sx={{
          color: theme.palette.primary.main,
          "&:hover": {
            color: "#9D00A0",
            transform: "scale(1.1)",
          },
        }}
      >
        <ArrowCircleRightIcon sx={{ fontSize: 48 }} />
      </IconButton>
    </Box>
  );
}
