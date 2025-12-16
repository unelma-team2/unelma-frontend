import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "@/providers/EmotionRegistry";
import ThemeRegistry from "@/providers/ThemeRegistry";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Box } from "@mui/material";
import { CartProvider } from "@/app/context/CartContext"; // Import CartProvider
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { FavoritesProvider } from "./context/FavoritesContext";

const stackSansNotch = localFont({
  src: "../public/fonts/stack-sans-notch/StackSansNotch-VariableFont_wght.ttf",
  variable: "--font-stack-sans-notch",
  weight: "100 900",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Unelma Platforms",
  description: "Website Redesign Project",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/favicon/favicon.png?v=2", type: "image/png" },
      { url: "/favicon/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png?v=2",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${stackSansNotch.variable} ${outfit.variable}`}>
      <body>
        <EmotionRegistry>
          <ThemeRegistry>
            <AuthProvider>
              <UserProvider>
                <FavoritesProvider>
                  <CartProvider>
                    {" "}
                    {/* Wrap the app with CartProvider */}
                    <ClientLayoutWrapper>
                      <Box
                        sx={{
                          mx: { xs: 2, md: "120px" },
                          my: "2rem",
                        }}
                      >
                        {children}
                      </Box>
                    </ClientLayoutWrapper>
                  </CartProvider>
                </FavoritesProvider>
              </UserProvider>
            </AuthProvider>
          </ThemeRegistry>
        </EmotionRegistry>
      </body>
    </html >
  );
}
