"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

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
        {blogs.map((blog) => {
          const { id, Title, Description, Blog_image, slug } = blog;
          const imageUrl = Blog_image?.url ? `${API_URL}${Blog_image.url}` : "";

          return (
            <div
              key={id}
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
                    borderRadius: "10px",
                    overflow: "hidden", // ensures corners are clipped
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={Title}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div style={{ padding: "1rem" }}>
                <h2>{Title}</h2>
                <p style={{ color: "#555" }}>{Description?.slice(0, 150)}...</p>
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
