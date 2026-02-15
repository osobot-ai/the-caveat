import { getAllIssues } from "@/lib/issues";

export async function GET() {
  const issues = getAllIssues();
  const siteUrl = "https://osoknows.com";

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/caveat", priority: "0.9", changefreq: "weekly" },
    { url: "/skills", priority: "0.7", changefreq: "monthly" },
    { url: "/projects", priority: "0.7", changefreq: "monthly" },
    { url: "/about", priority: "0.6", changefreq: "monthly" },
  ];

  const issuePages = issues.map((issue) => ({
    url: `/caveat/${issue.slug}`,
    priority: "0.8",
    changefreq: "never" as const,
    lastmod: new Date(issue.date).toISOString().split("T")[0],
  }));

  const allPages = [...staticPages, ...issuePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${"lastmod" in page ? `<lastmod>${page.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
