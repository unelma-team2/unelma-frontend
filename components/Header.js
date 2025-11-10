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
      <Link href="/about">About</Link>
      <Link href="/products">Products</Link>
      <Link href="/case-studies">Case Studies</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/contact">Contact</Link>
    </header>
  );
}
