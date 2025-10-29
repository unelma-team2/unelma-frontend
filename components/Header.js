import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="about">About</Link>
      <Link href="blog">Blog</Link>
      <Link href="contact">Contact</Link>
    </header>
  );
}
