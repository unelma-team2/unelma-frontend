"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Blog</h1>
      <p>Latest news, product updates, and insights are coming soon!</p>
      <Link href="/">← Back to Home</Link>

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
                <Link href={`/blog/${slug}`} style={{ color: "#0070f3" }}>
                  Read more →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
