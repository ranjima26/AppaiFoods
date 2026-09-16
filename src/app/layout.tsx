import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Fredoka } from "next/font/google";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import PreLoader from "@/app/components/preLoader";
import MobileBottomNav from "@/app/components/mobileBottomNav";
import SmoothScroll from "@/app/components/smoothScroll";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Appai Foods - Authentic Kerala Snacks",
  description: "100% Authentic & Fresh Traditional Kerala Snacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorantGaramond.variable} ${fredoka.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col justify-between font-content">
        <SmoothScroll />
        <PreLoader />
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
