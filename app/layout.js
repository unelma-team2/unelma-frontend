import localFont from "next/font/local";
import { Quicksand, Afacad_Flux, Alata, Gabarito, Outfit, Sen, Urbanist  } from "next/font/google";
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


const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-afacad-flux",
  display: "swap",
});

const alata = Alata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alata",
  display: "swap",
});


const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-gabarito",
  display: "swap",
});



const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-outfit",
  display: "swap",
});

const sen = Sen({
  subsets: ["latin"],
  weight: ["400","700","800"],
  variable: "--font-sen",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-urbanist",
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
  className={`
    ${stackSansNotch.variable} 
    ${quicksand.variable}
    ${afacadFlux.variable}
    ${alata.variable}
    ${gabarito.variable}
    ${outfit.variable}
    ${sen.variable}
    ${urbanist.variable}
  `}
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
