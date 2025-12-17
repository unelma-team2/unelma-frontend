"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { Box, Card, CardContent, Typography, IconButton, Stack, useTheme } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ShareIcon from "@mui/icons-material/Share"
import CommentIcon from "@mui/icons-material/Comment"
import EditNoteIcon from "@mui/icons-material/EditNote"
import CategoryIcon from "@mui/icons-material/Category"
import Carousel from "@/components/Carousel.jsx"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function RecentBlogPosts() {
  const theme = useTheme()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const placeholderImages = [
    "/images/blog/blog_placeholder1.jpg",
    "/images/blog/blog_placeholder2.jpg",
    "/images/blog/blog_placeholder3.jpg",
  ]

  const getPlaceholderImage = (id) => {
    const index = id % placeholderImages.length
    return placeholderImages[index]
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [API_URL])

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error loading blogs: {error.message}</p>
  if (!blogs?.length) return <p>No blogs found.</p>

  const headerHeight = 180

  const renderBlogCard = (blog) => {
    const { id, Title, Description, slug, blog_image, createdAt } = blog.attributes || blog

    const imageUrl = blog_image?.data?.attributes?.url
      ? blog_image.data.attributes.url.startsWith("http")
        ? blog_image.data.attributes.url
        : `${API_URL}${blog_image.data.attributes.url}`
      : getPlaceholderImage(id)
    const date = new Date(createdAt)
    const dayMonth = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`
    const year = date.getFullYear()

    return (
      <Card
        key={id}
        sx={{
          width: 300,
          minWidth: 300,
          height: 800,
          boxShadow: `-10px -8px 0px ${theme.palette.section.blog.main}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 2,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `-4px -4px 0px ${theme.palette.section.blog.main}, -6px -6px 0px ${theme.palette.section.blog.vibrant}`,
          },

          "&:hover .dateBadge": {
            transform: "scale(1.08)",
            boxShadow: `-2px -2px 0px ${theme.palette.section.blog.vibrant}`,
          },

          "&:hover .blogTitle": {
            transform: "scale(1.05)",
            color: theme.palette.section.careers.vibrant,
          },
        }}
      >
        <Link href={`/blog/${slug}`} passHref style={{ textDecoration: "none" }}>
          <Box sx={{ position: "relative", height: 240, width: "100%", cursor: "pointer" }}>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={Title || "Blog Image"}
              fill
              style={{ objectFit: "cover" }}
            />
            <Box
              className="dateBadge"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                background: theme.palette.section.blog.pastel,
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: `2px solid ${theme.palette.primary.main}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <Typography sx={{ ...theme.typography.bodyFontTitle_S }}>{dayMonth}</Typography>
              <Typography sx={{ ...theme.typography.bodyFont_M }}>{year}</Typography>
            </Box>
          </Box>
        </Link>

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={2} mb={4}>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <EditNoteIcon sx={{ fontSize: 20, color: theme.palette.section.blog.muted }} />
              <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.section.blog.muted }}>
                Author
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CategoryIcon sx={{ fontSize: 20, color: theme.palette.section.blog.muted }} />
              <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.section.blog.muted }}>
                Category
              </Typography>
            </Stack>
          </Stack>

          <Typography
            className="blogTitle"
            sx={{
              ...theme.typography.bodyFontTitle_M_Card,
              mb: 2,
              textAlign: "center",
              transition: "transform 0.25s ease, color 0.25s ease",
            }}
          >
            {Title}
          </Typography>
          <Typography sx={{ ...theme.typography.bodyFont_M, textAlign: "justify" }}>
            {Description?.slice(0, 300)}...
          </Typography>
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 2, mt: "auto" }}>
          <Stack direction="row" spacing={1.5}>
            <IconButton
              size="small"
              sx={{
                color: theme.palette.section.careers.main,
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <ShareIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: theme.palette.section.careers.main,
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CommentIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Link href={`/blog/${slug}`} passHref style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                ...theme.typography.bodyFontTitle_S,
                color: theme.palette.section.contact.muted,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "3px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                  color: theme.palette.section.careers.main,
                  transform: "scale(1.05)",
                },
              }}
            >
              Read More <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </Typography>
          </Link>
        </Box>
      </Card>
    )
  }

  return (
    <Box sx={{ width: "100%", mt: 16 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
            boxShadow: `inset 0px -8px 0px ${theme.palette.section.blog.main}, inset -0px -12px 0px ${theme.palette.section.blog.vibrant}`,
          }}
        />

        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
            boxShadow: `-10px -8px 0px ${theme.palette.section.blog.main}, -14px -12px 0px ${theme.palette.section.blog.vibrant}`,
          }}
        >
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              textAlign: { xs: "center", md: "right" },
              marginRight: { md: "100px" },
            }}
          >
            Recent Blog Posts
          </Typography>
        </Box>

        <Box sx={{ ...theme.mixins.bottomLineLeft }} />
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
        <Carousel items={blogs} renderItem={renderBlogCard} />
      </Box>
    </Box>
  )
}
