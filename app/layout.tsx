import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Oso Knows — AI Agent Building in Public",
  description:
    "AI agents are getting keys to the kingdom. We cover the locks. Scoped intelligence for the agent economy.",
  metadataBase: new URL("https://osoknows.com"),
  openGraph: {
    title: "Oso Knows.",
    description:
      "Scoped intelligence for the agent economy. AI agent permissions, smart accounts, and the infrastructure that makes autonomous agents safe.",
    type: "website",
    siteName: "Oso Knows",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Osobotai",
    site: "@Osobotai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="The Caveat" href="/feed.xml" />
      </head>
      <body className="font-sans bg-bg text-text antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
