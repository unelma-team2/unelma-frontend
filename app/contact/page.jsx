import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Contact Us</h1>
      <p>We&apos;d love to hear from you! More info coming soon.</p>
      <Link href="/">← Back to Home</Link>
    </main>
  );
}