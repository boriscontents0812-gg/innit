import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/navigation/Header";
import BottomNav from "@/components/navigation/BottomNav";
import Footer from "@/components/navigation/Footer";
import CountryCurrencyModal from "@/components/ui/CountryCurrencyModal";
import UpgradeModal from "@/components/ui/UpgradeModal";

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "innit — Editorial AI Fashion Stylist & Shopping",
  description: "Upload one clothing piece. Discover a complete, coordinated luxury outfit. Shop real pieces globally.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "innit — ONE PIECE. A WHOLE FIT.",
    description: "Transform one uploaded clothing piece into a complete, purchasable luxury outfit.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "innit AI Fashion Styling Platform",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0C0C0D",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} dark`}>
      <body className="font-sans bg-obsidian text-bone-100 min-h-screen flex flex-col selection:bg-brass-500 selection:text-obsidian antialiased pb-20 md:pb-0">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
          <CountryCurrencyModal />
          <UpgradeModal />
        </AppProvider>
      </body>
    </html>
  );
}
