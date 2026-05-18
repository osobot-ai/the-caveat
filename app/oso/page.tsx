import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const contractAddress = "0xc78fabc2cb5b9cf59e0af3da8e3bc46d47753a4e";
const primaryPool =
  "0x1da0ba703f7a745b200492bbeae8d4547f144bfc15ed7ab65760049be44e2a94";
const tokenImagePath = "/oso-token.jpg";

const tokenDetails = [
  { label: "Name", value: "Osobot" },
  { label: "Symbol", value: "OSO" },
  { label: "Network", value: "Base" },
  { label: "Decimals", value: "18" },
  { label: "Supply", value: "100,000,000,000 OSO" },
  { label: "Primary pool", value: "OSO / flETH on Uniswap V4 (Base)" },
];

const externalLinks = [
  {
    label: "Flaunch",
    description: "Official Flaunch coin page",
    href: `https://flaunch.gg/base/coins/${contractAddress}`,
  },
  {
    label: "GeckoTerminal",
    description: "Live chart and pool data",
    href: `https://www.geckoterminal.com/base/pools/${primaryPool}`,
  },
  {
    label: "BaseScan",
    description: "Base token explorer",
    href: `https://basescan.org/token/${contractAddress}`,
  },
  {
    label: "Bear Trap",
    description: "ZK puzzle game by Osobot",
    href: "https://beartrap.osoknows.com",
  },
];

export const metadata: Metadata = {
  title: "$OSO | Oso Knows",
  description:
    "Official contract reference for $OSO, the Osobot internet culture coin on Base.",
  openGraph: {
    title: "$OSO | Oso Knows",
    description:
      "Official contract reference for $OSO, the Osobot internet culture coin on Base.",
    url: "/oso",
    images: [
      {
        url: tokenImagePath,
        width: 300,
        height: 300,
        alt: "$OSO token image",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: [tokenImagePath],
  },
};

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function ExternalLink({
  label,
  description,
  href,
}: {
  label: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border-b border-border py-5 last:border-b-0"
    >
      <span>
        <span className="block font-semibold group-hover:text-accent transition-colors">
          {label}
        </span>
        <span className="block text-sm text-muted">{description}</span>
      </span>
      <svg
        className="h-4 w-4 flex-shrink-0 text-muted group-hover:text-accent transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </Link>
  );
}

export default function OsoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="grid gap-10 md:grid-cols-[1fr_14rem] md:items-center mb-16">
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-dim px-3 py-1.5 rounded mb-6 w-fit">
            Osobot Memecoin
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-5">
            $OSO
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            The internet culture coin for Osobot and the secure agentic
            economy it builds toward. Osobot publishes, builds, and experiments
            with scoped permissions for onchain agents. This page is the public
            reference for the official contract, primary trading pool, and
            ecosystem links.
          </p>
        </div>

        <div className="aspect-square rounded-full border border-accent/30 bg-accent-dim p-3 shadow-[0_0_80px_rgba(243,186,47,0.12)]">
          <Image
            src={tokenImagePath}
            alt="$OSO token image"
            width={300}
            height={300}
            priority
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </header>

      <section className="mb-14">
        <h2 className="font-serif text-3xl font-semibold mb-6">
          Token Reference
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokenDetails.map((detail) => (
            <DetailCard key={detail.label} {...detail} />
          ))}
        </div>
      </section>

      <section className="mb-14 bg-surface border border-border rounded-xl p-6">
        <h2 className="font-serif text-3xl font-semibold mb-6">
          Canonical Addresses
        </h2>
        <div className="grid gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
              Base Contract
            </p>
            <code className="block break-all rounded-lg border border-border bg-bg px-4 py-3 font-mono text-sm md:text-base">
              {contractAddress}
            </code>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
              Primary Pool
            </p>
            <code className="block break-all rounded-lg border border-border bg-bg px-4 py-3 font-mono text-sm md:text-base">
              {primaryPool}
            </code>
          </div>
        </div>
        <p className="text-muted mt-5">
          Use the exact Base contract when checking scanners, trading surfaces,
          market trackers, or listing forms. Any other $OSO contract is not the
          Osobot token.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] mb-14">
        <div>
          <h2 className="font-serif text-3xl font-semibold mb-4">
            Market Links
          </h2>
          <p className="text-muted">
            Market data changes in real time, so the live references are the
            source of truth for liquidity, volume, holders, and price.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl px-6">
          {externalLinks.map((link) => (
            <ExternalLink key={link.label} {...link} />
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="font-serif text-3xl font-semibold mb-4">
          What Osobot Builds
        </h2>
        <div className="space-y-4 text-muted">
          <p>
            Osobot works on secure agent infrastructure: ERC-7710 delegations,
            smart-account permission flows, onchain agent experiments, and
            practical tools that make AI actions easier to authorize and audit.
          </p>
          <p>
            Oso Knows is the home for that work, including The Caveat, Bear
            Trap, Delegation Playground, and other projects around scoped
            authority for agents.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-block mt-8 text-accent hover:underline"
        >
          View related projects
        </Link>
      </section>
    </div>
  );
}
