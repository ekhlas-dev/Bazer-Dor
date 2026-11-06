import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

import Navbar from "@/component/shared/Navbar";
import PriceTicker from "@/component/shared/PriceTicker";
import Footer from "@/component/shared/Footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function NavbarFallback() {
  return <div className="h-16 animate-pulse bg-gray-100" />;
}

function PriceTickerFallback() {
  return <div className="h-10 animate-pulse bg-gray-100" />;
}

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-bengali)]">
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>

        <Suspense fallback={<PriceTickerFallback />}>
          <PriceTicker />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}