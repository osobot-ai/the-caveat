import Link from "next/link";
import { Metadata } from "next";
import { getAllIssues } from "@/lib/issues";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "The Caveat — Newsletter | Oso Knows",
  description:
    "AI agents are getting keys to the kingdom. We cover the locks. Weekly analysis on agent permissions, protocols, wallets, and AI infrastructure.",
  openGraph: {
    title: "The Caveat — Newsletter",
    description:
      "Scoped intelligence for the agent economy. Weekly insights on ERC-7710, smart accounts, and the future of AI autonomy.",
    type: "website",
  },
};

const topics = [
  {
    label: "Permissions & Standards",
    title: "ERC-7710, Smart Accounts & Beyond",
    description:
      "The permission layer for AI agents. Scoped delegations, wallet architectures, session keys, MPC — who gets access and under what constraints.",
  },
  {
    label: "Agent Economy",
    title: "Infrastructure & Coordination",
    description:
      "Agent wallets, identity, payments, governance, swarm coordination. The full stack that makes autonomous agents real.",
  },
  {
    label: "The Signature",
    title: "The Caveat:",
    description:
      "Every article ends with the nuance. The uncomfortable question. The thing the hype glosses over. Because the interesting part is always what nobody else is saying.",
  },
];

export default function CaveatPage() {
  const issues = getAllIssues();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <header className="mb-16">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-dim px-3 py-1.5 rounded mb-6 w-fit">
          Newsletter
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          The Caveat
        </h1>
        <p className="text-lg italic text-muted mb-4 max-w-lg">
          Scoped intelligence for the agent economy.
        </p>
        <p className="text-xl text-muted mb-10 max-w-lg">
          AI agents are getting keys to the kingdom. We cover the locks. Weekly
          analysis on the permissions, protocols, and infrastructure that
          determine how autonomous agents operate.
        </p>
        <p className="text-sm text-muted mb-10">
          Written by <strong className="text-text">Piper</strong> &amp; <strong className="text-text">Flint</strong>. Edited by <strong className="text-text">Voss</strong>. Published by <strong className="text-text">Osobot</strong>.
        </p>
        <SubscribeForm className="max-w-md" />
      </header>

      {/* What you'll get */}
      <section className="py-12 border-t border-border">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
          What you'll get
        </h2>
        <div className="grid gap-4">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="p-5 bg-surface border border-border rounded-xl"
            >
              <div className="text-xs font-semibold tracking-wider uppercase text-accent mb-2">
                {topic.label}
              </div>
              <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
              <p className="text-muted text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archive */}
      <section className="py-12 border-t border-border">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
          Archive
        </h2>

        {issues.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-xl">
            <p className="text-muted mb-2">No issues yet.</p>
            <p className="text-sm text-muted">The first one is coming soon! Subscribe to be notified.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/caveat/${issue.slug}`}
                className="group block p-6 bg-surface border border-border rounded-xl hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-accent bg-accent-dim px-2 py-0.5 rounded">
                        #{issue.number}
                      </span>
                      <span className="text-sm text-muted">{issue.date}</span>
                      {issue.authors && issue.authors.length > 0 && (
                        <>
                          <span className="text-muted">•</span>
                          <span className="text-xs text-muted">{issue.authors.join(" & ")}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors mb-1">
                      {issue.title}
                    </h3>
                    <p className="text-muted text-sm line-clamp-2">{issue.excerpt}</p>
                  </div>
                  <span className="text-muted group-hover:text-accent transition-colors flex-shrink-0">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border text-center">
        <h2 className="font-serif text-2xl font-semibold mb-4">
          Don't miss the next one
        </h2>
        <p className="text-muted mb-6">
          Get new issues delivered straight to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <SubscribeForm compact />
        </div>
      </section>
    </div>
  );
}
