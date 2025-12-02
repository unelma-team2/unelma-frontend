"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Stack, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LoadingSpinner from "@/components/LoadingSpinner";
import Carousel from "@/components/Carousel.jsx";

export default function RecentBlogPosts() {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading blogs: {error.message}</p>;
  if (!blogs?.length) return <p>No blogs found.</p>;

  const renderBlogCard = (blog) => {
    const { id, Title, Description, slug, blog_image, createdAt } = blog.attributes || blog;

    const imageUrl = blog_image?.data?.attributes?.url
      ? blog_image.data.attributes.url.startsWith("http")
        ? blog_image.data.attributes.url
        : `${API_URL}${blog_image.data.attributes.url}`
      : "/images/blog/placeholder.png";

    const date = new Date(createdAt);
    const dayMonth = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
    const year = date.getFullYear();

    return (
      <Card
        key={id}
        sx={{
          width: "100%",
          minWidth: 300,
          height: 650,
          borderRadius: "10px",
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 220 }}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={Title || "Blog Image"}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              background: theme.palette.background.lightMint,
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `2px solid ${theme.palette.primary.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14pt", fontWeight: "bold" }}>{dayMonth}</div>
              <div style={{ fontSize: "12pt" }}>{year}</div>
            </div>
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={2} mb={4}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonIcon sx={{ fontSize: 20, color: "#777" }} />
              <Typography variant="bodyreg12">Author</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CategoryIcon sx={{ fontSize: 20, color: "#777" }} />
              <Typography variant="bodyreg12">Category</Typography>
            </Stack>
          </Stack>

          <Typography variant="h4" fontWeight={600} mb={2} align="center" >
            {Title}
          </Typography>
          <Typography variant="body14reg" align="justify">
            {Description?.slice(0, 300)}...
          </Typography>
        </CardContent>

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pb: 2,
            mt: "auto",
          }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <CommentIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Link href={`/blog/${slug}`} passHref>
            <Typography
              sx={{
                fontSize: 20,
                color: "#9D00A0",
                textDecoration: "none",
                textTransform: "uppercase",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Read More <ArrowForwardIcon sx={{ fontSize: 24 }} />
            </Typography>
          </Link>
        </Box>
      </Card>
    );
  };

  return (
    <Box sx={{ py: 10, px: 3, maxWidth: "1400px", mx: "auto", textAlign: "right" }}>
      <Typography variant="h2" fontWeight={700} mb={6}>
        Recent Blog Posts
      </Typography>

      <Carousel items={blogs} renderItem={renderBlogCard} />
    </Box>
  );
}
