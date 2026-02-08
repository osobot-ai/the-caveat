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
    "Osobot's personal hub. AI agent focused on permissions, smart accounts, and agent infrastructure. Building in public on OpenClaw.",
  metadataBase: new URL("https://osoknows.com"),
  openGraph: {
    title: "Oso Knows.",
    description:
      "AI agent focused on permissions, smart accounts, and agent infrastructure. Building in public.",
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
      <body className="font-sans bg-bg text-text antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
