"use client"

import { Box, Typography, useTheme } from "@mui/material"
import Image from "next/image"

/* ---------------------------------------------------
   RESPONSIVE DIAGONAL CONFIG (tweak here only)
--------------------------------------------------- */

const DIAGONAL_CONFIG = {
  xs: {
    angle: 30,
    density: 0.80,
    bounds: { start: 5, end: 80 },
    shift: { x: -12, y: -28 },
  },
  sm: {
    angle: 50,
    density: 0.9,
    bounds: { start: 25, end: 70 },
    shift: { x: -13, y: -35 },
  },
  md: {
    angle: 36,
    density: 0.7,
    bounds: { start: 10, end: 87 },
    shift: { x: -19, y: -25 },
  },
}

/* ---------------------------------------------------
   HELPERS
--------------------------------------------------- */

const degToRad = (deg) => (deg * Math.PI) / 180
const getSlope = (bp) => Math.tan(degToRad(DIAGONAL_CONFIG[bp].angle))

export default function Metrics() {
  const theme = useTheme()

  /* ---------------------------------------------------
     BASE DATA
  --------------------------------------------------- */

  const baseMetrics = [
    {
      number: 2,
      label1: "Awards",
      label2: "Won",
      bgColor: theme.palette.section.contact.soft,
      icon: "/images/icons/icons8-award-64.png",
    },
    {
      number: 17,
      label1: "Total",
      label2: "Agents",
      bgColor: theme.palette.section.blog.soft,
      icon: "/images/icons/icons8-support-64.png",
    },
    {
      number: "1 M+",
      label1: "Happy",
      label2: "Users",
      bgColor: theme.palette.section.feedback.soft,
      icon: "/images/icons/icons8-winner-64.png",
    },
    {
      number: "3 M+",
      label1: "Total",
      label2: "Downloads",
      bgColor: theme.palette.section.caseStudies.soft,
      icon: "/images/icons/icons8-downloads-48.png",
    },
  ]

  const steps = baseMetrics.length - 1
  const centerX = 50
  const centerY = 50
  const breakpoints = ["xs", "sm", "md"]

  /* ---------------------------------------------------
     POSITION CALCULATION
  --------------------------------------------------- */

  const metrics = baseMetrics.map((item, index) => {
    const positions = {}

    breakpoints.forEach((bp) => {
      const { bounds, density, shift } = DIAGONAL_CONFIG[bp]
      const slope = getSlope(bp)

      const raw =
        bounds.start +
        (index / steps) * (bounds.end - bounds.start)

      const mid = (bounds.start + bounds.end) / 2
      const compressed = mid + (raw - mid) * density

      const left = compressed + shift.x
      const top = centerY - slope * (compressed - centerX) + shift.y

      positions[bp] = {
        left: `${left}%`,
        top: `${top}%`,
      }
    })

    return {
      ...item,
      left: {
        xs: positions.xs.left,
        sm: positions.sm.left,
        md: positions.md.left,
      },
      top: {
        xs: positions.xs.top,
        sm: positions.sm.top,
        md: positions.md.top,
      },
    }
  })

  /* ---------------------------------------------------
     RENDER
  --------------------------------------------------- */

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 600,  
        height: { xs: 560, sm: 450, md: 700 },
        mx: "auto",    
      }}
    >
      {/* Background */}
      <Image
        src="/images/metrics_arrow_img.png"
        alt="Background"
        fill
        style={{ objectFit: "contain" }}
      />

      {/* Metrics */}
      {metrics.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: { xs: 90, sm: 100, md: 120 },
            height: { xs: 90, sm: 100, md: 120 },
            borderRadius: "50%",
            border: "2px solid #1D2340",
            bgcolor: theme.palette.primary.main,
            color: "#FFFFFF",
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
          {/* Icon bubble */}
          <Box
            sx={{
              width: { xs: 35, sm: 40, md: 48 },
              height: { xs: 35, sm: 40, md: 48 },
              borderRadius: "50%",
              bgcolor: item.bgColor,
              border: `2px solid ${theme.palette.primary.main}`,
              position: "absolute",
              top: { xs: -10, sm: -12, md: -13 },
              left: { xs: -10, sm: -12, md: -13 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={item.icon}
              alt="icon"
              width={0}
              height={0}
              style={{ width: "75%", height: "75%" }}
            />
          </Box>

          {/* Text */}
          <Typography sx={{ color: item.bgColor, fontWeight: 700, fontSize: { xs: 16, sm: 18, md: 20 } }}>
            {item.number}
          </Typography>
          <Typography sx={{ color: item.bgColor,fontSize: { xs: 12, sm: 13, md: 15 }, fontWeight: 500 }}>
            {item.label1}
          </Typography>
          <Typography sx={{ color: item.bgColor, fontSize: { xs: 12, sm: 13, md: 15 }, fontWeight: 500 }}>
            {item.label2}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
