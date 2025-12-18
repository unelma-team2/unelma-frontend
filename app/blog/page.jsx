"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Box, Typography, useTheme, IconButton, Pagination } from "@mui/material"
import BlogPageHero from "@/components/blog/BlogPageHero"
import ShareIcon from "@mui/icons-material/Share"
import CommentIcon from "@mui/icons-material/Comment"
import { ArrowForward } from "@mui/icons-material"
import LoadingSpinner from "@/components/LoadingSpinner"
import BackToTopButton from "@/components/BackToTopButton"
import SearchInput from "@/components/SearchInput"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import EditNoteIcon from "@mui/icons-material/EditNote"
import CategoryIcon from "@mui/icons-material/Category"

function formatBlogDate(date, fallback = "Unknown Date") {
  try {
    if (!date) return fallback
    const parsedDate = new Date(date)
    if (isNaN(parsedDate)) return fallback
    const options = { year: "numeric", month: "long", day: "numeric" }
    return parsedDate.toLocaleDateString(undefined, options)
  } catch (error) {
    return fallback
  }
}

export default function BlogPage() {
  const theme = useTheme()
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [yearArchive, setYearArchive] = useState({})
  const [openYears, setOpenYears] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const toggleYear = (year) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => {
        const fetchedBlogs = res.data.data
        setBlogs(fetchedBlogs)

        const categoryCounts = fetchedBlogs.reduce((acc, blog) => {
          const category = blog.category || "Other"
          acc[category] = (acc[category] || 0) + 1
          return acc
        }, {})
        setCategories(categoryCounts)

        const archive = fetchedBlogs.reduce((acc, blog) => {
          const date = blog.date || blog.publishedAt || blog.createdAt
          if (!date) return acc

          const d = new Date(date)
          const year = d.getFullYear()
          const month = d.toLocaleString("en-US", { month: "long" })

          if (!acc[year]) acc[year] = {}
          if (!acc[year][month]) acc[year][month] = 0
          acc[year][month]++
          return acc
        }, {})
        setYearArchive(archive)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL])

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date || b.publishedAt || b.createdAt) - new Date(a.date || a.publishedAt || a.createdAt),
  )

  const [featured, ...rest] = sortedBlogs

  const filteredBlogs = rest.filter((blog) => {
    const matchesSearch =
      blog.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.Description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || (blog.category || "Other") === selectedCategory

    let matchesDate = true
    if (selectedYear && selectedMonth) {
      const date = blog.date || blog.publishedAt || blog.createdAt
      if (date) {
        const d = new Date(date)
        const blogYear = d.getFullYear()
        const blogMonth = d.toLocaleString("en-US", { month: "long" })
        matchesDate = blogYear === selectedYear && blogMonth === selectedMonth
      }
    }

    return matchesSearch && matchesCategory && matchesDate
  })

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / postsPerPage))
  const paginatedPosts = filteredBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const uniquePaginatedPosts = Array.from(new Map(paginatedPosts.map((blog) => [blog.id, blog])).values())
  const currentBlogs = uniquePaginatedPosts

  const paginate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
              {/* Featured Blog Post */}
              {currentPage === 1 && !searchQuery && featured && (
                <Box
                  component={Link}
                  href={`/blog/${featured.slug}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ...theme.mixins.borderStyle,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                    minHeight: 600,
                  }}
                >
                  {featured.blog_image?.url && (
                    <Box
                      sx={{
                        width: "100%",
                        height: 450,
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"
                        alt={featured.Title || "Featured Blog Image"}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </Box>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "column", p: 5 }}>
                    <Box sx={{ display: "flex", gap: 4, alignItems: "center", mb: 4, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            borderRadius: 100,
                            border: theme.mixins.borderStyle,
                            p: 0.6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.section.blog.pastel,
                            transition: "transform 0.25s ease",
                            "&:hover": {
                              transform: "scale(1.2)",
                              backgroundColor: theme.palette.section.shopOrder.soft,
                              boxShadow: "none",
                            },
                          }}
                        >
                          <CalendarTodayIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        <Typography sx={{ ...theme.typography.bodyFontTitle_S }}>
                          {formatBlogDate(featured.date || featured.publishedAt)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            borderRadius: 100,
                            border: theme.mixins.borderStyle,
                            p: 0.6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.section.blog.pastel,
                            transition: "transform 0.25s ease",
                            "&:hover": {
                              transform: "scale(1.2)",
                              backgroundColor: theme.palette.section.shopOrder.soft,
                              boxShadow: "none",
                            },
                          }}
                        >
                          <EditNoteIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        <Typography sx={{ ...theme.typography.bodyFontTitle_S }}>
                          {featured.author_name || "Author's Name"}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            borderRadius: 100,
                            border: theme.mixins.borderStyle,
                            p: 0.6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.section.blog.pastel,
                            transition: "transform 0.25s ease",
                            "&:hover": {
                              transform: "scale(1.2)",
                              backgroundColor: theme.palette.section.shopOrder.soft,
                              boxShadow: "none",
                            },
                          }}
                        >
                          <CategoryIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        <Typography sx={{ ...theme.typography.bodyFontTitle_S }}>
                          {featured.category || "Category"}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, my: 4 }}>
                      {featured.Title || "Featured Blog Title"}
                    </Typography>
                    <Typography
                      sx={{
                        ...theme.typography.bodyFont_M,
                        color: theme.palette.text.secondary,
                        mb: 5,
                        textAlign: "justify",
                        lineHeight: 1.8,
                      }}
                    >
                      {featured.Description?.slice(0, 600) || ""}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 3,
                        mt: 2,
                        flexWrap: "nowrap", // keep everything on one line
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 4, alignItems: "center", minWidth: 0, flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 100,
                              border: theme.mixins.borderStyle,
                              p: 0.6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme.palette.primary.main,
                              backgroundColor: theme.palette.section.blog.pastel,
                              transition: "transform 0.25s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                                backgroundColor: theme.palette.section.shopOrder.soft,
                                boxShadow: "none",
                              },
                            }}
                          >
                            <ShareIcon sx={{ fontSize: 24 }} />
                          </IconButton>
                          <Typography
                            sx={{
                              ...theme.typography.bodyFontTitle_S,
                              cursor: "pointer",
                            }}
                          >
                            Share
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 100,
                              border: theme.mixins.borderStyle,
                              p: 0.6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme.palette.primary.main,
                              backgroundColor: theme.palette.section.blog.pastel,
                              transition: "transform 0.25s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                                backgroundColor: theme.palette.section.shopOrder.soft,
                                boxShadow: "none",
                              },
                            }}
                          >
                            <CommentIcon sx={{ fontSize: 24 }} />
                          </IconButton>
                          <Typography
                            sx={{
                              ...theme.typography.bodyFontTitle_S,
                              cursor: "pointer",
                            }}
                          >
                            Comment
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          color: theme.palette.section.about.main,
                          transition: "all 0.25s ease",
                          whiteSpace: "nowrap", // prevent wrapping of Read More
                          "&:hover": {
                            color: theme.palette.section.products.vibrant,
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            ...theme.typography.bodyFontTitle_S,
                            textTransform: "uppercase",
                          }}
                        >
                          Read More
                        </Typography>
                        <ArrowForward sx={{ fontSize: 20 }} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Smaller Blog Cards */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  mt: currentPage === 1 && !searchQuery && featured ? 6 : 0,
                }}
              >
                {currentBlogs.map((blog) => (
                  <Box
                    key={blog.id}
                    component={Link}
                    href={`/blog/${blog.slug}`}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      ...theme.mixins.borderStyle,
                      overflow: "hidden",
                      cursor: "pointer",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      minHeight: 380,
                    }}
                  >
                    {blog.blog_image?.url && (
                      <Box
                        sx={{
                          minWidth: { xs: "100%", md: 300 },
                          height: { xs: 250, md: "100%" },
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src="/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"
                          alt={blog.Title || "Blog Image"}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    )}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 4, gap: 3 }}>
                      <Box sx={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 100,
                              border: theme.mixins.borderStyle,
                              p: 0.6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme.palette.primary.main,
                              backgroundColor: theme.palette.section.blog.pastel,
                              transition: "transform 0.25s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                                backgroundColor: theme.palette.section.shopOrder.soft,
                                boxShadow: "none",
                              },
                            }}
                          >
                            <CalendarTodayIcon sx={{ fontSize: 24 }} />
                          </IconButton>
                          <Typography sx={{ ...theme.typography.bodyFont_M }}>
                            {formatBlogDate(blog.date || blog.publishedAt)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 100,
                              border: theme.mixins.borderStyle,
                              p: 0.6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme.palette.primary.main,
                              backgroundColor: theme.palette.section.blog.pastel,
                              transition: "transform 0.25s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                                backgroundColor: theme.palette.section.shopOrder.soft,
                                boxShadow: "none",
                              },
                            }}
                          >
                            <EditNoteIcon sx={{ fontSize: 24 }} />
                          </IconButton>
                          <Typography sx={{ ...theme.typography.bodyFont_M }}>
                            {blog.author_name || "Author's Name"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 100,
                              border: theme.mixins.borderStyle,
                              p: 0.6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme.palette.primary.main,
                              backgroundColor: theme.palette.section.blog.pastel,
                              transition: "transform 0.25s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                                backgroundColor: theme.palette.section.shopOrder.soft,
                                boxShadow: "none",
                              },
                            }}
                          >
                            <CategoryIcon sx={{ fontSize: 24 }} />
                          </IconButton>
                          <Typography sx={{ ...theme.typography.bodyFont_M }}>{blog.category || "Category"}</Typography>
                        </Box>
                      </Box>

                      <Typography sx={{ ...theme.typography.bodyFontTitle_S, mt: 1 }}>{blog.Title}</Typography>
                      <Typography
                        sx={{
                          ...theme.typography.bodyFont_M,
                          color: theme.palette.text.secondary,
                          flex: 1,
                          textAlign: "justify",
                          lineHeight: 1.7,
                        }}
                      >
                        {blog.Description ? blog.Description.slice(0, 350) + "..." : ""}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 3,
                          mt: 2,
                          flexWrap: "nowrap", // keep everything on one line
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 4, alignItems: "center", minWidth: 0, flex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <IconButton
                              size="small"
                              sx={{
                                borderRadius: 100,
                                border: theme.mixins.borderStyle,
                                p: 0.6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.section.blog.pastel,
                                transition: "transform 0.25s ease",
                                "&:hover": {
                                  transform: "scale(1.2)",
                                  backgroundColor: theme.palette.section.shopOrder.soft,
                                  boxShadow: "none",
                                },
                              }}
                            >
                              <ShareIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Typography
                              sx={{
                                ...theme.typography.bodyFontTitle_S,
                                cursor: "pointer",
                              }}
                            >
                              Share
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <IconButton
                              size="small"
                              sx={{
                                borderRadius: 100,
                                border: theme.mixins.borderStyle,
                                p: 0.6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.section.blog.pastel,
                                transition: "transform 0.25s ease",
                                "&:hover": {
                                  transform: "scale(1.2)",
                                  backgroundColor: theme.palette.section.shopOrder.soft,
                                  boxShadow: "none",
                                },
                              }}
                            >
                              <CommentIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Typography
                              sx={{
                                ...theme.typography.bodyFontTitle_S,
                                cursor: "pointer",
                              }}
                            >
                              Comment
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            color: theme.palette.section.about.main,
                            transition: "all 0.25s ease",
                            whiteSpace: "nowrap", // prevent wrapping of Read More
                            "&:hover": {
                              color: theme.palette.section.products.vibrant,
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              ...theme.typography.bodyFontTitle_S,
                              textTransform: "uppercase",
                            }}
                          >
                            Read More
                          </Typography>
                          <ArrowForward sx={{ fontSize: 20 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Pagination */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, value) => paginate(value)}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      ...theme.typography.bodyFont_M,
                      color: theme.palette.section.about.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        color: theme.palette.section.products.vibrant,
                      },
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: theme.palette.section.blog.soft,
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Sidebar */}
            <Box sx={{ width: { xs: "100%", lg: 350 }, display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Search */}
              <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
                <Typography
                  sx={{
                    ...theme.typography.bodyFontTitle_L,
                    textTransform: "uppercase",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  Search
                </Typography>
                <SearchInput placeholder="Search blogs..." size="small" fullWidth onSearch={(q) => setSearchQuery(q)} />
              </Box>

              {/* Categories */}
              <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
                <Typography
                  sx={{
                    ...theme.typography.bodyFontTitle_L,
                    textTransform: "uppercase",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  Blog Categories
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <Box
                      onClick={() => {
                        setSelectedCategory("All")
                        setSelectedYear(null)
                        setSelectedMonth(null)
                        setCurrentPage(1)
                      }}
                      sx={{
                        ...theme.typography.bodyFont_M,
                        p: 1.5,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        color: theme.palette.text.primary,
                        backgroundColor: selectedCategory === "All" ? theme.palette.section.blog.pastel : "transparent",
                        "&:hover": {
                          backgroundColor: theme.palette.section.blog.pastel,
                        },
                      }}
                    >
                      All ({blogs.length - 1})
                    </Box>
                  </li>
                  {[
                    "Digital Marketing",
                    "E-Commerce",
                    "API",
                    "Events & Conferences",
                    "Startup Business",
                    "Internships",
                    "Other",
                  ].map((category) => {
                    const count = categories[category] || 0
                    return (
                      <li key={category} style={{ marginBottom: "0.5rem" }}>
                        <Box
                          onClick={() => {
                            setSelectedCategory(category)
                            setSelectedYear(null)
                            setSelectedMonth(null)
                            setCurrentPage(1)
                          }}
                          sx={{
                            ...theme.typography.bodyFont_M,
                            p: 1.5,
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            color: theme.palette.text.primary,
                            backgroundColor:
                              selectedCategory === category ? theme.palette.section.blog.pastel : "transparent",
                            "&:hover": {
                              backgroundColor: theme.palette.section.blog.pastel,
                            },
                          }}
                        >
                          {category} ({count})
                        </Box>
                      </li>
                    )
                  })}
                </ul>
              </Box>

              {/* Archive */}
              <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
                <Typography
                  sx={{
                    ...theme.typography.bodyFontTitle_L,
                    textTransform: "uppercase",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  Blog Archive
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {Object.keys(yearArchive)
                    .sort((a, b) => b - a)
                    .map((year) => {
                      const months = yearArchive[year]
                      const totalPosts = Object.values(months).reduce((a, b) => a + b, 0)
                      return (
                        <li key={year} style={{ marginBottom: "1rem" }}>
                          <Box
                            onClick={() => toggleYear(year)}
                            sx={{
                              ...theme.typography.bodyFont_M,
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              p: 1.5,
                              transition: "all 0.25s ease",
                              color: theme.palette.text.primary,
                              backgroundColor:
                                selectedYear === Number.parseInt(year) && !selectedMonth
                                  ? theme.palette.section.blog.pastel
                                  : "transparent",
                              "&:hover": {
                                backgroundColor: theme.palette.section.blog.pastel,
                              },
                            }}
                          >
                            <span>
                              {year} ({totalPosts})
                            </span>
                            <span>{openYears[year] ? "−" : "+"}</span>
                          </Box>
                          {openYears[year] && (
                            <ul style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}>
                              {Object.keys(months).map((month) => (
                                <li key={month}>
                                  <Box
                                    onClick={() => {
                                      setSelectedYear(Number.parseInt(year))
                                      setSelectedMonth(month)
                                      setSelectedCategory("All")
                                      setCurrentPage(1)
                                    }}
                                    sx={{
                                      ...theme.typography.bodyFont_M,
                                      pl: 4,
                                      p: 1,
                                      cursor: "pointer",
                                      transition: "all 0.25s ease",
                                      color: theme.palette.text.secondary,
                                      backgroundColor:
                                        selectedYear === Number.parseInt(year) && selectedMonth === month
                                          ? theme.palette.section.blog.pastel
                                          : "transparent",
                                      "&:hover": {
                                        backgroundColor: theme.palette.section.blog.pastel,
                                        color: theme.palette.text.primary,
                                      },
                                    }}
                                  >
                                    {month} ({months[month]})
                                  </Box>
                                </li>
                              ))}
                            </ul>
                          )}
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
