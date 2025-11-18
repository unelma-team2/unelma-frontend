"use client";

import React from "react";
import { Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, Button, IconButton, useTheme } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";

export default function RecentWorkSection() {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const handleChange = (e, newVal) => setTab(newVal);

  const items = [
    {
      title: "Multipurpose CMS",
      img: "/images/homepage-recentwork/joao-paulo-m-ramos-paulo-e7TIvspb-Dg-unsplash.jpg",
    },
    {
      title: "E-Commerce Website",
      img: "/images/homepage-recentwork/pexels-canvastudio-3194519.jpg",
    },
    {
      title: "Knowledge Base Website",
      img: "/images/homepage-recentwork/pexels-cottonbro-5990037.jpg",
    },
  ];

  return (
    <Box sx={{ p: 0, minWidth: 0, border: 'none', color: 'black', '&:hover': { backgroundColor: 'transparent' } }}>
      <Typography  variant="h2"
          component="h2"
          align="right"
          sx={{ fontWeight: 700, mb: 6 }}>
          Our Recent Work
        </Typography>

     <Tabs
  value={tab}
  onChange={handleChange}
  centered
  sx={{
    mb: 6,
    '& .MuiTabs-indicator': {
      height: 4,             
      backgroundColor: 'primary.main',
    },
  }}
>
  {["All", "Web Development", "Website Design", "Mobile Development", "Cyber Support"].map((label, index) => (
    <Tab
      key={index}
      label={label}
      sx={{
        fontSize: 16,
        fontWeight: 700,       
        textTransform: 'none'
      }}
    />
  ))}
</Tabs>


      <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {items.map((item, i) => (
          <Card
            key={i}
            sx={{
             
              textAlign: "center",
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              width: 300,
              boxShadow: 3,
              transition: "0.3s",
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: 6,
              },
            }}
          >
            <CardMedia component="img" height="335px" image={item.img} />
            <CardContent sx={{ background: theme.palette.background.lightMint }}>
              <Typography fontWeight={700} align="center">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

     <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3 }}>
      <IconButton
        aria-label="previous"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.background.darkMint,
          },
        }}
      >
        <ArrowCircleLeftIcon sx={{ fontSize: 48 }} />
      </IconButton>

      <IconButton
        aria-label="next"
        sx={{
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.background.darkMint,
          },
        }}
      >
        <ArrowCircleRightIcon sx={{ fontSize: 48 }} />
      </IconButton>
  </Box>
    </Box>
  );
}
