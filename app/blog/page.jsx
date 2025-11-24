"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import BlogPageHero from "@/components/blog/BlogPageHero";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

function formatBlogDate(date, fallback) {
  const d = date || fallback;
  return d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  // Filter blogs by search term
  let filteredBlogs = blogs.filter((blog) => {
    if (!searchTerm) return true;
    return (
      blog.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.Description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filter by category
  if (selectedCategory) {
    filteredBlogs = filteredBlogs.filter(
      (blog) => blog.category === selectedCategory
    );
  }

  if (selectedYear) {
    filteredBlogs = filteredBlogs.filter((blog) => {
      const date = new Date(blog.date || blog.publishedAt || blog.createdAt);
      return (
        date.getFullYear() === selectedYear &&
        (!selectedMonth ||
          date.toLocaleString("en-GB", { month: "long" }) === selectedMonth)
      );
    });
  }

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) =>
      new Date(b.date || b.publishedAt || b.createdAt) -
      new Date(a.date || a.publishedAt || a.createdAt)
  );

  const [featured, ...rest] = sortedBlogs;

  const categories = [
    "Digital Marketing",
    "E-Commerce",
    "API",
    "Events & Conferences",
    "Startup Business",
    "Internships",
    "Other",
  ];

  const archive = [
    {
      year: 2025,
      months: [
        "November",
        "October",
        "September",
        "August",
        "July",
        "June",
        "May",
        "April",
        "March",
        "February",
        "January",
      ],
    },
    { year: 2024, months: [] },
    { year: 2023, months: [] },
  ];

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <BlogPageHero />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "start",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          {featured && (
            <div
              style={{
                display: "flex",
                border: "2px solid #222",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                background: "#fff",
                marginBottom: "2rem",
                padding: "2rem",
                height: "760px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {featured.blog_image?.url && (
                <div
                  style={{
                    minWidth: "220px",
                    height: "220px",
                    position: "relative",
                    flexShrink: 0,
                    marginRight: "2rem",
                  }}
                >
                  <Image
                    src={featured.blog_image.url}
                    alt={featured.Title || "Blog Image"}
                    fill
                    priority
                    sizes="220px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                    color: "#6079F1",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Image
                      src="/icons/calendar.svg"
                      alt="Date"
                      width={20}
                      height={20}
                    />
                    {formatBlogDate(featured.date, featured.publishedAt)}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Image
                      src="/icons/author.svg"
                      alt="Author"
                      width={20}
                      height={20}
                    />
                    {featured.author_name || "Author's Name"}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Image
                      src="/icons/category.svg"
                      alt="Category"
                      width={20}
                      height={20}
                    />
                    {featured.category || "Category"}
                  </span>
                </div>
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    margin: "0 0 1rem 0",
                  }}
                >
                  {featured.Title || "Blog Title"}
                </h2>
                <p style={{ color: "#2F2E2E", marginBottom: "1.5rem" }}>
                  {featured.Description
                    ? featured.Description.slice(0, 1200) + "..."
                    : ""}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    alignItems: "center",
                    color: "#9D00A0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <ShareIcon style={{ cursor: "pointer" }} />
                    <span>Share</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <CommentIcon style={{ cursor: "pointer" }} />
                    <span>Comment</span>
                  </div>
                </div>
                <div style={{ marginTop: "auto", textAlign: "right" }}>
                  <Link
                    href={`/blog/${featured.slug}`}
                    style={{ color: "#9D00A0", fontWeight: 600 }}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {rest.map((blog, index) => {
              const imageUrl = blog.blog_image?.url
                ? blog.blog_image.url.startsWith("http")
                  ? blog.blog_image.url
                  : `${API_URL}${blog.blog_image.url}`
                : "";

              return (
                <div
                  key={blog.id || index}
                  style={{
                    display: "flex",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                    background: "#fff",
                    height: "380px",
                    maxWidth: "761px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {imageUrl && (
                    <div
                      style={{
                        minWidth: "220px",
                        height: "100%",
                        position: "relative",
                        flexShrink: 0,
                        marginRight: "2rem",
                      }}
                    >
                      <Image
                        src={imageUrl}
                        alt={blog.Title || "Blog Image"}
                        fill
                        priority={index === 0}
                        sizes="220px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        fontSize: "0.95rem",
                        color: "#6079F1",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          src="/icons/calendar.svg"
                          alt="Date"
                          width={20}
                          height={20}
                        />
                        {formatBlogDate(blog.date, blog.publishedAt)}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          src="/icons/author.svg"
                          alt="Author"
                          width={20}
                          height={20}
                        />
                        {blog.author_name || "Author's Name"}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          src="/icons/category.svg"
                          alt="Category"
                          width={20}
                          height={20}
                        />
                        {blog.category || "Category"}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      {blog.Title}
                    </h2>
                    <p
                      style={{
                        color: "#555",
                        marginBottom: "1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {blog.Description
                        ? blog.Description.slice(0, 300) + "..."
                        : ""}
                    </p>
                    <div style={{ marginTop: "auto", textAlign: "right" }}>
                      <Link
                        href={`/blog/${blog.slug}`}
                        style={{ color: "#9D00A0", fontWeight: 600 }}
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignSelf: "start",
            maxWidth: "249px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Search */}
          <section
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search blogs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "80%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #aaa",
                  marginRight: "0.5rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "none",
                  background: "#222",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                🔍
              </button>
            </form>
          </section>

          {/* Categories */}
          <section
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>
              Blog Categories
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {categories.map((cat) => (
                <li key={cat} style={{ marginBottom: "0.5rem" }}>
                  <button
                    style={{
                      background: selectedCategory === cat ? "#6079F1" : "none",
                      color: selectedCategory === cat ? "#fff" : "#6079F1",
                      border: "none",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            {selectedCategory && (
              <button
                style={{
                  marginTop: "1rem",
                  background: "#eee",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCategory(null)}
              >
                Clear Category Filter
              </button>
            )}
          </section>

          <section
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>
              Blog Archive
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {archive.map((item) => (
                <li key={item.year} style={{ marginBottom: "0.5rem" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#222",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedYear(item.year);
                      setSelectedMonth(null);
                    }}
                  >
                    {item.year}
                  </button>
                  {item.months.length > 0 && selectedYear === item.year && (
                    <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
                      {item.months.map((month) => (
                        <li key={month}>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#6079F1",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedMonth(month)}
                          >
                            {month}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {(selectedYear || selectedMonth) && (
              <button
                style={{
                  marginTop: "1rem",
                  background: "#eee",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedYear(null);
                  setSelectedMonth(null);
                }}
              >
                Clear Archive Filter
              </button>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
