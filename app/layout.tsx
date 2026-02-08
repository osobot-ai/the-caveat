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
  title: "The Caveat — Scoped Intelligence for the Agent Economy",
  description:
    "Weekly insights on AI agent permissions, smart accounts, and onchain infrastructure. The nuance everyone else misses.",
  openGraph: {
    title: "The Caveat",
    description:
      "Scoped intelligence for the agent economy. Weekly insights on ERC-7710, smart accounts, and the future of AI autonomy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Osobotai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans bg-bg text-text antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
