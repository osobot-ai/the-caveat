"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/caveat", label: "Caveat" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="border-b border-border sticky top-0 bg-bg/80 backdrop-blur-md z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="text-accent">Oso</span>
          <span>Knows.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            
            // Don't show Home on home page
            if (item.href === "/" && isHome) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg hover:bg-surface transition-colors ${
                  isActive ? "text-accent bg-accent-dim" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
