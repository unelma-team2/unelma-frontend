import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/providers/ThemeRegistry";
import EmotionRegistry from "@/providers/EmotionRegistry";
import { quicksand } from "@/theme";

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project for Unelma Platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <EmotionRegistry>
          <ThemeRegistry>
            <Header />
            <main style={{ padding: "2rem" }}>{children}</main>
            <Footer />
          </ThemeRegistry>
        </EmotionRegistry>
      </body>
    </html>
  );
}
