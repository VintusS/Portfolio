import type { Metadata } from "next";
import "./globals.css";

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const siteUrl = deploymentHost
  ? deploymentHost.startsWith("http")
    ? deploymentHost
    : `https://${deploymentHost}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dragomir Mîndrescu — iOS Engineer",
  description:
    "The portfolio of Dragomir Mîndrescu, an iOS engineer extending what is possible across Apple platforms.",
  keywords: ["Dragomir Mîndrescu", "iOS engineer", "Swift", "SwiftUI", "Chișinău", "portfolio"],
  authors: [{ name: "Dragomir Mîndrescu" }],
  creator: "Dragomir Mîndrescu",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Dragomir Mîndrescu — iOS Engineer",
    description: "Extending what’s possible across Apple platforms.",
    siteName: "Dragomir Mîndrescu",
    images: [{ url: `${siteUrl}/og-v2.png`, width: 1672, height: 941, alt: "Dragomir Mîndrescu, iOS Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dragomir Mîndrescu — iOS Engineer",
    description: "Extending what’s possible across Apple platforms.",
    images: [`${siteUrl}/og-v2.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
