"use client"

import { Box, Typography, useTheme } from "@mui/material"
import Image from "next/image"

export default function Metrics() {
  const theme = useTheme()

  const metrics = [
    {
      number: "1 M+",
      label1: "Happy",
      label2: "Users",
      top: { xs: "2%", sm: "0%", md: "2%" },
      left: { xs: "35%", sm: "45%", md: "39%" },
      icon: "/images/icons/icons8-winner-64.png",
    },
    {
      number: "3 M+",
      label1: "Total",
      label2: "Downloads",
      top: { xs: "40%", sm: "26%", md: "25%" },
      left: { xs: "8%", sm: "35%", md: "23%" },
      icon: "/images/icons/icons8-downloads-48.png",
    },
    {
      number: 2,
      label1: "Awards",
      label2: "Won",
      top: { xs: "30%", sm: "50%", md: "46%" },
      left: { xs: "35%", sm: "45%", md: "39%" },
      icon: "/images/icons/icons8-award-64.png",
    },
    {
      number: 17,
      label1: "Total",
      label2: "Agents",
      top: { xs: "40%", sm: "26%", md: "25%" },
      left: { xs: "65%", sm: "53%", md: "54%" },
      icon: "/images/icons/icons8-support-64.png",
    },
  ]

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 350, sm: 450, md: 550 },
      }}
    >
      {/* Background Image */}
      <Image src="/images/metrics_background.png" alt="Background" fill style={{ objectFit: "contain" }} />

      {/* Ellipses on top of the image */}
      {metrics.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: { xs: 90, sm: 100, md: 120 },
            height: { xs: 90, sm: 100, md: 120 },
            borderRadius: "50%",
            border: "2px solid #1D2340",
            bgcolor: theme.palette.background.lightGreen,
            position: "absolute",
            top: item.top,
            left: item.left,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Outfit, sans-serif",
            textAlign: "center",
          }}
        >
          {/* Icon on top-left of the ellipse */}
          <Box
            sx={{
              width: { xs: 35, sm: 40, md: 48 },
              height: { xs: 35, sm: 40, md: 48 },
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
              border: "2px solid" + theme.palette.primary.main,
              position: "absolute",
              top: { xs: -10, sm: -12, md: -13 },
              left: { xs: -10, sm: -12, md: -13 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Icon on top of small ellipse */}
            <Image
              src={item.icon || "/icons/smile.svg"}
              alt="icon"
              width={0}
              height={0}
              style={{
                width: "60%",
                height: "60%",
              }}
            />
          </Box>

          {/* Text inside the ellipse */}
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18, md: 20 } }}>{item.number}</Typography>
          <Typography sx={{ fontSize: { xs: 12, sm: 13, md: 15 }, fontWeight: 500 }}>{item.label1}</Typography>
          <Typography sx={{ fontSize: { xs: 12, sm: 13, md: 15 }, fontWeight: 500 }}>{item.label2}</Typography>
        </Box>
      ))}
    </Box>
  )
}
