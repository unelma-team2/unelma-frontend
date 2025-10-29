import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project for Unelma Platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
