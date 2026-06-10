import type { Metadata } from "next";
import { Baloo_Tammudu_2, Noto_Sans_Telugu, Playfair_Display, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const balooTammudu = Baloo_Tammudu_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

const notoSansTelugu = Noto_Sans_Telugu({
  weight: ["400", "500", "600", "700"],
  subsets: ["telugu"],
  variable: "--font-telugu",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grandmas-snacks.preview.emergentagent.com"),
  title: "Snakzee — Art of Authentic Snacking | తెలుగు సంప్రదాయ రుచులు",
  description: "Snakzee specializes in authentic homemade Telugu snacks, pickles, masalas, and sweets made using traditional family recipes. Fresh, hygienic, handmade with love.",
  keywords: ["telugu snacks", "andhra pickles", "homemade pickles", "avakaya", "gongura", "ariselu", "sunnundalu", "chekkalu", "murukulu", "telugu sweets"],
  openGraph: {
    title: "Snakzee — Art of Authentic Snacking",
    description: "Authentic homemade Telugu snacks, pickles, masalas & sweets.",
    images: [{ url: "/snakzee-logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snakzee — Art of Authentic Snacking",
    description: "Authentic homemade Telugu snacks, pickles, masalas & sweets.",
    images: ["/snakzee-logo.png"],
  },
  icons: {
    icon: "/snakzee-logo.png",
    apple: "/snakzee-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${balooTammudu.variable} ${notoSansTelugu.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${outfit.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
