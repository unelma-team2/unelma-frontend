"use client"

import { useState } from "react"
import { Box, Typography, Stack, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { useTheme } from "@mui/material"
import SearchInput from "@/components/SearchInput"
import Link from "next/link"

export default function BlogSidebar({ categories = [], archives = [] }) {
  const theme = useTheme()
  const [expandedYears, setExpandedYears] = useState({})

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* SEARCH */}
      <Box>
        <Typography
          sx={{
            ...theme.typography.bodyFontTitle_M,
            textAlign: "center",
            mb: 2,
          }}
        >
          Search
        </Typography>
        <SearchInput placeholder="Search blog posts..." fullWidth />
      </Box>

      {/* CATEGORIES */}
      <Box>
        <Typography
          sx={{
            ...theme.typography.bodyFontTitle_M,
            textAlign: "center",
            mb: 2,
          }}
        >
          Categories
        </Typography>
        <Stack spacing={1}>
          {categories.map((cat) => (
            <Link key={cat.name} href={`/blog?category=${cat.name}`} passHref style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  ...theme.mixins.borderStyle,
                  p: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.section.blog.pastel,
                  },
                }}
              >
                <Typography sx={{ ...theme.typography.bodyFont_M }}>{cat.name}</Typography>
                <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.text.secondary }}>
                  ({cat.count})
                </Typography>
              </Box>
            </Link>
          ))}
        </Stack>
      </Box>

      {/* ARCHIVE */}
      <Box>
        <Typography
          sx={{
            ...theme.typography.bodyFontTitle_M,
            textAlign: "center",
            mb: 2,
          }}
        >
          Archive
        </Typography>
        <Stack spacing={1}>
          {archives.map((yearData) => (
            <Box key={yearData.year}>
              <Box
                onClick={() => toggleYear(yearData.year)}
                sx={{
                  ...theme.mixins.borderStyle,
                  p: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.section.blog.pastel,
                  },
                }}
              >
                <Typography sx={{ ...theme.typography.bodyFont_M }}>{yearData.year}</Typography>
                <IconButton size="small">
                  {expandedYears[yearData.year] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedYears[yearData.year]}>
                <Stack spacing={0.5} sx={{ pl: 2, mt: 0.5 }}>
                  {yearData.months.map((month) => (
                    <Link
                      key={month.name}
                      href={`/blog?year=${yearData.year}&month=${month.name}`}
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.section.blog.pastel,
                          },
                        }}
                      >
                        <Typography sx={{ ...theme.typography.bodyFont_S }}>
                          {month.name} ({month.count})
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
