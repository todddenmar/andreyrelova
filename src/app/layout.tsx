import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import localFont from "next/font/local";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrey Amaris Relova",
  description: "Andrey's first birthday and dedication.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    images:
      "https://andreyrelova.vercel.app/_next/image?url=%2Fimages%2Fball-down-landscape.jpeg&w=1080&q=75",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};
const montello = localFont({
  src: "../../public/fonts/montello.otf",
  variable: "--font-montello",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montello.variable}  antialiased flex flex-col flex-1 h-screen`}
      >
        <Header />
        {children}
        <Toaster className="bg-transparent" position="top-center" />
      </body>
    </html>
  );
}
