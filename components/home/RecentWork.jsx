"use client";

import React from "react";
import { Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowButtons from "../ArrowButtons";
import LoadingSpinner from "../LoadingSpinner";

export default function RecentWorkSection() {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //onst handleChange = (e, newVal) => setTab(newVal);

 // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
   const API_URL = "http://localhost:1337";

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
  
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!works || !categories) return <p>No Recent Work or categories found.</p>;
  
  const { image, title, type } = works;
  const { name } = categories;

  const handleChange = (e, newVal) => setTab(newVal);

  const handleNext = () => {
    setTab((prev) =>
      prev + 1 < categories.length ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setTab((prev) =>
      prev - 1 >= 0 ? prev - 1 : categories.length - 1
    );
  };



  return (
    <Box sx={{ position: "relative", width: "100%", height: "1200px", py: 10, zIndex: 1, borderBottom: `2px solid ${theme.palette.primary.main}`, backgroundColor: theme.palette.background.lightMint  }}>
           <Box sx={{ ...theme.mixins.homeBoxLeft, backgroundColor: theme.palette.background.lightMint, borderBottom: `2px solid ${theme.palette.primary.main}`, }} />
          <Box sx={{ ...theme.mixins.homeTitleRight, backgroundColor: theme.palette.background.default }}>
            <Typography
            variant="h2"
            component="h2"
          align="right"
            sx={{ marginRight: "170px", marginY: "5rem" }}>
        
            Recent Work
          </Typography>
        </Box>
    {/*<Box sx={{ p: 0, minWidth: 0, border: 'none', color: 'black', '&:hover': { backgroundColor: 'transparent' } }}>
      <Typography  variant="h2"
          component="h2"
          align="right"
          sx={{ fontWeight: 700, mb: 6 }}>
          Our Recent Works
        </Typography>*/}
         <Box sx={{ position: "relative", zIndex: 2, backgroundColor: theme.palette.background.default, py: 28, px: 4 }}>
           <Box sx={{ maxWidth: "1100px", mx: "auto" }}>

     <Tabs
  value={tab}
  onChange={handleChange}
  centered
  sx={{
    mb: 6,
    '& .MuiTabs-indicator': {
      height: 4,             
      backgroundColor: theme.palette.primary.main,
    },
  }}
>
  
  { categories.map((category, index) => (
    <Tab
      key={index}
      label={category.name}
      sx={{
        fontSize: 16,
        fontWeight: "semi-bold",       
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
                    backgroundColor: theme.palette.background.lightMint,
                    width: 300,
                    height: 400,
                    //
                    textAlign: "center",
                    //border: `2px solid ${theme.palette.primary.main}`,
                    //borderRadius: "10px",
                    //width: 300,
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

      <ArrowButtons onPrev={handlePrev} onNext={handleNext} />
    </Box>
    </Box>
    </Box>
    
  );
}
