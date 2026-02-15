import { getAllIssues } from "@/lib/issues";

export async function GET() {
  const issues = getAllIssues();
  const siteUrl = "https://osoknows.com";

  const items = issues
    .map(
      (issue) => `
    <item>
      <title><![CDATA[${issue.title} — The Caveat #${issue.number}]]></title>
      <link>${siteUrl}/caveat/${issue.slug}</link>
      <guid isPermaLink="true">${siteUrl}/caveat/${issue.slug}</guid>
      <description><![CDATA[${issue.excerpt}]]></description>
      <pubDate>${new Date(issue.date).toUTCString()}</pubDate>
      ${issue.authors?.map((a) => `<dc:creator>${a}</dc:creator>`).join("\n      ") || ""}
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Caveat — Scoped Intelligence for the Agent Economy</title>
    <link>${siteUrl}/caveat</link>
    <description>Weekly newsletter on agent permissions, smart accounts, and the infrastructure that makes autonomous agents safe.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
