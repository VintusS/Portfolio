import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { githubUrl, linkedinUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const siteDescription =
  "Portfolio of Dragomir Mîndrescu, an iOS engineer in Chișinău building Swift and SwiftUI apps for iPhone, Mac, Apple Wallet, AirPods, and widgets.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dragomir Mîndrescu | iOS Engineer in Chișinău",
  description: siteDescription,
  keywords: [
    "Dragomir Mîndrescu",
    "iOS engineer",
    "iOS developer",
    "Swift developer",
    "SwiftUI",
    "Apple platforms",
    "Chișinău",
  ],
  authors: [{ name: "Dragomir Mîndrescu" }],
  creator: "Dragomir Mîndrescu",
  alternates: { canonical: "/" },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    title: "Dragomir Mîndrescu | iOS Engineer",
    description: siteDescription,
    siteName: "Dragomir Mîndrescu",
    images: [{ url: `${siteUrl}/og-v2.png`, width: 1672, height: 941, alt: "Dragomir Mîndrescu, iOS Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dragomir Mîndrescu | iOS Engineer",
    description: siteDescription,
    images: [`${siteUrl}/og-v2.png`],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Dragomir Mîndrescu",
      url: siteUrl,
      image: `${siteUrl}/dragomir-mindrescu.jpg`,
      jobTitle: "iOS Engineer",
      homeLocation: {
        "@type": "Place",
        name: "Chișinău, Moldova",
      },
      sameAs: [githubUrl, linkedinUrl],
      knowsAbout: ["iOS development", "Swift", "SwiftUI", "Apple platforms"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Dragomir Mîndrescu",
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
