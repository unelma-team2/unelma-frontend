
"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function RecentBlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  

  const cardSx = {
    height: "100%",
    border: "2px solid black",
    borderRadius: "20px",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const imageContainerSx = {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "#f0faff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 4,
    px: 3,
    height: 250,
  };

  const imageSx = {
    width: "auto",
    height: "200px",
    objectFit: "contain",
  };


  return (
    <main style={{ padding: "2rem" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {blogs.map((blog, index) => {
          const { id, Title, Description, blog_image, slug } = blog;
          const imageUrl = blog_image?.url
            ? blog_image.url.startsWith("http")
              ? blog_image.url
              : `${API_URL}${blog_image.url}`
            : "";

          return (
            <div
              key={id || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={Title || "Blog Image"}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div style={{ padding: "1rem" }}>
                <h2>{Title}</h2>
                <p style={{ color: "#555" }}>
                  {Description ? Description.slice(0, 150) + "..." : ""}
                </p>
                <Link href={`/blog/${slug}`}>
  <button onClick={() => localStorage.setItem("fromPage", "home")}>
    Read More
  </button>
</Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
