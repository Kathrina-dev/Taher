import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  title: "Taher Haidri — Mechanical Engineering Portfolio",
  description:
    "Portfolio of Taher Haidri, a mechanical engineering student specializing in UAV design, CAD modeling, and advanced manufacturing. Explore projects, skills, and research.",
  keywords: [
    "mechanical engineering",
    "portfolio",
    "CAD",
    "UAV",
    "drone design",
    "FEA",
    "manufacturing",
  ],
  authors: [{ name: "Taher Haidri" }],
  openGraph: {
    title: "Taher Haidri — Mechanical Engineering Portfolio",
    description:
      "Engineering student specializing in UAV design and advanced manufacturing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${shareTechMono.variable}`}
    >
      <head>
        {/* TODO(security): CSP and security headers should be configured at the
            infrastructure level (next.config.ts headers) for production. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
