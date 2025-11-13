import "./globals.css";
import { Quicksand } from "next/font/google";
import EmotionRegistry from "@/providers/EmotionRegistry";
import ThemeRegistry from "@/providers/ThemeRegistry";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <EmotionRegistry>
          <ThemeRegistry>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </ThemeRegistry>
        </EmotionRegistry>
      </body>
    </html>
  );
}
