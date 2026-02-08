import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssueBySlug, getAllIssueSlugs } from "@/lib/issues";
import { SubscribeForm } from "@/components/SubscribeForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);

  if (!issue) {
    return {
      title: "Issue Not Found — The Caveat",
    };
  }

  return {
    title: `${issue.title} — The Caveat #${issue.number} | Oso Knows`,
    description: issue.excerpt,
    openGraph: {
      title: `${issue.title} — The Caveat`,
      description: issue.excerpt,
      type: "article",
      publishedTime: issue.date,
    },
    twitter: {
      card: "summary_large_image",
      title: issue.title,
      description: issue.excerpt,
    },
  };
}

function renderMarkdown(content: string): string {
  // Simple markdown-to-HTML conversion
  const html = content
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks (must be before other replacements)
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, "<hr />")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // List items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Paragraphs (simple version)
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (
        block.startsWith("<h") ||
        block.startsWith("<pre") ||
        block.startsWith("<hr") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<li")
      ) {
        // Wrap list items in ul
        if (block.includes("<li>")) {
          return `<ul>${block.replace(/\n/g, "")}</ul>`;
        }
        return block;
      }
      return `<p>${block.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);

  if (!issue) {
    notFound();
  }

  const htmlContent = renderMarkdown(issue.content);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Issue header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/caveat"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Back to The Caveat
          </Link>
          <span className="text-muted">•</span>
          <span className="text-xs font-semibold text-accent bg-accent-dim px-2 py-0.5 rounded">
            Issue #{issue.number}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 leading-tight">
          {issue.title}
        </h1>
        <time className="text-muted">{issue.date}</time>
      </header>

      {/* Article content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Subscribe CTA */}
      <section className="mt-16 pt-12 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-3">
            Enjoyed this issue?
          </h2>
          <p className="text-muted mb-6">
            Subscribe to get future issues delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <SubscribeForm compact />
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="mt-12 flex items-center justify-center gap-6 text-sm text-muted">
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${issue.title} — The Caveat #${issue.number}`
          )}&url=${encodeURIComponent(`https://osoknows.com/caveat/${slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          Share on X →
        </Link>
      </section>
    </article>
  );
}
