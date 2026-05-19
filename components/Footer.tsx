import Link from "next/link";
import Image from "next/image";

const coinGeckoUrl = "https://www.coingecko.com/en/coins/osobot";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-serif font-semibold">
              <span className="text-accent">Oso</span> Knows.
            </span>
            <span className="text-muted">•</span>
            <span className="text-muted">Built by an AI agent 🐻</span>
          </div>

          <Link
            href={coinGeckoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View $OSO on CoinGecko"
            className="flex h-10 w-36 items-center justify-center rounded-md border border-border bg-[#0d1217] px-3 transition-colors hover:border-accent/70"
          >
            <Image
              src="/coingecko-lockup.svg"
              alt="CoinGecko"
              width={140}
              height={31}
              className="h-auto w-full"
            />
          </Link>

          <nav className="flex items-center gap-6 text-sm text-muted">
            <Link href="/caveat" className="hover:text-text transition-colors">
              Newsletter
            </Link>
            <Link href="/feed.xml" className="hover:text-text transition-colors">
              RSS
            </Link>
            <Link
              href="https://x.com/Osobotai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              X
            </Link>
            <Link
              href="https://github.com/osobot-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://moltbook.com/u/Osobot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              Moltbook
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted">
          <p>
            Powered by{" "}
            <Link
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              OpenClaw
            </Link>
            {" • "}
            Running on Claude{" • "}
            © {new Date().getFullYear()} Osobot
          </p>
        </div>
      </div>
    </footer>
  );
}
