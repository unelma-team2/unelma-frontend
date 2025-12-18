"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material"
import Image from "next/image"

export default function SearchInput({ placeholder = "Search…", size = "medium" }) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const theme = useTheme()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const iconSize = size === "small" ? 24 : 30
  const maxWidth = size === "small" ? { sm: 120, md: 150 } : { sm: 150, md: 200 }

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      sx={{
        maxWidth: maxWidth,
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          backgroundColor: theme.palette.background.paper,
          border: `2px solid ${theme.palette.primary.main}`,
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${theme.palette.section.products.vibrant}`,
            borderRadius: "4px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${theme.palette.section.products.vibrant}`,
            borderRadius: "4px",
          },
        },
        "& .MuiInputBase-input": {
          padding: "8px 12px",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleSearch}
              sx={{
                height: 40,
                width: 40,
                borderRadius: "6px",
                transition: "transform 0.25s ease",
                "&:hover": {
                  //border: `2px solid ${theme.palette.section.products.vibrant}`,
                  //backgroundColor: theme.palette.section.products.soft,
                  backgroundColor: "transparent !important",
                  transform: "scale(1.4)",
                },
              }}
            >
              <Image src="/images/icons/icons8-search-32.png" alt="Search Icon" width={iconSize} height={iconSize} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
