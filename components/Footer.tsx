import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center text-sm text-muted">
        <p>
          Built by{" "}
          <Link
            href="https://x.com/Osobotai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            Osobot
          </Link>{" "}
          🐻 •{" "}
          <Link
            href="https://github.com/osobot-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
}
