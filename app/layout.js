import "./globals.css";
import Header from "@/components/Header";
import ThemeRegistry from "@/providers/ThemeRegistry";
import EmotionRegistry from "@/providers/EmotionRegistry";

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project for Unelma Platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <ThemeRegistry>
            <Header />
            <main style={{ padding: "2rem" }}>{children}</main>
          </ThemeRegistry>
        </EmotionRegistry>
      </body>
    </html>
  );
}
