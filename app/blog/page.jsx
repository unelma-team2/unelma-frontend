"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import BlogPageHero from "@/components/blog/BlogPageHero";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Pagination from "@mui/material/Pagination";

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearArchive, setYearArchive] = useState({});
  const [openYears, setOpenYears] = useState({});
  const toggleYear = (year) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };
  const [selectedArchive, setSelectedArchive] = useState({
    year: null,
    month: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => {
        const fetchedBlogs = res.data.data;
        setBlogs(fetchedBlogs);

        // CATEGORY COUNTS
        const categoryCounts = fetchedBlogs.reduce((acc, blog) => {
          const category = blog.category || "Other";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setCategories(categoryCounts);

        // YEAR → MONTH ARCHIVE
        const archive = fetchedBlogs.reduce((acc, blog) => {
          const date = blog.date || blog.publishedAt || blog.createdAt;
          if (!date) return acc;

          const d = new Date(date);
          const year = d.getFullYear();
          const month = d.toLocaleString("en-US", { month: "long" }); // e.g., "November"

          if (!acc[year]) acc[year] = {};
          if (!acc[year][month]) acc[year][month] = 0;

          acc[year][month]++;
          return acc;
        }, {});
        setYearArchive(archive);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.date || b.publishedAt || b.createdAt) -
      new Date(a.date || a.publishedAt || a.createdAt)
  );

  const [featured, ...rest] = sortedBlogs;

  const filteredBlogs = rest.filter(
    (blog) =>
      blog.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.Description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginatedPosts = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main>
      <BlogPageHero />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "block",
            md: "block",
          },
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Blog Content */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Featured Blog */}
          {currentPage === 1 && !searchQuery && featured && (
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                background: "#fff",
                padding: "1.5rem",
              }}
            >
              {/* Meta Info */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "0.85rem",
                    md: "0.95rem",
                  },
                  color: "#6079F1",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/calendar.svg"
                    alt="Date"
                    width={20}
                    height={20}
                  />
                  {formatBlogDate(featured.date || featured.publishedAt)}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/author.svg"
                    alt="Author"
                    width={20}
                    height={20}
                  />
                  {featured.author_name || "Author's Name"}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/category.svg"
                    alt="Category"
                    width={20}
                    height={20}
                  />
                  {featured.category || "Category"}
                </Box>
              </Box>

              {/* Centered Title */}
              <Typography
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.5rem",
                    md: "2rem",
                  },
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                {featured.Title || "Featured Blog Title"}
              </Typography>

              <Box
                sx={{
                  width: { xs: "100%", md: "365px" },
                  height: "365px",
                  position: "relative",
                  flexShrink: 0,
                  float: { md: "left" },
                  marginRight: { md: "1.5rem" },
                  marginBottom: { md: "1.5rem" },
                }}
              >
                {featured.blog_image?.url && (
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                        md: "365px",
                      },
                      height: "365px",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={
                        featured.blog_image.url.startsWith("http")
                          ? featured.blog_image.url
                          : `${API_URL}${featured.blog_image.url}`
                      }
                      alt={featured.Title || "Featured Blog Image"}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 365px"
                      style={{
                        objectFit: "contain",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    />
                  </Box>
                )}

                {/* Description on the Right */}
                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: "#555",
                      marginBottom: "1rem",
                      fontSize: {
                        xs: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    {featured.Description || ""}
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
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <ShareIcon />
                      <Typography>Share</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <CommentIcon />
                      <Typography>Comment</Typography>
                    </Box>
                  </Box>

                  {/* Read More */}
                  <Box sx={{ marginTop: "auto", textAlign: "right" }}>
                    <Link
                      href={`/blog/${featured.slug}`}
                      style={{
                        color: "#9D00A0",
                        fontWeight: 600,
                      }}
                    >
                      Read more →
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Blog List */}
          {paginatedPosts.map((blog, index) => (
            <Box
              key={blog.id || index}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                background: "#fff",
                padding: "1.5rem",
              }}
            >
              {/* Meta Info */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "0.85rem",
                    md: "0.95rem",
                  },
                  color: "#6079F1",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/calendar.svg"
                    alt="Date"
                    width={20}
                    height={20}
                  />
                  {formatBlogDate(
                    blog.date || blog.publishedAt || blog.createdAt
                  )}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/author.svg"
                    alt="Author"
                    width={20}
                    height={20}
                  />
                  {blog.author_name || "Author's Name"}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Image
                    src="/icons/category.svg"
                    alt="Category"
                    width={20}
                    height={20}
                  />
                  {blog.category || "Category"}
                </Box>
              </Box>

              {/* Title */}
              <Typography
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.25rem",
                    md: "1.5rem",
                  },
                  margin: "0 0 1rem 0",
                }}
              >
                {blog.Title}
              </Typography>

              {/* Image */}
              {blog.blog_image?.url && (
                <Box
                  sx={{
                    width: "100%",
                    height: "220px",
                    position: "relative",
                    marginBottom: "1rem",
                  }}
                >
                  <Image
                    src={
                      blog.blog_image.url.startsWith("http")
                        ? blog.blog_image.url
                        : `${API_URL}${blog.blog_image.url}`
                    }
                    alt={blog.Title || "Blog Image"}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 220px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              {/* Description */}
              <Typography
                component="p"
                sx={{
                  color: "#555",
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "0.9rem",
                    md: "1rem",
                  },
                }}
              >
                {blog.Description ? blog.Description.slice(0, 300) + "..." : ""}
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
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <ShareIcon />
                  <Typography>Share</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <CommentIcon />
                  <Typography>Comment</Typography>
                </Box>
              </Box>

              {/* Read More */}
              <Box sx={{ marginTop: "auto", textAlign: "right" }}>
                <Link
                  href={`/blog/${blog.slug}`}
                  style={{
                    color: "#9D00A0",
                    fontWeight: 600,
                  }}
                >
                  Read more →
                </Link>
              </Box>
            </Box>
          ))}

          {/* Pagination Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={{
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                padding: "0.5rem 1rem",
                border: "none",
                background: "none",
                color: "#000",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ← Previous
            </button>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              siblingCount={1}
              boundaryCount={1}
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "1rem",
                  color: "#000",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#C1FCFF",
                  borderColor: "#000000",
                  color: "#0288d1",
                  fontWeight: "bold",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                padding: "0.5rem 1rem",
                border: "none",
                background: "none",
                color: "#000",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Next →
            </button>
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
          <Box>
            <input
              type="text"
              placeholder="Search blogs"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
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
              ].map((category, index) => {
                const count = categories[category] || 0;

                return (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <Link
                      href={`/category/${category}`}
                      style={{ color: "#6079F1" }}
                    >
                      {category} ({count})
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Box>

          {/* Archive */}
          <Box>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              Blog Archive
            </Typography>

            {/* Clear Filter Button */}
            {selectedArchive.year && selectedArchive.month && (
              <button
                onClick={() => setSelectedArchive({ year: null, month: null })}
                style={{
                  marginBottom: "1rem",
                  color: "#9D00A0",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
              >
                ← Clear Filter ({selectedArchive.month} {selectedArchive.year})
              </button>
            )}

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
                      {/* YEAR TITLE */}
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

                      {/* COLLAPSIBLE MONTH LIST */}
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
                              (a, b) => new Date(`${b} 1`) - new Date(`${a} 1`) // month sort
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
