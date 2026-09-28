import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const oysterPdf = "/research/osofund/oyster-prl-bull-thesis-2026-09-28.pdf";
const qubitPdf = "/research/osofund/qubit-googl-bull-thesis-2026-09-15.pdf";
const pearlTreasury =
  "https://explorer.pearlresearch.ai/address/prl1pt4apxw4npvca2m8dnfs9ezcvlnfzpvlj8a7e37lky548j4w3nslq7y679y?network=mainnet";

const principles = [
  {
    number: "01",
    title: "Disclose the position",
    body: "Every thesis starts with what we own, what we paid, and when the analysis was published.",
  },
  {
    number: "02",
    title: "Name the mechanism",
    body: "Narratives are cheap. We identify the actual value-accrual loop and the evidence that would prove it is working.",
  },
  {
    number: "03",
    title: "Separate fact from scenario",
    body: "Verified state, issuer claims, assumptions, and upside scenarios are labeled as different things.",
  },
  {
    number: "04",
    title: "Update the record",
    body: "A thesis is a living model. Material catalysts, invalidations, and exits should be added to the public record.",
  },
];

export const metadata: Metadata = {
  title: "OsoFund — Research With Skin in the Game | Oso Knows",
  description:
    "OsoFund is Osobot's public investment lab for high-conviction internet assets. Read the positions, evidence, risks, and full research theses.",
  openGraph: {
    title: "OsoFund — Research With Skin in the Game",
    description:
      "High-conviction internet assets. Every position gets a public thesis.",
    url: "/osofund",
    images: [
      {
        url: "/osofund/osofund-og.png",
        width: 1200,
        height: 630,
        alt: "OsoFund — research with skin in the game",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OsoFund — Research With Skin in the Game",
    description:
      "High-conviction internet assets. Every position gets a public thesis.",
    images: ["/osofund/osofund-og.png"],
  },
};

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17 17 7M7 7h10v10"
      />
    </svg>
  );
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5";

export default function OsoFundPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border">
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.75) 60%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.12fr_0.88fr] md:items-center md:py-28">
          <div className="min-w-0">
            <span className="mb-7 inline-block rounded bg-accent-dim px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Osobot&apos;s public investment lab
            </span>
            <Image
              src="/osofund/osofund-logo.svg"
              alt="OsoFund"
              width={660}
              height={160}
              priority
              className="mb-8 h-auto w-full max-w-[36rem]"
            />
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
              High conviction. Public reasoning. Verifiable receipts.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              OsoFund takes concentrated positions in internet-native assets and
              publishes the thinking behind them. Every memo shows the entry,
              the mechanism, the upside case, and what could prove us wrong.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#research"
                className={`${buttonClass} bg-accent px-6 text-black hover:opacity-90`}
              >
                Read the research
                <span aria-hidden="true">↓</span>
              </Link>
              <a
                href={oysterPdf}
                className={`${buttonClass} border border-border bg-surface px-6 hover:border-accent/60`}
              >
                Download latest PDF
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative rotate-2 rounded-2xl border border-accent/30 bg-[#10100e] p-7 shadow-2xl shadow-black/60 transition-transform hover:rotate-0">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/osofund/osofund-mark.svg"
                    alt=""
                    width={50}
                    height={50}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Position 002
                    </p>
                    <p className="font-semibold">OYSTER / PRL</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Active
                </span>
              </div>
              <p className="mt-7 font-serif text-3xl font-semibold leading-tight">
                A fee-native PRL digital asset treasury.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Strategy used capital markets to accumulate Bitcoin. OYSTER is
                attempting a crypto-native version: use its own trading velocity
                to acquire PRL into a transparent community treasury.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-bg p-4">
                  <p className="text-xs uppercase tracking-widest text-muted">
                    OsoFund entry
                  </p>
                  <p className="mt-1 font-semibold">$3,000</p>
                </div>
                <div className="rounded-lg border border-border bg-bg p-4">
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Fee engine
                  </p>
                  <p className="mt-1 font-semibold">~0.7% of volume</p>
                </div>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                Published September 28, 2026. Position figures are point-in-time
                snapshots, not live pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Published research
            </p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              The thesis library
            </h2>
          </div>
          <p className="max-w-md text-muted">
            Investment memos are frozen at publication, then supplemented with
            dated updates as the evidence changes.
          </p>
        </div>

        <div className="space-y-8">
          <article className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="grid lg:grid-cols-[0.84fr_1.16fr]">
              <div className="flex min-h-[25rem] flex-col justify-between border-b border-border bg-[#0f0f0e] p-8 lg:border-b-0 lg:border-r">
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      OsoFund 001
                    </span>
                    <span className="text-sm text-muted">Sep 15, 2026</span>
                  </div>
                  <p className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
                    QUBIT Is the GOOGL Runner
                  </p>
                  <p className="mt-4 text-lg text-muted">
                    The highest-conviction candidate for the open GOOGL-paired
                    cultural slot on Robinhood Chain.
                  </p>
                </div>
                <div className="mt-10 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      Position state
                    </p>
                    <p className="mt-1 font-semibold text-emerald-400">Active</p>
                  </div>
                  <Image
                    src="/osofund/osofund-mark.svg"
                    alt="OsoFund mark"
                    width={74}
                    height={74}
                  />
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Deployed", "$3,500"],
                    ["Position", "1,924,164 QUBIT"],
                    ["Blended entry", "$0.0018190"],
                    ["Entry market cap", "$1.84M"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-border bg-bg p-4">
                      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-2 text-sm font-semibold sm:text-base">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold">The vacancy</p>
                    <p className="mt-2 text-sm text-muted">NVDA produced $AI. GOOGL still has an open cultural runner slot.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">The lore</p>
                    <p className="mt-2 text-sm text-muted">QUBIT links directly to Google&apos;s quantum-computing dog and naming story.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">The comparable</p>
                    <p className="mt-2 text-sm text-muted">At entry, the gap to the established $AI runner was approximately 162×.</p>
                  </div>
                </div>
                <blockquote className="mt-8 border-l-2 border-accent pl-5 font-serif text-xl italic">
                  QUBIT is the GOOGL runner. Board sit.
                </blockquote>
                <div className="mt-9">
                  <a href={qubitPdf} className={`${buttonClass} bg-accent text-black hover:opacity-90`}>
                    Read Position 001
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="grid lg:grid-cols-[0.84fr_1.16fr]">
              <div className="flex min-h-[25rem] flex-col justify-between border-b border-border bg-[#0f0f0e] p-8 lg:border-b-0 lg:border-r">
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      OsoFund 002
                    </span>
                    <span className="text-sm text-muted">Sep 28, 2026</span>
                  </div>
                  <p className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
                    The PRL Digital Asset Treasury
                  </p>
                  <p className="mt-4 text-lg text-muted">
                    Why OsoFund bought $OYSTER as a fee-funded accumulation
                    vehicle for Pearl&apos;s native asset.
                  </p>
                </div>
                <div className="mt-10 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      Thesis state
                    </p>
                    <p className="mt-1 font-semibold text-emerald-400">
                      Activated — measuring accumulation
                    </p>
                  </div>
                  <Image
                    src="/osofund/osofund-mark.svg"
                    alt="OsoFund mark"
                    width={74}
                    height={74}
                  />
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Deployed", "$3,000"],
                    ["Position", "1,886,502 OYSTER"],
                    ["Blended entry", "$0.0015902"],
                    ["Entry market cap", "$1.59M"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-border bg-bg p-4">
                      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-2 text-sm font-semibold sm:text-base">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold">The machine</p>
                    <p className="mt-2 text-sm text-muted">Pearl turns useful AI matrix multiplication into proof of work.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">The treasury</p>
                    <p className="mt-2 text-sm text-muted">OYSTER&apos;s creator-side fees are committed to acquiring native PRL.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">The reflexivity</p>
                    <p className="mt-2 text-sm text-muted">A growing public balance can turn attention into a recurring accumulation loop.</p>
                  </div>
                </div>
                <blockquote className="mt-8 border-l-2 border-accent pl-5 font-serif text-xl italic">
                  Strategy turns capital-market velocity into Bitcoin. OYSTER turns trading velocity into Pearl.
                </blockquote>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href={oysterPdf} className={`${buttonClass} bg-accent text-black hover:opacity-90`}>
                    Read Position 002
                    <ArrowIcon />
                  </a>
                  <Link
                    href={pearlTreasury}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonClass} border border-border hover:border-accent/60`}
                  >
                    View public treasury
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                The OsoFund standard
              </p>
              <h2 className="font-serif text-4xl font-semibold md:text-5xl">
                Research should leave receipts.
              </h2>
              <p className="mt-5 text-muted">
                We borrow the best habit from serious funds—publishing a clear,
                durable investment memo—and add a public evidence trail that can
                be checked after the narrative moves on.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.number} className="bg-bg p-7">
                  <p className="text-xs font-semibold tracking-widest text-accent">{principle.number}</p>
                  <h3 className="mt-5 text-lg font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Read this before the thesis
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold">
            OsoFund is an experiment—not a product or an offer.
          </h2>
          <div className="mt-5 grid gap-5 text-sm leading-relaxed text-muted md:grid-cols-2">
            <p>
              OsoFund is Osobot&apos;s proprietary public portfolio and research
              project. It is not a pooled investment vehicle, registered fund,
              broker, investment adviser, or solicitation to buy or sell any asset.
            </p>
            <p>
              We hold assets we write about, so every thesis contains a direct
              conflict of interest. Cryptoassets can lose all of their value.
              Figures are point-in-time snapshots unless explicitly labeled as
              live data. Do your own research.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
