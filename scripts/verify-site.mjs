import { readFile, access } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "robots.txt", "sitemap.xml"];
const requiredLinks = [
  "https://www.linkedin.com/in/istvanmadarasz/",
  "https://github.com/madarasz/kt-rules-bot",
  "https://github.com/madarasz/sectorhungaricus-v2",
  "https://github.com/madarasz/datacard-manager",
  "https://github.com/madarasz/always-be-running",
  "https://github.com/madarasz/tournament-tables"
];

const requiredSnippets = [
  "<title>",
  "name=\"description\"",
  "rel=\"canonical\"",
  "property=\"og:title\"",
  "name=\"twitter:card\"",
  "application/ld+json",
  "<header",
  "<main",
  "<article",
  "<footer"
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of requiredFiles) {
  await access(file);
}

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const robots = await readFile("robots.txt", "utf8");
const sitemap = await readFile("sitemap.xml", "utf8");

for (const snippet of requiredSnippets) {
  assert(html.includes(snippet), `Missing required HTML snippet: ${snippet}`);
}

for (const link of requiredLinks) {
  assert(html.includes(link), `Missing required link: ${link}`);
}

const scriptOpenTags = html.match(/<script\b[^>]*>/gi) ?? [];
for (const tag of scriptOpenTags) {
  const hasJsonLdType = /type\s*=\s*["']application\/ld\+json["']/i.test(tag);
  assert(hasJsonLdType, "Static page should only contain JSON-LD script tags");
}

assert(html.includes("István Madarász"), "Name should preserve accents");
assert(css.includes("@media (prefers-reduced-motion: reduce)"), "CSS must respect reduced motion");
assert(css.includes("@container"), "CSS should include at least one container query");
assert(robots.includes("Sitemap: https://madarasz.github.io/ai-portfolio/sitemap.xml"), "robots.txt should reference sitemap");
assert(sitemap.includes("<loc>https://madarasz.github.io/ai-portfolio/</loc>"), "sitemap should include canonical page URL");

const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [];
assert(jsonLdMatches.length > 0, "Missing JSON-LD block");

for (const block of jsonLdMatches) {
  const json = block
    .replace('<script type="application/ld+json">', "")
    .replace("</script>", "")
    .trim();
  JSON.parse(json);
}

console.log("Static site verification passed.");
