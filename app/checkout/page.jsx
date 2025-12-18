"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Box, Card, CardContent, Typography, Stack, useTheme, IconButton } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share"
import CommentIcon from "@mui/icons-material/Comment"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import EditNoteIcon from "@mui/icons-material/EditNote"
import CategoryIcon from "@mui/icons-material/Category"
import BackToTopButton from "@/components/BackToTopButton"
import LoadingSpinner from "@/components/LoadingSpinner"
import SearchInput from "@/components/SearchInput"
import BlogPageHero from "@/components/blog/BlogPageHero"

function formatBlogDate(date) {
  if (!date) return "Unknown Date"
  const d = new Date(date)
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function SingleBlogPage() {
  const theme = useTheme()
  const { slug } = useParams()

  const [blog, setBlog] = useState(null)
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [categories, setCategories] = useState({})
  const [yearArchive, setYearArchive] = useState({})
  const [openYears, setOpenYears] = useState({})
  const [relatedPosts, setRelatedPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const toggleYear = (year) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }

  useEffect(() => {
    if (!slug) return

    const singlePost = axios.get(`${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`)
    const allPosts = axios.get(`${API_URL}/api/blogs?populate=*`)

    Promise.all([singlePost, allPosts])
      .then(([singleRes, allRes]) => {
        const currentBlog = singleRes.data.data[0] || null
        const allBlogsData = allRes.data.data || []

        setBlog(currentBlog)
        setAllBlogs(allBlogsData)

        const categoryCounts = allBlogsData.reduce((acc, b) => {
          const cat = b.category || "Other"
          acc[cat] = (acc[cat] || 0) + 1
          return acc
        }, {})
        setCategories(categoryCounts)

        const archive = allBlogsData.reduce((acc, blog) => {
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

        if (currentBlog) {
          const currentCategory = currentBlog.category
          const related = allBlogsData
            .filter((b) => b.id !== currentBlog.id && (b.category || "Other") === currentCategory)
            .slice(0, 3)
          setRelatedPosts(related)
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [slug, API_URL])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          text: newComment,
          author: "You",
          date: new Date().toLocaleDateString(),
        },
      ])
      setNewComment("")
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <Box sx={{ p: 4, textAlign: "center" }}>Error: {error.message}</Box>
  if (!blog) return <Box sx={{ p: 4, textAlign: "center" }}>Blog not found.</Box>

  const { Title, Description, blog_image, createdAt, category } = blog
  const imageUrl = blog_image?.url || "/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"

  const currentIndex = allBlogs.findIndex((b) => b.slug === slug)
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null

  return (
    <main>
      <BlogPageHero />

      <Box sx={{ px: { xs: 2, md: "150px" }, py: 8, mb: 10 }}>
        <Box sx={{ display: "flex", gap: 8, flexDirection: { xs: "column", lg: "row" } }}>
          {/* MAIN CONTENT */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                ...theme.mixins.borderStyle,
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "relative", height: { xs: 300, md: 500 }, width: "100%" }}>
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={Title || "Blog"}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>

              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Stack direction="row" spacing={3} mb={5} flexWrap="wrap" alignItems="center">
                  <IconButton
                    size="small"
                    sx={{
                      borderRadius: 100,
                      border: theme.mixins.borderStyle,
                      p: 0.6,
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
                    <CalendarTodayIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <Typography sx={{ ...theme.typography.bodyFont_M }}>{formatBlogDate(createdAt)}</Typography>

                  <IconButton
                    size="small"
                    sx={{
                      borderRadius: 100,
                      border: theme.mixins.borderStyle,
                      p: 0.6,
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
                    <EditNoteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <Typography sx={{ ...theme.typography.bodyFont_M }}>Author</Typography>

                  <IconButton
                    size="small"
                    sx={{
                      borderRadius: 100,
                      border: theme.mixins.borderStyle,
                      p: 0.6,
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
                    <CategoryIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <Typography sx={{ ...theme.typography.bodyFont_M }}>{category || "Category"}</Typography>
                </Stack>

                <Typography sx={{ ...theme.typography.headingFont_S, mb: 5, mt: 4 }}>{Title}</Typography>

                <Typography
                  sx={{
                    ...theme.typography.bodyFont_L,
                    color: theme.palette.text.secondary,
                    whiteSpace: "pre-line",
                    mb: 6,
                    mt: 4,
                  }}
                >
                  {Description}
                </Typography>

                <Stack direction="row" spacing={4} alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      color: theme.palette.primary.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: theme.palette.section.products.vibrant,
                      },
                    }}
                    onClick={() => alert("Share functionality coming soon!")}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: 100,
                        border: theme.mixins.borderStyle,
                        p: 0.6,
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
                      <ShareIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>Share</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      color: theme.palette.primary.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: theme.palette.section.products.vibrant,
                      },
                    }}
                    onClick={() => alert("Comment functionality coming soon!")}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: 100,
                        border: theme.mixins.borderStyle,
                        p: 0.6,
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
                      <CommentIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>Comment</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} passHref style={{ textDecoration: "none", flex: 1 }}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      color: theme.palette.section.about.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        color: theme.palette.section.products.vibrant,
                        transform: "translateX(-4px)",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>Previous Post</Typography>
                  </Box>
                </Link>
              ) : (
                <Box sx={{ flex: 1 }} />
              )}

              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} passHref style={{ textDecoration: "none", flex: 1 }}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1,
                      cursor: "pointer",
                      color: theme.palette.section.about.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        color: theme.palette.section.products.vibrant,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Typography sx={{ ...theme.typography.bodyFont_M }}>Next Post</Typography>
                    <ArrowForwardIcon />
                  </Box>
                </Link>
              ) : (
                <Box sx={{ flex: 1 }} />
              )}
            </Box>

            {relatedPosts.length > 0 && (
              <Box sx={{ mt: 8 }}>
                <Typography sx={{ ...theme.typography.headingFont_S, mb: 4 }}>Related Posts</Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                    gap: 3,
                  }}
                >
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} passHref style={{ textDecoration: "none" }}>
                      <Card
                        sx={{
                          ...theme.mixins.borderStyle,
                          height: "100%",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Box sx={{ position: "relative", height: 180, width: "100%" }}>
                          <Image
                            src="/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png"
                            alt={post.Title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                          <Typography sx={{ ...theme.typography.bodyFontTitle_S, mb: 1 }}>{post.Title}</Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography
                              sx={{ ...theme.typography.bodyFont_S, color: theme.palette.section.blog.muted }}
                            >
                              {post.category || "Category"}
                            </Typography>
                            <Typography
                              sx={{ ...theme.typography.bodyFont_S, color: theme.palette.section.blog.muted }}
                            >
                              {formatBlogDate(post.createdAt)}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Sidebar - Same as blog page */}
          <Box sx={{ width: { xs: "100%", lg: 350 }, flexShrink: 0 }}>
            <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
              <Typography
                sx={{ ...theme.typography.bodyFontTitle_M, textTransform: "uppercase", textAlign: "center", mb: 3 }}
              >
                Search
              </Typography>
              <SearchInput placeholder="Search blogs..." size="small" fullWidth onSearch={(q) => setSearchQuery(q)} />
            </Box>

            <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
              <Typography
                sx={{ ...theme.typography.bodyFontTitle_M, textTransform: "uppercase", textAlign: "center", mb: 3 }}
              >
                Blog Categories
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Object.keys(categories).map((category) => {
                  const count = categories[category] || 0
                  return (
                    <li key={category} style={{ marginBottom: "0.75rem" }}>
                      <Link href={`/blog/category/${encodeURIComponent(category)}`} style={{ textDecoration: "none" }}>
                        <Box
                          sx={{
                            ...theme.typography.bodyFont_M,
                            p: 1.5,
                            cursor: "pointer",
                            transition: "all 0.25s ease",
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

            <Box sx={{ ...theme.mixins.borderStyle, p: 3 }}>
              <Typography
                sx={{ ...theme.typography.bodyFontTitle_M, textTransform: "uppercase", textAlign: "center", mb: 3 }}
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
                            alignItems: "center",
                            p: 1.5,
                            transition: "all 0.25s ease",
                            "&:hover": {
                              backgroundColor: theme.palette.section.blog.pastel,
                            },
                          }}
                        >
                          <span>
                            {year} ({totalPosts})
                          </span>
                          <span>{openYears[year] ? "▲" : "▼"}</span>
                        </Box>
                        {openYears[year] && (
                          <ul style={{ listStyle: "none", paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {Object.keys(months).map((month) => (
                              <li key={month} style={{ marginBottom: "0.5rem" }}>
                                <Box
                                  sx={{
                                    ...theme.typography.bodyFont_S,
                                    cursor: "pointer",
                                    p: 1,
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                      backgroundColor: theme.palette.section.blog.pastel,
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
      </Box>
      <BackToTopButton />
    </main>
  )
}
