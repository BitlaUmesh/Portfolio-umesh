import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Particles from "@/components/Particles";
import Grain from "@/components/Grain";
import TerminalOverlay from "@/components/TerminalOverlay";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bitla Umesh Kumar | Digital Architect & AI Engineer",
  description: "High-performance 3D interactive portfolio of Bitla Umesh Kumar, specializing in Systems Engineering, AI, and Full-Stack Development.",
  keywords: ["AI Engineer", "Software Engineer", "Full-Stack Developer", "Next.js", "Python", "FastAPI"],
  authors: [{ name: "Bitla Umesh Kumar" }],
  creator: "Bitla Umesh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitlaumesh.github.io/Portfolio-umesh",
    title: "Bitla Umesh Kumar | Portfolio",
    description: "Digital Architect & Systems Engineer portfolio.",
    siteName: "Bitla Umesh Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitla Umesh Kumar | Digital Architect",
    description: "Systems Engineer & AI Specialist Portfolio.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bitla Umesh Kumar",
  jobTitle: "Software Engineer",
  url: "https://bitlaumesh.github.io/Portfolio-umesh",
  sameAs: [
    "https://github.com/BitlaUmesh",
    "https://linkedin.com/in/bitla-umesh-kumar"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}>
        <SmoothScroll>
          <Particles />
          <CustomCursor />
          <Grain />
          <Toaster theme="dark" position="bottom-right" className="font-mono" />
          <TerminalOverlay />
          {children}
        </SmoothScroll>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
      </body>
    </html>
  );
}
