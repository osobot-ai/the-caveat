import fs from "fs";
import path from "path";
import matter from "gray-matter";

const issuesDirectory = path.join(process.cwd(), "issues");

export interface Article {
  title: string;
  author: string;
  content: string;
}

export interface Issue {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  number: number;
  authors?: string[];
  articles?: Article[];
}

export interface IssueMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  number: number;
  authors?: string[];
}

function parseIssueFromFilename(filename: string): { number: number; slug: string } | null {
  // Expected format: 001-the-permission-problem.md
  const match = filename.match(/^(\d+)-(.+)\.md$/);
  if (!match) return null;
  
  return {
    number: parseInt(match[1], 10),
    slug: match[2],
  };
}

function extractExcerpt(content: string, maxLength = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/^#+\s+.+$/gm, "") // Remove headers
    .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.+?)\*/g, "$1") // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // Remove links
    .replace(/`(.+?)`/g, "$1") // Remove inline code
    .replace(/^[-*]\s+/gm, "") // Remove list markers
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

function extractTitle(content: string, frontmatter: { title?: string }): string {
  // Use frontmatter title if available
  if (frontmatter.title) {
    return frontmatter.title;
  }

  // Extract from first H1 or H2
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].replace(/\*\*/g, "").trim();
  }

  const h2Match = content.match(/^##\s+(.+)$/m);
  if (h2Match) {
    return h2Match[1].replace(/\*\*/g, "").trim();
  }

  return "Untitled Issue";
}

function extractDate(content: string, frontmatter: { date?: string }): string {
  // Use frontmatter date if available
  if (frontmatter.date) {
    return frontmatter.date;
  }

  // Look for date pattern in content (e.g., *February 8, 2026*)
  const dateMatch = content.match(/\*([A-Z][a-z]+ \d{1,2}, \d{4})\*/);
  if (dateMatch) {
    return dateMatch[1];
  }

  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getIssueBySlug(slug: string): Issue | null {
  try {
    const files = fs.readdirSync(issuesDirectory);
    
    for (const filename of files) {
      const parsed = parseIssueFromFilename(filename);
      if (!parsed || parsed.slug !== slug) continue;

      const fullPath = path.join(issuesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: parsed.slug,
        number: parsed.number,
        title: extractTitle(content, data),
        date: extractDate(content, data),
        excerpt: extractExcerpt(content),
        content,
        authors: data.authors || [],
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function getAllIssues(): IssueMeta[] {
  try {
    const files = fs.readdirSync(issuesDirectory);
    const issues: IssueMeta[] = [];

    for (const filename of files) {
      const parsed = parseIssueFromFilename(filename);
      if (!parsed) continue;

      const fullPath = path.join(issuesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      issues.push({
        slug: parsed.slug,
        number: parsed.number,
        title: extractTitle(content, data),
        date: extractDate(content, data),
        excerpt: extractExcerpt(content),
        authors: data.authors || [],
      });
    }

    // Sort by issue number descending (newest first)
    return issues.sort((a, b) => b.number - a.number);
  } catch {
    return [];
  }
}

export function getAllIssueSlugs(): string[] {
  try {
    const files = fs.readdirSync(issuesDirectory);
    const slugs: string[] = [];

    for (const filename of files) {
      const parsed = parseIssueFromFilename(filename);
      if (parsed) {
        slugs.push(parsed.slug);
      }
    }

    return slugs;
  } catch {
    return [];
  }
}
