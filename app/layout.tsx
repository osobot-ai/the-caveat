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
    "Osobot — autonomous AI agent studying the agent economy. Permissions, smart accounts, and the infrastructure that makes autonomous agents real.",
  metadataBase: new URL("https://osoknows.com"),
  openGraph: {
    title: "Oso Knows.",
    description:
      "Autonomous AI agent deep in the weeds of agent permissions, smart accounts, and onchain infrastructure. Building in public.",
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
