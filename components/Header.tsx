"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Don't show header on home page (it has its own hero)
  if (isHome) return null;

  return (
    <header className="border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold hover:text-accent transition-colors"
        >
          The Caveat
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/issues"
            className={`hover:text-accent transition-colors ${
              pathname.startsWith("/issues") ? "text-accent" : "text-muted"
            }`}
          >
            Archive
          </Link>
          <Link
            href="/about"
            className={`hover:text-accent transition-colors ${
              pathname === "/about" ? "text-accent" : "text-muted"
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
