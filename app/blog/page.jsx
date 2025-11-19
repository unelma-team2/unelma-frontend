"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import BlogPageHero from "@/components/blog/BlogPageHero";

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

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.publishedAt || b.createdAt) -
      new Date(a.publishedAt || a.createdAt)
  );

  const [featured, ...rest] = sortedBlogs;

  return (
    <main style={{ padding: "2rem" }}>
      <BlogPageHero />
      
      {featured && (
        <div
          style={{
            display: "flex",
            border: "2px solid #222",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            background: "#fff",
            marginBottom: "2rem",
            padding: "2rem",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >

          {featured.attributes?.blog_image?.data?.attributes?.url && (
            <div
              style={{
                minWidthL: "220px",
                height: "220px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src={
                  featured.attributes.blog_image.data.attributes.url.startsWith(
                    "http"
                  )
                    ? featured.attributes.blog_image.data.attributes.url
                    : `${API_URL}${featured.attributes.blog_image.data.attributes.url}`
                }
                alt={featured.attributes.Title || "Blog Image"}
                fill
                priority
                sizes="220px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#888" }}>
              <span>{featured.attributes?.publishedAt ? new Date(featured.attributes.publishedAt).toLocaleDateString() : ""}</span>
              <span>{featured.attributes?.author?.data?.attributes?.name || "Author's Name"}</span>
              <span>{featured.attributes?.category?.data?.attributes?.name || "Category"}</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: "1.5rem", margin: "0 0 1rem 0" }}>{featured.attributes.Title || "Blog Title"}</h2>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              {featured.attributes.Description
              ? featured.attributes.Description.slice(0, 600) + "..." 
              : ""}
            </p>
            <div style={{ marginTop: "auto", textAlign: "right" }}>
              <Link href={`/blog/${featured.attributes.slug}`} style={{ color: "#9D00A0", fontWeight: 600 }}>
                Read more →
              </Link>
            </div>
          </div>
        </div>
        
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          marginTop: "2rem",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {rest.map((blog, index) => {
          const { id, attributes } = blog;
          const imageUrl = attributes?.blog_image?.data?.attributes?.url
            ? attributes.blog_image.data.attributes.url.startsWith("http")
              ? attributes.blog_image.data.attributes.url
              : `${API_URL}${attributes.blog_image.data.attributes.url}`
            : "";

          return (
            <div
              key={id || index}
              style={{
                display: "flex",
                border: "1px solid #ddd",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                background: "#fff",
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    minWidth: "220px",
                    height: "220px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={attributes.Title || "Blog Image"}
                    fill
                    priority={index === 0}
                    sizes="220px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#888" }}>
                  <span>
                    {attributes.publishedAt ? new Date(attributes.publishedAt).toLocaleDateString() : ""}</span>
                  <span>{attributes.author?.name || "Author's Name"}</span>
                  <span>{attributes.category?.name || "Category"}</span>
                </div>
                <h2 style={{ fontWeight: 700, fontSize: "1.5rem", margin: "0 0 1rem 0" }}>{attributes.Title}</h2>
                <p style={{ color: "#555", marginBottom: "1.5rem" }}>
                  {attributes.Description ? attributes.Description.slice(0, 300) + "..." : ""}
                </p>
                <div style={{ marginTop: "auto", textAlign: "right" }}>
                <Link href={`/blog/${attributes.slug}`} style={{ color: "#9D00A0", fontWeight: 600 }}>
                  Read more →
                </Link>
              </div>
            </div>
      </div>
          );
        })}
      </div>
    </main>
  );
}
