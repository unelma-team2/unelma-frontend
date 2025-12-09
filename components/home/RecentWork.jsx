"use client";

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import Carousel from "@/components/Carousel.jsx";
import WorkProjectCard from "@/components/WorkProjectCard.jsx";

export default function RecentWorkSection({ works = [], categories = [], API_URL }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);

  const handleChange = (e, newVal) => setTab(newVal);

  const filteredWorks =
    tab === 0 ? works : works.filter((work) => work.type === categories[tab]?.name);

  // Header settings
  const headerHeight = 180;

  return (
    <Box sx={{ width: "100%", mt: 8 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
            boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightViolet}`,
            
          }}
        />

        {/* RIGHT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
            boxShadow: `-10px -8px 0px ${theme.palette.background.lightViolet}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "28px", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "right" },
              color: theme.palette.text.primary,
              marginRight: { md: "170px" }, // optional spacing from right edge
            }}
          >
            Our Recent Works
          </Typography>
        </Box>

        {/* OPTIONAL BOTTOM LINE */}
        <Box
          sx={{
            ...theme.mixins.bottomLineLeft,
          }}
        />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
        {/* TABS */}
        <Tabs
          value={tab}
          onChange={handleChange}
          centered
          sx={{
            mb: 8,
            "& .MuiTabs-indicator": {
              height: 4,
              backgroundColor: "primary.violet",
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category.name}
              sx={{
                fontSize: 18,
                fontWeight: 700,
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>

      
          <Carousel
            items={filteredWorks}
            renderItem={(work) => <WorkProjectCard work={work} API_URL={API_URL} />}
          />
      
      </Box>
    </Box>
  );
}
