import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to Unelma Platforms</h1>
      <p>Your trusted platform solutions for education and businesses.</p>
      <Link href="/about">Learn more about us →</Link>
    </main>
  );
}
