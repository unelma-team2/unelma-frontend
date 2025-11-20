import localFont from "next/font/local";
import { Quicksand, Kumbh_Sans, Afacad_Flux, Alan_Sans, Alata, Allerta, Antic, Cabin, Cagliostro, Cal_Sans, Comfortaa, Comic_Neue, Faculty_Glyphic, Fredoka, Gabarito, Gantari, Geologica, Hammersmith_One, Host_Grotesk, Jost, Kulim_Park, Lexend_Deca, Lexend, Nata_Sans, National_Park, Outfit, Parkinsans, Plus_Jakarta_Sans, REM, Scada, Sen, Spinnaker, Sulphur_Point, Urbanist, Varela, Victor_Mono, Wix_Madefor_Display, Wix_Madefor_Text, Tauri    } from "next/font/google";
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

// GOOGLE FONTS (all with variables)
const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-kumbh-sans",
  display: "swap",
});

const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-afacad-flux",
  display: "swap",
});

const alanSans = Alan_Sans({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-alan-sans",
  display: "swap",
});

const alata = Alata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alata",
  display: "swap",
});

const allerta = Allerta({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allerta",
  display: "swap",
});

const antic = Antic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-antic",
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-cabin",
  display: "swap",
});

const cagliostro = Cagliostro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cagliostro",
  display: "swap",
});

const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cal-sans",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-comfortaa",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300","400","700"],
  variable: "--font-comic-neue",
  display: "swap",
});

const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-faculty-glyphic",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-fredoka",
  display: "swap",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-gabarito",
  display: "swap",
});

const gantari = Gantari({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-gantari",
  display: "swap",
});

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-geologica",
  display: "swap",
});

const hammersmithOne = Hammersmith_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hammersmith-one",
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-jost",
  display: "swap",
});

const kulimPark = Kulim_Park({
  subsets: ["latin"],
  weight: ["200","300","400","600","700"],
  variable: "--font-kulim-park",
  display: "swap",
});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-lexend-deca",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-lexend",
  display: "swap",
});

const nataSans = Nata_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-nata-sans",
  display: "swap",
});

const nationalPark = National_Park({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-national-park",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-outfit",
  display: "swap",
});

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-parkinsans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const rem = REM({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-rem",
  display: "swap",
});

const scada = Scada({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-scada",
  display: "swap",
});

const sen = Sen({
  subsets: ["latin"],
  weight: ["400","700","800"],
  variable: "--font-sen",
  display: "swap",
});

const spinnaker = Spinnaker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-spinnaker",
  display: "swap",
});

const sulphurPoint = Sulphur_Point({
  subsets: ["latin"],
  weight: ["300","400","700"],
  variable: "--font-sulphur-point",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-urbanist",
  display: "swap",
});

const varela = Varela({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela",
  display: "swap",
});

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700"],
  variable: "--font-victor-mono",
  display: "swap",
});

const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-wix-madefor-display",
  display: "swap",
});

const wixMadeforText = Wix_Madefor_Text({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-wix-madefor-text",
  display: "swap",
});

const tauri = Tauri({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tauri",
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
    ${kumbhSans.variable}
    ${afacadFlux.variable}
    ${alanSans.variable}
    ${alata.variable}
    ${allerta.variable}
    ${antic.variable}
    ${cabin.variable}
    ${cagliostro.variable}
    ${calSans.variable}
    ${comfortaa.variable}
    ${comicNeue.variable}
    ${facultyGlyphic.variable}
    ${fredoka.variable}
    ${gabarito.variable}
    ${gantari.variable}
    ${geologica.variable}
    ${hammersmithOne.variable}
    ${hostGrotesk.variable}
    ${jost.variable}
    ${kulimPark.variable}
    ${lexendDeca.variable}
    ${lexend.variable}
    ${nataSans.variable}
    ${nationalPark.variable}
    ${outfit.variable}
    ${parkinsans.variable}
    ${plusJakartaSans.variable}
    ${rem.variable}
    ${scada.variable}
    ${sen.variable}
    ${spinnaker.variable}
    ${sulphurPoint.variable}
    ${urbanist.variable}
    ${varela.variable}
    ${victorMono.variable}
    ${wixMadeforDisplay.variable}
    ${wixMadeforText.variable}
    ${tauri.variable}
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
