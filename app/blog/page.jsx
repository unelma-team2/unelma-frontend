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
  const [currentPage, setCurrentPage] = useState(1)
  const [yearArchive, setYearArchive] = useState({})
  const postsPerPage = 3

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

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
    (a, b) => new Date(b.createdAt || b.publishedAt) - new Date(a.createdAt || a.publishedAt),
  )

  const filteredBlogs = sortedBlogs.filter((blog) => {
    const { Title, Description } = blog
    const query = searchQuery.toLowerCase()
    return Title?.toLowerCase().includes(query) || Description?.toLowerCase().includes(query)
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
              {currentPage === 1 && !searchQuery && blogs.length > 0 && (
                <Box
                  component={Link}
                  href={`/blog/${blogs[0].slug}`}
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
                  {(() => {
                    const { Title, Description, blog_image, createdAt, category } = blogs[0]
                    const imageUrl = blog_image?.url || "/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"

                    return (
                      <>
                        {blog_image?.url && (
                          <Box
                            sx={{
                              width: "100%",
                              height: 450,
                              position: "relative",
                            }}
                          >
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={Title || "Featured Blog Image"}
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
                                {formatBlogDate(createdAt)}
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
                                {blogs[0].author_name || "Author's Name"}
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
                                {category || "Category"}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, my: 4 }}>
                            {Title || "Featured Blog Title"}
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
                            {Description?.slice(0, 600) || ""}
                          </Typography>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
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
                      </>
                    )
                  })()}
                </Box>
              )}

              {/* Smaller Blog Cards */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  mt: currentPage === 1 && !searchQuery && blogs.length > 0 ? 6 : 0,
                }}
              >
                {currentBlogs.map((blog) => {
                  const { Title, Description, blog_image, category } = blog
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
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                        minHeight: 380,
                      }}
                    >
                      {blog_image?.url && (
                        <Box
                          sx={{
                            minWidth: { xs: "100%", md: 300 },
                            height: { xs: 250, md: "100%" },
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={Title || "Blog Image"}
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
                              {formatBlogDate(blog.publishedAt)}
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
                            <Typography sx={{ ...theme.typography.bodyFont_M }}>{category || "Category"}</Typography>
                          </Box>
                        </Box>

                        <Typography sx={{ ...theme.typography.bodyFontTitle_S, mt: 1 }}>{Title}</Typography>
                        <Typography
                          sx={{
                            ...theme.typography.bodyFont_M,
                            color: theme.palette.text.secondary,
                            flex: 1,
                            textAlign: "justify",
                            lineHeight: 1.7,
                          }}
                        >
                          {Description ? Description.slice(0, 350) + "..." : ""}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
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
                              Read
                            </Typography>
                            <ArrowForward sx={{ fontSize: 20 }} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
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
                        <Link
                          href={`/blog/category/${encodeURIComponent(category)}`}
                          style={{ textDecoration: "none" }}
                        >
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
                            {category} ({count})
                          </Box>
                        </Link>
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
                          <Typography
                            sx={{
                              ...theme.typography.bodyFont_M,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {year} ({totalPosts})
                          </Typography>
                          <ul style={{ listStyle: "none", padding: 0 }}>
                            {Object.keys(months).map((month) => (
                              <li key={month}>
                                <Link href={`/blog/archive/${year}/${month}`} style={{ textDecoration: "none" }}>
                                  <Box
                                    sx={{
                                      ...theme.typography.bodyFont_M,
                                      pl: 2,
                                      p: 1,
                                      cursor: "pointer",
                                      transition: "all 0.25s ease",
                                      color: theme.palette.text.secondary,
                                      "&:hover": {
                                        backgroundColor: theme.palette.section.blog.pastel,
                                        color: theme.palette.text.primary,
                                      },
                                    }}
                                  >
                                    {month} ({months[month]})
                                  </Box>
                                </Link>
                              </li>
                            ))}
                          </ul>
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
