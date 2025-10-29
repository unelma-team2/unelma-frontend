import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>About Us</h1>
      <p>
        Unelma Platforms builds smart software solutions designed to empower
        digital presence and online growth.
      </p>
      <Link href="/">← Back to Home</Link>
    </main>
  );
}