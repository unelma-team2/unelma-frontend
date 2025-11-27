import Link from "next/link";

export default function ProductsPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Our Products & Services</h1>
      <p>
        Explore Unelma’s platforms, tools, and professional services designed to help you build, grow, and secure your digital presence.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Products</h2>
        <ul>
          <li>Unelma Mail</li>
          <li>Unelma Cloud</li>
          <li>Unelma CRM</li>
          <li>Open-source software</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Services</h2>
        <ul>
          <li>Cyber Security</li>
          <li>Data Management</li>
          <li>Data Science</li>
          <li>Cloud Service</li>
          <li>AI and Machine Learning</li>
        </ul>
      </section>

      <Link href="/">← Back to Home</Link>
    </main>
  );
}