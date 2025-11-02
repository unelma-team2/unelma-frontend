"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SingleBlogPage() {
  const { slug } = useParams(); // Gets slug from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`)
      .then((res) => {
        const blogData = res.data.data[0]; // get first matching blog
        setBlog(blogData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading blog...</p>;
  if (error)
    return (
      <p style={{ padding: "2rem" }}>Error loading blog: {error.message}</p>
    );
  if (!blog) return <p style={{ padding: "2rem" }}>Blog not found.</p>;

  const { Title, Description, Blog_image } = blog;
  const imageUrl = Blog_image?.url ? `${API_URL}${Blog_image.url}` : "";

  return (
    <main style={{ padding: "2rem" }}>
      <Link href="/blog">← Back to all blogs</Link>

      <h1 style={{ marginTop: "1rem", fontSize: "2rem", fontWeight: "bold" }}>
        {Title}
      </h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={Title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "10px",
            marginTop: "1rem",
          }}
        />
      )}

      <p style={{ marginTop: "1.5rem", lineHeight: "1.7", color: "#333" }}>
        {Description}
      </p>
    </main>
  );
}
