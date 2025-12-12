"use client";

import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export default function Metrics() {
  const theme = useTheme();

  const metrics = [
  { number: "1 M+", label1: "Happy", label2: "Users", top: "2%", left: "43%", icon: "/images/icons/icons8-winner-64.png" },
  { number: "3 M+", label1: "Total", label2: "Downloads", top: "28%", left: "23%", icon: "/images/icons/icons8-downloads-48.png" },
  { number: 2, label1: "Awards", label2: "Won", top: "52%", left: "43%", icon: "/images/icons/icons8-award-64.png" },
  { number: 17, label1: "Total", label2: "Agents", top: "28%", left: "62.5%", icon: "/images/icons/icons8-support-64.png" },
];


  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 400, md: 600 }, // adjust as needed
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/metrics_background.png"

        alt="Background"
        fill
        style={{ objectFit: "contain" }}
      />

      {/* Ellipses on top of the image */}
      {metrics.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: 160,
            height: 160,
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
              width: 55,
              height: 55,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
              border: "2px solid" + theme.palette.primary.main,
              position: "absolute",
              top: -15,
              left: -15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Icon on top of small ellipse */}
            <Image
              src={item.icon || "/icons/smile.svg"}
              alt="icon"
              width={35}
              height={35}
            />
          </Box>

          {/* Text inside the ellipse */}
          <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
            {item.number}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{item.label1}</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{item.label2}</Typography>
        </Box>
      ))}
    </Box>
  );
}
