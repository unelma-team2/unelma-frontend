"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SingleBlogPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`)
      .then((res) => setBlog(res.data.data[0]))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [slug, API_URL]);

  const fromPage =
    typeof window !== "undefined" ? localStorage.getItem("fromPage") : null;

  const handleBack = () => {
    if (fromPage === "home") router.push("/");
    else router.push("/blog");
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading blog...</p>;
  if (error)
    return (
      <p style={{ padding: "2rem" }}>Error loading blog: {error.message}</p>
    );
  if (!blog) return <p style={{ padding: "2rem" }}>Blog not found.</p>;

  const { Title, Description, blog_image } = blog;
  const imageUrl = blog_image?.url
    ? blog_image.url.startsWith("http")
      ? blog_image.url
      : `${API_URL}${blog_image.url}`
    : "";

  return (
    <main style={{ padding: "2rem" }}>
      <button
        onClick={handleBack}
        style={{
          marginBottom: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#0070f3",
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{Title}</h1>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={Title}
          width={800}
          height={400}
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
