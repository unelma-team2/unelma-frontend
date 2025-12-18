"use client"

import { useState } from "react"
import { Box, Typography, Tabs, Tab, useTheme } from "@mui/material"
import Carousel from "@/components/Carousel.jsx"
import WorkProjectCard from "@/components/WorkProjectCard.jsx"

export default function RecentWorkSection({ works = [], categories = [], API_URL }) {
  const theme = useTheme()
  const [tab, setTab] = useState(0)

  const handleChange = (e, newVal) => setTab(newVal)

  const filteredWorks = tab === 0 ? works : works.filter((work) => work.type === categories[tab]?.name)

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
        }}
      >
        {/* LEFT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
            boxShadow: `inset 0px -5px 0px ${theme.palette.section.caseStudies.pastel}, inset -0px -14px 0px ${theme.palette.section.caseStudies.main}`,
          }}
        />

        {/* RIGHT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
               boxShadow: `-0px -3px 0px ${theme.palette.section.caseStudies.pastel}, 0px -12px 0px ${theme.palette.section.caseStudies.main}`,
          }}
        >
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              textAlign: { xs: "center", md: "right" },
            }}
          >
            Our Recent Projects
          </Typography>
        </Box>

        {/* OPTIONAL BOTTOM LINE */}
        <Box sx={{ ...theme.mixins.bottomLineLeft }} />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box sx={{ ...theme.mixins.sectionContentSpacing }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          centered
          sx={{
            mb: 10,
            "& .MuiTabs-indicator": {
              height: 4,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category.name} sx={{...theme.typography.bodyFontTitle_S, color: theme.palette.primary.main }}></Tab>
          ))}
        </Tabs>

        <Carousel items={filteredWorks} renderItem={(work) => <WorkProjectCard work={work} API_URL={API_URL} />} />
      </Box>
    </Box>
  )
}
