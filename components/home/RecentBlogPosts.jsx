"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import {
  Box,
  Card,
  CardContent,
  Button,
  Border,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";

import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RecentBlogPosts() {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    const API_URL = "http://localhost:1337";



  // --- Carousel Settings ---
  const CARD_WIDTH = 300;
  const VISIBLE_CARDS = 3;
  const GAP = 20;
  const TOTAL_WIDTH = CARD_WIDTH + GAP;

  const [index, setIndex] = useState(VISIBLE_CARDS); // start at "middle" clone set
  const sliderRef = useRef(null);
  const isTransitioning = useRef(false);
  const startXRef = useRef(null);

  // Fetch blogs
  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  // Infinite loop clones
  const extendedBlogs = [
    ...blogs.slice(-VISIBLE_CARDS),
    ...blogs,
    ...blogs.slice(0, VISIBLE_CARDS),
  ];

  // Handle CSS reset after fake slide
  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (index >= blogs.length + VISIBLE_CARDS) {
      setIndex(VISIBLE_CARDS);
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = `translateX(-${
        VISIBLE_CARDS * TOTAL_WIDTH
      }px)`;
    }
    if (index < VISIBLE_CARDS) {
      setIndex(blogs.length + VISIBLE_CARDS - 1);
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = `translateX(-${
        (blogs.length + VISIBLE_CARDS - 1) * TOTAL_WIDTH
      }px)`;
    }
  };

  // Slide next / previous
  const slideTo = (newIndex) => {
    if (isTransitioning.current) return;

    isTransitioning.current = true;
    setIndex(newIndex);

    requestAnimationFrame(() => {
      sliderRef.current.style.transition = "transform .5s ease";
      sliderRef.current.style.transform = `translateX(-${
        newIndex * TOTAL_WIDTH
      }px)`;
    });
  };

  const handleNext = () => slideTo(index + 1);
  const handlePrev = () => slideTo(index - 1);

  // Touch swipe
  const handlePointerDown = (e) => {
    startXRef.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const handlePointerUp = (e) => {
    if (!startXRef.current) return;

    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    const diff = startXRef.current - endX;

    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();

    startXRef.current = null;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <Box sx={{ py: 10, px: 3, maxWidth: "1400px", mx: "auto", textAlign: "right" }}>
      <Typography variant="h2" fontWeight={700} mb={6}>
        Recent Blog Posts
      </Typography>

      {/* Infinite Carousel */}
      <Box
        sx={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        <Box
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            scrollSnapAlign: "start",
            width: `${extendedBlogs.length * TOTAL_WIDTH}px`,
          }}
        >
          {extendedBlogs.map((blog, i) => {
            const realIndex = i;
            const { id, Title, Description, slug, blog_image, createdAt } =
              blog.attributes || blog;

               // Fetch blog image
            const imageUrl = blog_image?.data?.attributes?.url
            ? blog_image.data.attributes.url.startsWith("http")
            ? blog_image.data.attributes.url
            : `${API_URL}${blog_image.data.attributes.url}`
            : "/images/blog/placeholder.png"; 

            const date = new Date(createdAt);

            const dayMonth = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
            const year = date.getFullYear();

            return (
              <motion.div
                key={id || `${slug}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ scrollSnapAlign: "start" }}
              >
                <Card
                  sx={{
                    width: CARD_WIDTH,
                    height: 600,
                    flexShrink: 0,
                    borderRadius: "10px",
                    border: `2px solid ${theme.palette.primary.main}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    position: "relative",
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
                        background: theme.palette.background.darkMint,
                        width: 70,
                        height: 70,
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
                      <div style={{ fontSize: "12pt", fontWeight: "bold" }}>{dayMonth}</div>
                      <div style={{ fontSize: "10pt" }}>{year}</div>
                  </div>
                    </Box>
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={2} mb={4}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <PersonIcon sx={{ fontSize: 16, color: "#777" }} />
                        <Typography variant="caption">Author’s Name</Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <CategoryIcon sx={{ fontSize: 16, color: "#777" }} />
                        <Typography variant="caption">Category</Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="h6" fontWeight={600} mb={1} align="center" >
                      {Title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" align="justify">
                      {Description?.slice(0, 300)}...
                    </Typography>
                  </CardContent>

                  {/* Bottom Bar: Share + Comment + Read More */}
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
                        Read More <ArrowForwardIcon sx={{ fontSize: 18 }} />
                      </Typography>
                    </Link>
                  </Box>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </Box>

      {/* Arrows */}
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3 }}>
        <IconButton onClick={handlePrev}>
          <ArrowCircleLeftIcon sx={{ fontSize: 48 }} />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ArrowCircleRightIcon sx={{ fontSize: 48 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
