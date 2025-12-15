"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import BlogPageHero from "@/components/blog/BlogPageHero";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import { ArrowForward } from "@mui/icons-material";
import LoadingSpinner from "@/components/LoadingSpinner";

function formatBlogDate(date, fallback = "Unknown Date") {
  try {
    if (!date) return fallback;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return fallback;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return parsedDate.toLocaleDateString(undefined, options);
  } catch (error) {
    return fallback;
  }
}

export default function SingleBlogPage() {
  const theme = useTheme();
  const { slug } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [categories, setCategories] = useState({});
  const [yearArchive, setYearArchive] = useState({});
  const [openYears, setOpenYears] = useState({});
  const [selectedArchive, setSelectedArchive] = useState({
    year: null,
    month: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  const toggleYear = (year) =>
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));

  useEffect(() => {
    if (!slug) return;

    const singlePost = axios.get(
      `${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`
    );
    const allPosts = axios.get(`${API_URL}/api/blogs?populate=*`);

    Promise.all([singlePost, allPosts])
      .then(([singleRes, allRes]) => {
        setBlog(singleRes.data.data[0] || null);

        const fetchedAll = allRes.data.data || [];
        setAllBlogs(fetchedAll);

        const categoryCounts = fetchedAll.reduce((acc, blog) => {
          const category = blog.category || "Other";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setCategories(categoryCounts);

        const archive = fetchedAll.reduce((acc, blog) => {
          const date = blog.date || blog.publishedAt || blog.createdAt;
          if (!date) return acc;
          const d = new Date(date);
          const year = d.getFullYear();
          const month = d.toLocaleString("en-US", { month: "long" });
          if (!acc[year]) acc[year] = {};
          if (!acc[year][month]) acc[year][month] = 0;
          acc[year][month]++;
          return acc;
        }, {});
        setYearArchive(archive);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [slug, API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ padding: "2rem" }}>Error: {error.message}</p>;
  if (!blog) return <p style={{ padding: "2rem" }}>Blog not found.</p>;

  const { Title, Description, blog_image, date, author_name, category } = blog;
  const imageUrl = "/images/blog/blog_single3.png";
  return (
    <main>
      <BlogPageHero />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Main Blog */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "5px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
              background: "#fff",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            {imageUrl && (
              <Box
                sx={{
                  minWidth: "220px",
                  height: "220px",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={imageUrl}
                  alt={Title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            )}

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Icons like blog page */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#6079F1",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/images/icons/icons8-calendar-32.png"
                    alt="Date"
                    width={20}
                    height={20}
                  />
                  {formatBlogDate(date)}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/images/icons/icons8-writing-64.png"
                    alt="Author"
                    width={20}
                    height={20}
                  />
                  {author_name || "Author"}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/images/icons/icons8-opened-folder-64.png"
                    alt="Category"
                    width={20}
                    height={20}
                  />
                  {category || "Category"}
                </Box>
              </Box>

              <Typography
                variant="h3"
                sx={{ fontWeight: 700, marginBottom: "1rem" }}
              >
                {Title}
              </Typography>

              <Typography sx={{ color: "#555", whiteSpace: "pre-line" }}>
                {Description}
              </Typography>

              {/* Share and Comment Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem",
                  alignItems: "center",
                  color: "#9D00A0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => alert("Share functionality coming soon!")}
                >
                  <ShareIcon /> Share
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setCommentsVisible((prev) => !prev)} // Toggle comments visibility
                >
                  <CommentIcon /> Comment
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Comment Section */}
          {commentsVisible && (
            <Box
              sx={{
                marginTop: "2rem",
                borderTop: "1px solid #ddd",
                paddingTop: "1rem",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Comments
              </Typography>

              {/* Comment Form */}
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newComment.trim()) {
                    setComments((prev) => [
                      ...prev,
                      {
                        text: newComment,
                        author: "You",
                        date: new Date().toLocaleDateString(),
                      },
                    ]);
                    setNewComment("");
                  }
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#6079F1",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </Box>

              {/* Display Comments */}
              <Box sx={{ marginTop: "2rem" }}>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <Box
                      key={index}
                      sx={{
                        marginBottom: "1rem",
                        padding: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#6079F1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.author[0].toUpperCase()}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ marginBottom: "0.5rem", color: "#555" }}
                        >
                          {comment.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6079F1",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{comment.author}</span>
                          <span>{comment.date}</span>
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>No comments yet. Be the first to comment!</Typography>
                )}
              </Box>
            </Box>
          )}

          {/* Previous and Next Post Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid #ddd",
            }}
          >
            {allBlogs.length > 0 && (
              <>
                {allBlogs.findIndex((b) => b.slug === slug) > 0 && (
                  <Link
                    href={`/blog/${allBlogs[allBlogs.findIndex((b) => b.slug === slug) - 1].slug}`}
                    style={{
                      color: "#6079F1",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    ← Previous post
                  </Link>
                )}
                {allBlogs.findIndex((b) => b.slug === slug) < allBlogs.length - 1 && (
                  <Link
                    href={`/blog/${allBlogs[allBlogs.findIndex((b) => b.slug === slug) + 1].slug}`}
                    style={{
                      color: "#6079F1",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Next post →
                  </Link>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Sidebar */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Search */}
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>Search</h3>
            <input
              type="text"
              placeholder="Search blogs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </Box>

          {/* Categories */}
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>
              Blog Categories
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Digital Marketing",
                "E-Commerce",
                "API",
                "Events & Conferences",
                "Startup Business",
                "Internships",
                "Other",
              ].map((cat, index) => {
                const count = categories[cat] || 0;
                return (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <Link
                      href={`/category/${cat}`}
                      style={{ color: "#6079F1" }}
                    >
                      {cat} ({count})
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Box>

          {/* Archive */}
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>
              Blog Archive
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Object.keys(yearArchive)
                .sort((a, b) => b - a)
                .map((year) => {
                  const months = yearArchive[year];
                  const totalPosts = Object.values(months).reduce(
                    (a, b) => a + b,
                    0
                  );
                  return (
                    <li key={year} style={{ marginBottom: "1rem" }}>
                      <div
                        onClick={() => toggleYear(year)}
                        style={{
                          cursor: "pointer",
                          color: "#6079F1",
                          fontWeight: 600,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {year} ({totalPosts})
                        </span>
                        <span>{openYears[year] ? "▲" : "▼"}</span>
                      </div>
                      {openYears[year] && (
                        <ul
                          style={{
                            listStyle: "none",
                            paddingLeft: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {Object.keys(months)
                            .sort(
                              (a, b) => new Date(`${b} 1`) - new Date(`${a} 1`)
                            )
                            .map((month) => (
                              <li
                                key={month}
                                style={{ marginBottom: "0.4rem" }}
                              >
                                <span
                                  onClick={() =>
                                    setSelectedArchive({ year, month })
                                  }
                                  style={{
                                    color:
                                      selectedArchive.year === Number(year) &&
                                      selectedArchive.month === month
                                        ? "#0288d1"
                                        : "#9D00A0",
                                    fontWeight:
                                      selectedArchive.year === Number(year) &&
                                      selectedArchive.month === month
                                        ? 700
                                        : 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  {month} ({months[month]})
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
