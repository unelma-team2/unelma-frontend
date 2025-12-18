"use client"

import { useEffect, useState } from "react"
import { Box, IconButton, Fade } from "@mui/material"
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded"

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Fade in={visible}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 40 },
          right: { xs: 20, md: 40 },
          zIndex: 9999,
        }}
      >
        <IconButton onClick={scrollToTop} color="arrowButton" aria-label="Back to top">
          <ArrowCircleUpRoundedIcon sx={{ fontSize: 72 }} />
        </IconButton>
      </Box>
    </Fade>
  )
}
