"use client"

import { Box, IconButton, useTheme } from "@mui/material"
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded"
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded"

export default function ArrowButtons({ onPrev, onNext }) {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: -20, sm: -30, md: -40 }, // reduced negative values to keep buttons visible
          transform: "translateY(-50%)",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        <IconButton onClick={onPrev} color="arrowButton" aria-label="Previous">
          <ArrowCircleLeftRoundedIcon sx={{ fontSize: 72 }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: -20, sm: -30, md: -40 }, // reduced negative values to keep buttons visible
          transform: "translateY(-50%)",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        <IconButton onClick={onNext} color="arrowButton" aria-label="Next">
          <ArrowCircleRightRoundedIcon sx={{ fontSize: 72 }} />
        </IconButton>
      </Box>
    </>
  )
}
