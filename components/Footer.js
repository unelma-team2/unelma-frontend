export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem 0",
        borderTop: "1px solid #E0E0E0",
        color: "#2F2E2E",
        fontSize: "0.9rem",
      }}
    >
      © {new Date().getFullYear()} Unelma Platforms. All rights reserved.
    </footer>
  );
}
