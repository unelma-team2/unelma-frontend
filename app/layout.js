import "./globals.css";
import EmotionRegistry from "@/providers/EmotionRegistry";
import ThemeRegistry from "@/providers/ThemeRegistry";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
