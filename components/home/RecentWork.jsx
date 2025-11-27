"use client";

import React from "react";
import { Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, IconButton, useTheme } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentWorkSection() {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e, newVal) => setTab(newVal);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
  

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Category][populate]=*&populate[RecentWorks][populate]=*`)
      .then((res) => {
        const data = res.data.data;
        setCategories(data?.Category || []); 
        setWorks(data?.RecentWorks || []);  
      })
      .catch((err) => setError(err))
  }, [API_URL]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (!works || !categories) return <p>No RecentWorks or categories found.</p>;
  
  const { image, title, type } = works;
  const { name } = categories;




  return (
    <Box sx={{ p: 0, minWidth: 0, border: 'none', color: 'black', '&:hover': { backgroundColor: 'transparent' } }}>
      <Typography  variant="h2"
          component="h2"
          align="right"
          sx={{ fontWeight: 700, mb: 6 }}>
          Our Recent Works
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
  
  { categories.map((category, index) => (
    <Tab
      key={index}
      label={category.name}
      sx={{
        fontSize: 16,
        fontWeight: 700,       
        textTransform: 'none'
      }}
    />
  ))}
</Tabs>


      <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>

        {works.map((work, i) => {
            const imageUrl = work.image?.url
                ? work.image.url.startsWith("http")
                ? work.image.url
                : `${API_URL}${work.image.url}`
                : null;

            return (
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
                    <CardMedia component="img" height="335px" image={imageUrl} />
                    <CardContent sx={{ background: theme.palette.background.lightMint }}>
                    <Typography fontWeight={700} align="center">{work.title}</Typography>
                    </CardContent>
                </Card>
                )})}
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
