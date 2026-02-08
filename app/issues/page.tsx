import Link from "next/link";
import { Metadata } from "next";
import { getAllIssues } from "@/lib/issues";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Archive — The Caveat",
  description:
    "Browse all issues of The Caveat newsletter. Weekly insights on AI agent permissions, smart accounts, and onchain infrastructure.",
};

export default function IssuesPage() {
  const issues = getAllIssues();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Archive
        </h1>
        <p className="text-muted text-lg">
          All {issues.length} issue{issues.length !== 1 ? "s" : ""} of The
          Caveat.
        </p>
      </header>

      {issues.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted mb-6">No issues yet. The first one is coming soon!</p>
          <SubscribeForm compact className="max-w-md mx-auto" />
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Link
              key={issue.slug}
              href={`/issues/${issue.slug}`}
              className="group block p-6 bg-surface border border-border rounded-xl hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-accent bg-accent-dim px-2 py-0.5 rounded">
                      #{issue.number}
                    </span>
                    <span className="text-sm text-muted">{issue.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-accent transition-colors mb-2">
                    {issue.title}
                  </h2>
                  <p className="text-muted line-clamp-2">{issue.excerpt}</p>
                </div>
                <span className="text-muted group-hover:text-accent transition-colors flex-shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Subscribe CTA */}
      <section className="mt-20 pt-12 border-t border-border text-center">
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
