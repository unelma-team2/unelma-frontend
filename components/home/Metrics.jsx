"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Metrics() {
  const metrics = [
    { number: "1 M+", label1: "Happy", label2: "Users" },
    { number: "3 M+", label1: "Total", label2: "Downloads" },
    { number: "2", label1: "Awards", label2: "Won" },
    { number: "18", label1: "Total", label2: "Agents" },
  ];

  return (
     <Box
      sx={{
        ml: { xs: 0, md: -15 },   
        mt: { xs: 4, md: 0 },     
      }}
    >
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(2, 1fr)" },
        gap: { xs: 6, md: 8 },
      }}
    >
      {metrics.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            border: "3px solid #2F2E2E",
            bgcolor: "#E9FCFF",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Quicksand, sans-serif",
            mx: "auto",
          }}
        >
          <Image
            src="/icons/smile.svg"
            alt="smile"
            width={52}      
            height={52}
            style={{
              position: "absolute",
              top: -5,
              left: -5,
            }}
          />

          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
            {item.number}
          </Typography>
          <Typography sx={{ fontSize: 15 }}>{item.label1}</Typography>
          <Typography sx={{ fontSize: 15 }}>{item.label2}</Typography>
        </Box>
      ))}
    </Box>
    </Box>
  );
}