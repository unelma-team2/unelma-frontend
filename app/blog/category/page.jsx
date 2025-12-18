"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import axios from "axios"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import FolderIcon from "@mui/icons-material/Folder"
import BackToTopButton from "@/components/BackToTopButton"
import LoadingSpinner from "@/components/LoadingSpinner"
import SearchInput from "@/components/SearchInput"
import BlogPageHero from "@/components/hero-banners/BlogHero"

export default function CategoryPage() {
  const theme = useTheme()
  const params = useParams()
  const category = decodeURIComponent(params.category)
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => {
        const fetchedBlogs = res.data.data
        const filtered = fetchedBlogs.filter((blog) => blog.category === category)
        setBlogs(filtered)

        const categoryCounts = fetchedBlogs.reduce((acc, blog) => {
          const cat = blog.category || "Other"
          acc[cat] = (acc[cat] || 0) + 1
          return acc
        }, {})
        setCategories(categoryCounts)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL, category])

  const filteredBlogs = blogs.filter((blog) => {
    const { Title, Description } = blog
    const query = searchQuery.toLowerCase()
    return Title?.toLowerCase().includes(query) || Description?.toLowerCase().includes(query)
  })

  return (
    <>
      <BlogPageHero />
      <Box sx={{ px: { xs: 2, md: "150px" }, py: 8, mb: 10 }}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Typography variant="h6" color="error" textAlign="center">
            Error loading blogs: {error.message}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", gap: 8, flexDirection: { xs: "column", lg: "row" } }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ ...theme.typography.headingFont_L, mb: 4 }}>
                Category: {category} ({filteredBlogs.length})
              </Typography>

              {filteredBlogs.length === 0 ? (
                <Typography sx={{ ...theme.typography.bodyFont_L, textAlign: "center", py: 8 }}>
                  No posts found in this category.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {filteredBlogs.map((blog) => {
                    const { Title, Description, blog_image, createdAt, category } = blog
                    const imageUrl = blog_image?.url || "/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"

                    return (
                      <Box
                        key={blog.id}
                        component={Link}
                        href={`/blog/${blog.slug}`}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          ...theme.mixins.borderStyle,
                          overflow: "hidden",
                          textDecoration: "none",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: 300 }, height: 250, position: "relative" }}>
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={Title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CalendarTodayIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                              <Typography sx={{ ...theme.typography.bodyFont_S }}>
                                {new Date(createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PersonIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                              <Typography sx={{ ...theme.typography.bodyFont_S }}>Admin</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <FolderIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                              <Typography sx={{ ...theme.typography.bodyFont_S }}>{category}</Typography>
                            </Box>
                          </Box>
                          <Typography sx={{ ...theme.typography.bodyFontTitle_L }}>{Title}</Typography>
                          <Typography
                            sx={{
                              ...theme.typography.bodyFont_M,
                              textAlign: "justify",
                              lineHeight: 1.8,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {Description}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>

            {/* Sidebar */}
            <Box sx={{ width: { xs: "100%", lg: 350 }, display: "flex", flexDirection: "column", gap: 4 }}>
              <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
                <Typography
                  sx={{ ...theme.typography.bodyFontTitle_L, textTransform: "uppercase", textAlign: "center", mb: 3 }}
                >
                  Search
                </Typography>
                <SearchInput placeholder="Search blogs..." size="small" fullWidth onSearch={(q) => setSearchQuery(q)} />
              </Box>

              <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
                <Typography
                  sx={{ ...theme.typography.bodyFontTitle_L, textTransform: "uppercase", textAlign: "center", mb: 3 }}
                >
                  Blog Categories
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <Link href="/blog" style={{ textDecoration: "none" }}>
                      <Box
                        sx={{
                          ...theme.typography.bodyFont_M,
                          p: 1.5,
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          color: theme.palette.text.primary,
                          "&:hover": {
                            backgroundColor: theme.palette.section.blog.pastel,
                          },
                        }}
                      >
                        All
                      </Box>
                    </Link>
                  </li>
                  {[
                    "Digital Marketing",
                    "E-Commerce",
                    "API",
                    "Events & Conferences",
                    "Startup Business",
                    "Internships",
                    "Other",
                  ].map((cat) => {
                    const count = categories[cat] || 0
                    return (
                      <li key={cat} style={{ marginBottom: "0.5rem" }}>
                        <Link href={`/blog/category/${encodeURIComponent(cat)}`} style={{ textDecoration: "none" }}>
                          <Box
                            sx={{
                              ...theme.typography.bodyFont_M,
                              p: 1.5,
                              cursor: "pointer",
                              transition: "all 0.25s ease",
                              color: theme.palette.text.primary,
                              backgroundColor: cat === category ? theme.palette.section.blog.pastel : "transparent",
                              "&:hover": {
                                backgroundColor: theme.palette.section.blog.pastel,
                              },
                            }}
                          >
                            {cat} ({count})
                          </Box>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <BackToTopButton />
    </>
  )
}
