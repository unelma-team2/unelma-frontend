import localFont from "next/font/local";
import { Quicksand } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "@/providers/EmotionRegistry";
import ThemeRegistry from "@/providers/ThemeRegistry";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// STACK SANS NOTCH (local variable font)
const stackSansNotch = localFont({
  src: "../public/fonts/stack-sans-notch/StackSansNotch-VariableFont_wght.ttf",
  variable: "--font-stack-sans-notch",
  weight: "100 900", // variable range
  display: "swap",
});

// QUICKSAND (google)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "Unelma Platforms",
  description: "Redesign project",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${stackSansNotch.variable} ${quicksand.variable}`}
    >
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
