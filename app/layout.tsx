import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dragomir Mîndrescu — iOS Product Engineer",
  description:
    "The portfolio of Dragomir Mîndrescu, an iOS product engineer building thoughtful, privacy-conscious Apple-platform experiences.",
  keywords: ["Dragomir Mîndrescu", "iOS engineer", "Swift", "SwiftUI", "Chișinău", "portfolio"],
  authors: [{ name: "Dragomir Mîndrescu" }],
  creator: "Dragomir Mîndrescu",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Dragomir Mîndrescu — iOS Product Engineer",
    description: "Building calm software for complex lives.",
    siteName: "Dragomir Mîndrescu",
    images: [{ url: `${siteUrl}/og.png`, width: 1672, height: 941, alt: "Dragomir Mîndrescu, iOS Product Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dragomir Mîndrescu — iOS Product Engineer",
    description: "Building calm software for complex lives.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
