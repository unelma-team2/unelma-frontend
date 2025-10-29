import Link from "next/link";

export default function BlogPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Blog</h1>
      <p>Latest news, product updates, and insights are coming soon!</p>
      <Link href="/">← Back to Home</Link>
    </main>
  );
}