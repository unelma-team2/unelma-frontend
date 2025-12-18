"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, useTheme } from "@mui/material"
import Carousel from "@/components/Carousel.jsx"
import FeedbackCard from "@/components/FeedbackCard.jsx"

export default function ClientFeedback() {
  const theme = useTheme()

  const [feedback, setFeedback] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${API_URL}/api/feedback-forms?populate=*`)
      .then((res) => setFeedback(res.data.data || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL])

  //if (loading) return <LoadingSpinner />
  //if (error) return <p>Error: {error.message}</p>
  if (!feedback?.length) return <p>No feedback found.</p>

  const headerHeight = 180

  return (
    <Box sx={{ ...theme.mixins.sectionSpacing, width: "100%" }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
          //  pt: { xs: 2, md: 15 },
        }}
      >
        {/* LEFT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleLeft,
            boxShadow: `0px -3px 0px ${theme.palette.section.feedback.pastel}, 0px -12px 0px ${theme.palette.section.feedback.main}`,
            pb: { xs: 1, md: 2 }, 
          }}
        >
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              textAlign: { xs: "center", md: "left" },
              marginLeft: { md: "120px" },
            }}
          >
            Feedback From
            <br />
            Our Clients
          </Typography>
        </Box>

        {/* RIGHT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxRight,
            boxShadow: `inset 0px -5px 0px ${theme.palette.section.feedback.pastel}, inset -0px -14px 0px ${theme.palette.section.feedback.main}`,
          }}
        />

        {/* OPTIONAL BOTTOM LINE */}
        <Box sx={{ ...theme.mixins.bottomLineRight }} />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box sx={{ ...theme.mixins.sectionContentSpacing }}>
        <Carousel
          items={feedback}
          renderItem={(item) => (
            <FeedbackCard key={item.id} name={item.name} message={item.message} avatar={item.avatar} />
          )}
        />
      </Box>
    </Box>
  )
}
