"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material"
import Image from "next/image"

export default function SearchInput({ placeholder = "Search…", size = "medium", onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const theme = useTheme()

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (onSearch) {
      onSearch(query) // always filter in-place
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const iconSize = size === "small" ? 24 : 30

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value)
        if (onSearch) {
          onSearch(e.target.value.trim()) // update filter immediately
        }
      }}
      onKeyPress={handleKeyPress}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          backgroundColor: theme.palette.background.paper,
          border: `2px solid ${theme.palette.primary.main}`,
          transition: "all 0.25s ease",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${theme.palette.primary.blue1}`,
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
                backgroundColor: theme.palette.background.paper,
                transition: "transform 0.25s ease",
                "&:hover": {
                  border: `2px solid ${theme.palette.section.products.vibrant}`,
                  borderRadius: 100,
                  backgroundColor: theme.palette.section.products.soft,
                  padding: 2,
                  boxShadow: "none",
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
