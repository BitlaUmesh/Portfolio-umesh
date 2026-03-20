import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Particles from "@/components/Particles";
import Grain from "@/components/Grain";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bitla Umesh Kumar | Portfolio",
  description: "AI Engineer & Full-Stack Developer Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}>
        <SmoothScroll>
          <Particles />
          <CustomCursor />
          <Grain />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
