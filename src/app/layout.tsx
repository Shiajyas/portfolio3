import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyProgress } from "@/components/layout/JourneyProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://shijayas.dev"),
  title: "Shijay AS — Full-Stack JavaScript Developer | Intelligent Apps & ERP Platforms",
  description:
    "Interactive developer portfolio and engineering world for Shijay AS. Full-Stack JavaScript Developer building real-time WebRTC platforms, RAG workflows with LangChain/ChromaDB, and domain-driven ERP systems.",
  keywords: [
    "Shijay AS",
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "WebRTC",
    "Socket.IO",
    "LangChain",
    "RAG",
    "ChromaDB",
    "Docker",
    "JS Informatics ERP",
  ],
  authors: [{ name: "Shijay AS" }],
  creator: "Shijay AS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shijayas.dev",
    title: "Shijay AS — Full-Stack JavaScript Developer",
    description: "I TURN IDEAS INTO WORKING SOFTWARE. Explore 6 flagship full-stack projects with live embedded sandboxes.",
    siteName: "Shijay AS Developer Portfolio",
    images: [
      {
        url: "/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Shijay AS - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shijay AS — Full-Stack JavaScript Developer",
    description: "Explore 6 flagship full-stack projects with live embedded sandboxes.",
    images: ["/images/profile.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#121211] text-[#F2EBDD] antialiased selection:bg-[#E99B3D] selection:text-[#121211]">
        <Navbar />
        <JourneyProgress />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
