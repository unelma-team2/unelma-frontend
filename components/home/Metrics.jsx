"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Metrics() {

    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState(null);
  
    const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Metrics][populate]=*`)
      .then((res) => setMetrics(res.data.data?.Metrics || null))
      .catch((err) => setError(err))
  }, [API_URL]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (!metrics) return <p>No Metrics section found.</p>;
  
  const { number, label1, label2 } = metrics;
  console.log("Metrics data:", metrics);

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