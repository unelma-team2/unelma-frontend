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
import CreateIcon from '@mui/icons-material/Create';
import Carousel from "@/components/Carousel.jsx"
import LoadingSpinner from "@/components/LoadingSpinner"
//import { o } from "framer-motion/dist/types.d-DagZKalS"

export default function RecentBlogPosts() {
  const theme = useTheme()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  const placeholderImages = [
    "/images/blog/blog1.png",
    "/images/blog/blog2.png",
    "/images/blog/blog3.png",
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

  //if (loading) return <LoadingSpinner />
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
          boxShadow: `-8px -6px 0px ${theme.palette.section.blog.main}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 2,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `-10px -8px 0px ${theme.palette.section.blog.vibrant}`,
          },

          "&:hover .dateBadge": {
            transform: "scale(1.08)",
            boxShadow: `inset -4px -3px 0px ${theme.palette.primary.main}`,
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
                border: theme.mixins.borderStyle,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                boxShadow: `-4px -3px 0px ${theme.palette.primary.main}`,
              }}
            >
              <Typography sx={{ ...theme.typography.bodyFontTitle_S }}>{dayMonth}</Typography>
              <Typography sx={{ ...theme.typography.bodyFont_M }}>{year}</Typography>
            </Box>
          </Box>
        </Link>

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={4} mb={4}>
            <Stack
              direction="row"
              spacing={0.8}
              alignItems="center"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <CreateIcon sx={{ 
                fontSize: 28, 
                color: theme.palette.text.secondary,  
                borderRadius: 100,
                border: "2px solid" + theme.palette.text.secondary, 
                padding: 0.5, 
                backgroundColor: theme.palette.section.blog.soft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }} />
              <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.text.secondary }}>
                Author
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.7}
              alignItems="center"
              component={Link}
              href="#"
              sx={{
                textDecoration: "none",
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <CategoryIcon sx={{ 
                fontSize: 28, 
                color: theme.palette.text.secondary,  
                borderRadius: 100,
                border: "2px solid" + theme.palette.text.secondary, 
                padding: 0.5, 
                backgroundColor: theme.palette.section.blog.soft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }} />
              <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.text.secondary }}>
                Category
              </Typography>
            </Stack>
          </Stack>

          <Typography
            className="blogTitle"
            sx={{
              ...theme.typography.bodyFontTitle_M_Card,
              mb: 4,
              textAlign: "center",
              transition: "transform 0.25s ease, color 0.25s ease",
                  "&:hover": {
            transform: "scale(1.07)",
            color: theme.palette.primary.main,
          }}}
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
                   boxShadow: "none"
                },
              }}
            >
              <ShareIcon sx={{ fontSize: 24 }} />
            </IconButton>
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
                   boxShadow: "none"
                },
              }}
            >
              <CommentIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Stack>

          <Link href={`/blog/${slug}`} passHref style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                ...theme.typography.bodyFontTitle_S,
                color: theme.palette.section.about.main,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "3px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                  color: theme.palette.section.products.vibrant,
                  transform: "scale(1.05)",
                },
              }}
            >
              Read More <ArrowForwardIcon sx={{ fontSize: 24 }} />
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
            boxShadow: `inset 0px -5px 0px ${theme.palette.section.blog.pastel}, inset -0px -14px 0px ${theme.palette.section.blog.main}`,
          }}
        />

        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
              boxShadow: `-0px -3px 0px ${theme.palette.section.blog.pastel}, 0px -12px 0px ${theme.palette.section.blog.main}`,
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
